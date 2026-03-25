import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

const Notification = ({ message, type = "success", duration = 3000, onClose }) => {
  const severityMap = { success: "success", error: "error", info: "info" }

  return (
    <Snackbar
      open={true}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={severityMap[type] || "info"} variant="filled" sx={{ borderRadius: 2, fontWeight: 500 }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
