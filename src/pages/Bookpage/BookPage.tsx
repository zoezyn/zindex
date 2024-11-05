import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import './BookPage.css'
import bookCover from "/src/assets/book-cover.svg";
export function BookPage() {
    const { bookTitle } = useParams()
    // const decodedTitle = decodeURIComponent(bookTitle || '')
    const navigate = useNavigate()
    const [notes, setNotes] = useState<any[]>([])

    useEffect(() => {
        fetchBookNotes(bookTitle || '')
    }, [bookTitle])

    const fetchBookNotes = async (bookTitle: string) => {
        const { data, error } = await supabase
            .from('book_notes')
            .select('*')
            .ilike('book_title', bookTitle)
            // .eq('user_id', "2df9c1e1-6d6e-4a4c-88d8-022f73cc6132")

        // console.log('Fetched bookTitle:', decodedTitle)
        // console.log('Fetched data:', data)
        // console.log('Fetched error:', error)

        if (error) {
            alert(error.message)
        } else if (data) {
            setNotes(data)
        }
    }

    return (
        <div className="book-page">
            <button 
                onClick={() => navigate(-1)}
                className="mb-4"
            >
                ← Back to Books
            </button>
            
            {/* <div className="book-card-container" style={{border: '1px solid var(--background-color)', background: 'var(--background-color)'}}>
                        
                            <BookCard book={bookTitle} />
                        
                    </div> */}
            <div className="book-cover-container">
                <img src={bookCover} alt={"book cover"} />
                <h2 className="text-2xl font-bold mb-4">{bookTitle}</h2>
            </div>
            
            
            <div className="text-container">
                {notes.map((note) => (
                    <div key={note.id} className="notes-container">
                        {/* <p className="mt-2">{note.notes}</p> */}
                        <ul className="notes-list">
                        {Array.isArray(note.notes) ? (
                            note.notes.map((item: string, index: number) => (
                                <li key={index} className="notes-list-item">
                                    {item}
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-700">{note.notes}</li>
                        )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
} 