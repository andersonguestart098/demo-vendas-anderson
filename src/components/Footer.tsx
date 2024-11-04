import React from "react";
import { Box, Typography, IconButton, Grid, Divider } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#313926",
        color: "#E6E3DB",
        padding: "40px 20px",
        mt: 5,
      }}
    >
      <Grid container spacing={5} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={4}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <img
                src="/icones/logo.png"
                alt="Nato Pisos Logo"
                style={{ width: "200px", filter: "brightness(0) invert(1)" }}
              />
              <Typography
                variant="h5"
                fontWeight="bold"
                color="#E6E3DB"
              ></Typography>
            </motion.div>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <Typography variant="body1" sx={{ mb: 1 }}>
              <MailOutlineIcon sx={{ mr: 1 }} />
              contato@natopisos.com.br
            </Typography>
            <Typography variant="body1">
              <PhoneIcon sx={{ mr: 1 }} />
              +55 51 98296-1257
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <IconButton
              aria-label="Instagram"
              sx={{ color: "#E6E3DB" }}
              href="https://www.instagram.com"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              aria-label="Facebook"
              sx={{ color: "#E6E3DB" }}
              href="https://www.facebook.com"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label="LinkedIn"
              sx={{ color: "#E6E3DB" }}
              href="https://www.linkedin.com"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              aria-label="Twitter"
              sx={{ color: "#E6E3DB" }}
              href="https://www.twitter.com"
            >
              <TwitterIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3, backgroundColor: "#E6E3DB" }} />

      <Box textAlign="center" my={2}>
        <Typography variant="body2" color="#E6E3DB">
          © {new Date().getFullYear()} Nato Pisos - Todos os direitos reservados
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
