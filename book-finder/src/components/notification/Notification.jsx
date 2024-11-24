import { Box, Typography, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./notification.module.scss";
import { useEffect } from "react";
import PropTypes from 'prop-types';

//When you need to add the notification then add the following code in your component.
//const [notification, setNotification] = useState({ isOpen: false, message: '', type: '' });
// const handleCloseNotification = () => {
//   setNotification({ isOpen: false, message: '', type: '' });
// };
//
// setNotification({
//   isOpen: true,
//   message: 'your_message to display in notification',
//   type: 'error/success',
// });
// {notification.isOpen && (
//   <Notification
//     isOpen={notification.isOpen}
//     message={notification.message}
//     type={notification.type}
//     onClose={handleCloseNotification}
//   />
// )}

const Notification = ({ isOpen, message, type, onClose }) => {

  // Automatically close the notification after 5 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // Close after 3 seconds

      // Cleanup the timeout when the component unmounts or when the notification closes
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Modal open={isOpen} onClose={onClose} hideBackdrop>
      <Box className={styles.notificationWrapper}>
        <Box className={`${styles.notification} ${styles[type]}`}>
          <Typography className={styles.message}>
            {message ? message : "undefine"}
          </Typography>
          <IconButton
            size="small"
            onClick={onClose}
            className={styles.closeButton}
          >
            <CloseIcon style={{ fontSize: "20px" }} />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

Notification.propTypes = {
  isOpen: PropTypes.bool.isRequired,      
  message: PropTypes.string.isRequired,    
  type: PropTypes.oneOf(['success', 'error']).isRequired, 
  onClose: PropTypes.func.isRequired       
};

export default Notification;
