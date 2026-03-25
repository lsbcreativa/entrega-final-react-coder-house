import { Link } from "react-router-dom"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import HomeIcon from "@mui/icons-material/Home"
import PetsIcon from "@mui/icons-material/Pets"

const NotFound = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", py: 14 }}>
        <PetsIcon sx={{ fontSize: 56, color: "primary.main", opacity: 0.3, mb: 1 }} />
        <Typography sx={{ fontSize: { xs: "5rem", md: "8rem" }, fontWeight: 900, color: "primary.main", lineHeight: 1, opacity: 0.1, letterSpacing: -3 }}>
          404
        </Typography>
        <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mt: -1 }}>
          Page Not Found
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 360, mx: "auto" }}>
          This page seems to have wandered off like a curious puppy.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/" startIcon={<HomeIcon />} size="large">
          Back to Home
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound
