// Notification — Componente de notificación tipo toast (Snackbar)
// Se usa para mostrar mensajes temporales al usuario (ej: "Producto agregado al carrito")
// Aparece en la esquina inferior derecha y se cierra automáticamente
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

const Notification = ({ message, type = "success", duration = 3000, onClose }) => {
  // Mapeo del tipo de notificación a severity de MUI Alert
  const severityMap = { success: "success", error: "error", info: "info" }

  return (
    <Snackbar
      open={true}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      {/* Alert con estilo "filled" — colores definidos en el theme */}
      <Alert onClose={onClose} severity={severityMap[type] || "info"} variant="filled" sx={{ borderRadius: 2, fontWeight: 500 }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
