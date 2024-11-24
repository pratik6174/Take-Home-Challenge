import axios from 'axios'; // Import axios for making HTTP requests

// Base URL for the Open Library API
const BASE_URL = 'https://openlibrary.org/search.json';

// Function to fetch books based on a given title
export const fetchBooksByTitle = async (title) => {
    try {
        const response = await axios.get(`${BASE_URL}?title=${title}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};