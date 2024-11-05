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
        textAlign: "center",
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {/* Logo Section */}
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/icones/logo.png"
                alt="NatoPisosLogo"
                style={{ width: "150px", filter: "brightness(0) invert(1)" }}
              />
            </motion.div>
          </Box>
        </Grid>
        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <MailOutlineIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              contato@natopisos.com.br
            </Typography>
            <Typography variant="body1">
              <PhoneIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              +55 11 91234-6687
            </Typography>
          </Box>
        </Grid>
        {/* Social Media Icons */}
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="center" gap={1}>
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
        s
      </Grid>

      <Divider sx={{ my: 3, backgroundColor: "#E6E3DB" }} />

      <Box>
        <Typography variant="body2" color="#E6E3DB">
          © {new Date().getFullYear()} Nato Pisos - Todos os direitos reservados
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
