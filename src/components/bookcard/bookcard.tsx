import './bookcard.css'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import bookCover from "/src/assets/book-cover.svg";

export default function BookCard({ book }: { book: any }) {
    const navigate = useNavigate()

    return (
        <Card 
            className="cursor-pointer hover-shadow"
            onClick={() => navigate(`/book/${book}`)}
            style={{ cursor: 'pointer' }}
        >
            <Card.Body className="card-body">
                <img src={bookCover} alt={"book cover"} />
                <div>
                    <Card.Title>{book}</Card.Title>
                </div>
                <div className="card-arrow">›</div>
            </Card.Body>
        </Card>
    )
}