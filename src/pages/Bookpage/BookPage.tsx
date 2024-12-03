import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import './BookPage.css'
import bookCover from "/src/assets/book-cover.svg";
import { User } from '@supabase/supabase-js';
export function BookPage() {
    const { bookTitle } = useParams()
    // const decodedTitle = decodeURIComponent(bookTitle || '')
    const navigate = useNavigate()
    const [notes, setNotes] = useState<any[]>([])
    const [user, setUser] = useState<User | null>(null)

    // useEffect(() => {
    //     fetchBookNotes(bookTitle || '')
    // }, [bookTitle])

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            console.log('user1', user)
            setUser(user);
            if (user) {
                console.log('user3', user.id);
            fetchBookNotes(user.id, decodeURIComponent(bookTitle as string));
            }
        }).catch(error => {
            console.error('Error getting user:', error);
        });
        }, [bookTitle]);

    const fetchBookNotes = async (user_id: string, bookTitle: string) => {
        const { data, error } = await supabase
            .from('book_notes')
            .select('*')
            .ilike('book_title', bookTitle)
            .eq('user_id', user_id)
            .order('created_at', { ascending: false });  // Get newest first

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
                className="btn btn-secondary"
            >
                ← Back
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