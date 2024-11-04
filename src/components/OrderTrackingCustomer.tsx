import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  Typography,
  List,
  ListItem,
  Divider,
  Box,
  Avatar,
  useMediaQuery,
  useTheme,
  Snackbar,
  SnackbarContent,
  IconButton,
  Button,
} from "@mui/material";
import PendingIcon from "@mui/icons-material/HourglassEmpty";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import { useSocket } from "../contexts/SocketContext";
import { useNavigate } from "react-router-dom";

interface Order {
  id: string;
  _id?: string;
  totalPrice: number;
  status: string;
}

const statusSteps = [
  {
    key: "PENDING",
    label: "Pendente",
    icon: <PendingIcon />,
    defaultColor: "#E6E3DB",
  },
  {
    key: "PAYMENT_APPROVED",
    label: "Pagamento Aprovado",
    icon: <PaymentIcon />,
    defaultColor: "#E6E3DB",
  },
  {
    key: "AWAITING_STOCK_CONFIRMATION",
    label: "Aguardando Estoque",
    icon: <CheckCircleIcon />,
    defaultColor: "#E6E3DB",
  },
  {
    key: "SEPARATED",
    label: "Separado",
    icon: <AssignmentTurnedInIcon />,
    defaultColor: "#E6E3DB",
  },
  {
    key: "DISPATCHED",
    label: "Despachado",
    icon: <LocalShippingIcon />,
    defaultColor: "#E6E3DB",
  },
  {
    key: "DELIVERED",
    label: "Entregue",
    icon: <AssignmentTurnedInIcon />,
    defaultColor: "#E6E3DB",
  },
];

const OrderTracking: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const socket = useSocket();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get(
          "https://ecommerce-fagundes-13c7f6f3f0d3.herokuapp.com/orders/me",
          {
            headers: { "x-auth-token": token },
          }
        );
        setOrders(response.data);
      } catch (error: any) {
        if (error.response?.status === 403 || error.response?.status === 401) {
          alert("Por favor, faça login novamente.");
          navigate("/login");
        }
      }
    };

    fetchOrders();

    socket?.on(
      "orderStatusUpdated",
      (update: { orderId: string; status: string }) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === update.orderId || order._id === update.orderId
              ? { ...order, status: update.status }
              : order
          )
        );
        setSnackbarMessage(
          `Status do pedido ${update.orderId} atualizado para ${update.status}`
        );
        setOpenSnackbar(true);
      }
    );

    return () => {
      socket?.off("orderStatusUpdated");
    };
  }, [socket, navigate]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleWhatsAppContact = () => {
    const phone = "5551982961257";
    window.open(
      `https://wa.me/${phone}?text=Olá, estou com dúvidas sobre meu pedido.`
    );
  };

  const renderProgressTracker = (currentStatus: string) => {
    const currentStepIndex = statusSteps.findIndex(
      (step) => step.key === currentStatus
    );
    const groupedSteps = [statusSteps.slice(0, 3), statusSteps.slice(3, 6)];

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        {groupedSteps.map((group, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              width: "100%",
            }}
          >
            {group.map((step) => {
              const isActive = statusSteps.indexOf(step) <= currentStepIndex;
              return (
                <motion.div
                  key={step.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "80px",
                    padding: "8px",
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: isActive ? "#4CAF50" : step.defaultColor,
                      color: "#fff",
                      width: 50,
                      height: 50,
                      boxShadow: isActive ? "0px 0px 10px rgba(0,0,0,0.2)" : "",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    {step.icon}
                  </Avatar>
                  <Typography
                    variant="caption"
                    align="center"
                    sx={{
                      color: isActive ? "#313926" : step.defaultColor,
                      mt: 1,
                      fontSize: "0.65rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {step.label}
                  </Typography>
                </motion.div>
              );
            })}
          </Box>
        ))}
      </Box>
    );
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Box sx={{ padding: isMobile ? 1 : 3 }}>
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          color: "#313926",
          border: "1px solid #313926",
          mb: 3,
          "&:hover": { backgroundColor: "#e0e0e0" },
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#313926",
          fontSize: isMobile ? "1.5rem" : "2rem",
        }}
      >
        Meus Pedidos
      </Typography>
      {orders.length === 0 ? (
        <Typography variant="body1">Nenhum pedido encontrado.</Typography>
      ) : (
        <Paper
          elevation={3}
          sx={{ padding: 2, border: "1px solid #E6E3DB", borderRadius: "8px" }}
        >
          <List>
            {currentOrders.map((order, index) => (
              <div key={index}>
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box sx={{ width: "100%", textAlign: "left" }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Pedido ID: {order._id || order.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total: R$ {order.totalPrice.toFixed(2).replace(".", ",")}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    {renderProgressTracker(order.status)}
                  </Box>
                </ListItem>
                <Button
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  onClick={handleWhatsAppContact}
                  sx={{
                    mt: 2,
                    mb: 2,
                    backgroundColor: "#00E676",
                    "&:hover": { backgroundColor: "#00C853" },
                    fontWeight: "bold",
                    fontSize: isMobile ? "0.75rem" : "1rem",
                    padding: isMobile ? "6px 12px" : "8px 16px",
                  }}
                >
                  Contatar Vendedor
                </Button>
                <Divider />
              </div>
            ))}
          </List>

          {/* Pagination Controls */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              sx={{ mr: 1 }}
            >
              Anterior
            </Button>
            <Typography sx={{ alignSelf: "center" }}>
              Página {currentPage} de {totalPages}
            </Typography>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              sx={{ ml: 1 }}
            >
              Próxima
            </Button>
          </Box>
        </Paper>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#fff",
            color: "#313926",
            fontFamily: "Arial, sans-serif",
            fontSize: "1rem",
          }}
          message={snackbarMessage}
        />
      </Snackbar>
    </Box>
  );
};

export default OrderTracking;
