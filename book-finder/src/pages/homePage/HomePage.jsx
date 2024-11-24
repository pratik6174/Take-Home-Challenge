import { useSelector } from 'react-redux';
import SearchBar from '../../components/SearchBar';
import BookCard from '../../components/BookCard';
import styles from '../../styles/styles.module.scss';
import { Box, CircularProgress, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import Notification from '../../components/notification/Notification';

const HomePage = () => {

  // Local state to handle loading and manage notification messages
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ isOpen: false, message: '', type: '' });

  // Fetch data from the Redux store: books, status, and errors
  const { books, status, error } = useSelector((state) => state.books);

  // Monitor the status from Redux to update loading state and show notifications
  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else if (status === "succeeded") {
      setIsLoading(false);
    } else if (status === "failed") {
      setIsLoading(false);

      // Determine the notification message based on the error value
      let errorMessage = '';
      if (typeof error === 'string' && error.trim() !== '') {
        errorMessage = error; // Use the error string from the store
      } else if (typeof error === 'object' && error !== null) {
        errorMessage = 'Some error occurred. Please try again.'; // Handle object error
      } else {
        errorMessage = 'An unknown error occurred. Please try again.';
      }
      setNotification({
        isOpen: true,
        message: errorMessage,
        type: 'error',
      });
    }
  }, [status, error])

  // Function to close the notification when dismissed
  const handleCloseNotification = () => {
    setNotification({ isOpen: false, message: '', type: '' });
  };

  return (
    <Box className={styles.homePage}>

      {/* Search bar for user input */}
      <SearchBar />
      
      {books.length === 0 && status === "succeeded" && (
        <p className={styles.noBooksText}>No books found. Try searching with a different title.</p>
      )}

      {/* Render the list of books in a grid format */}
      <Box className={styles.bookGrid}>
        {books.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </Box>

      {/* Modal to show a loading spinner during data fetch */}
      <Modal
        open={isLoading}
        aria-labelledby="loading-modal-title"
        aria-describedby="loading-modal-description"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          bgcolor="rgba(0, 0, 0, 0.5)"
        >
          <CircularProgress />
        </Box>
      </Modal>

      {/* Show a notification for errors or other important messages */}
      {notification.isOpen && (
        <Notification
          isOpen={notification.isOpen}
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
    </Box>
  );
};

export default HomePage;
