import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBooks } from '../store/feature/home/getBooksSlice';
import { TextField, Button, Box } from '@mui/material';
import styles from '../styles/styles.module.scss';

const SearchBar = () => {

    // Initialize the Redux dispatch function
    const dispatch = useDispatch();

    // Local state to manage the search query entered by the user
    const [query, setQuery] = useState('');

    // Function to handle the search button click
    const handleSearch = () => {
        if (query.trim()) {
            dispatch(getBooks(query));
        }
    };

    return (
        <Box className={styles.searchBar}>
            {/* Input field for the search query */}
            <TextField
                label="Search Books"
                variant="outlined"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {/* Button to trigger the search */}
            <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
            </Button>
        </Box>
    );
};

export default SearchBar;
