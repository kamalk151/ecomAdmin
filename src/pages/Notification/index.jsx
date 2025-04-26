import { Box, Snackbar, Alert } from '@mui/material'

const Notification = ({message, open, onClose, autoHideDuration, severity, action}) => {
  return (
    <Box m="20px">
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        action={action}
      >
        <Alert onClose={() => onClose(false)} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Notification