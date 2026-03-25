import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"

const Loader = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, gap: 2 }}>
      <CircularProgress color="secondary" size={48} thickness={4} />
      <Typography variant="body2" color="text.secondary" sx={{ letterSpacing: 1 }}>
        Cargando...
      </Typography>
    </Box>
  )
}

export default Loader
