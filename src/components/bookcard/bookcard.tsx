import './bookcard.css'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import bookCover from "/src/assets/book-cover.svg";

export default function BookCard({ book }: { book: string }) {
    const navigate = useNavigate()

    return (
        <Card 
            className="cursor-pointer hover-shadow book-card"
            onClick={() => navigate(`/book/${book}`)}
            style={{ cursor: 'pointer' }}
        >
            <Card.Body className="card-body">
                <img src={bookCover} alt="book cover" className="book-cover" />
                <div className="book-info">
                    <Card.Title className="book-title" title={book}>
                        {book}
                    </Card.Title>
                </div>
                <div className="card-arrow">›</div>
            </Card.Body>
        </Card>
    )
}