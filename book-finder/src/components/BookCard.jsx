import PropTypes from 'prop-types';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const BookCard = ({ book }) => {
    return (
        <Card>
            {/* Display the book cover image if the cover ID exists */}
            {book.cover_i && (
                <CardMedia
                    component="img"
                    image={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={book.title}
                />
            )}
            <CardContent>

                {/* Display the book title */}
                <Typography variant="h6">{book.title}</Typography>

                {/* Display the author(s) or a placeholder if not available */}
                <Typography variant="subtitle1">
                    {book.author_name?.join(', ') || 'Unknown Author'}
                </Typography>

                {/* Display the year of the first publication or 'N/A' if unavailable */}
                <Typography variant="body2">{book.first_publish_year || 'N/A'}</Typography>
            </CardContent>
        </Card>
    );
};

// Define the expected structure of the `book` prop for type-checking
BookCard.propTypes = {
    book: PropTypes.shape({
        cover_i: PropTypes.number,
        title: PropTypes.string.isRequired,
        author_name: PropTypes.arrayOf(PropTypes.string),
        first_publish_year: PropTypes.number,
    }).isRequired,
};

export default BookCard;
