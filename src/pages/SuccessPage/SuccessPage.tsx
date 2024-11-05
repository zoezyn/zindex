import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../../lib/supabaseClient'
import './SuccessPage.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Session, User } from '@supabase/supabase-js'
import BookCard from '../../components/bookcard/bookcard'

export const SuccessPage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [fileContent, setFileContent] = useState<string>('')
  const [userNotes, setUserNotes] = useState<any[]>([])  // Add this
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      console.log(user)
      setUser(user)
      if (user) fetchUserNotes(user.id) // Fetch notes after confirming user
      setLoading(false)
    })
  }, [])


  const fetchUserNotes = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('book_notes')
      .select('*')
      .eq('user_id', userId)
    
      if (data) setUserNotes(data)
    //   if (error) console.error('Error fetching notes:', error)
      if (error) throw error
    } catch (error: any) {
      alert(`Error fetching notes: ${error.message}`)
    }
  }


  async function signOut() {
    await supabase.auth.signOut() // Wait for this to complete
    navigate('/') // Only runs after sign-out is done
  }


  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    // if (file&& user) {
    //   const reader = new FileReader()
    //   reader.onload = (e) => {
    //     const text = e.target?.result as string
    //     setFileContent(text)
    //   }
    if (file && user) {
        const reader = new FileReader()
        
        // Read file and Convert file to text first
        const text = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string)
          reader.readAsText(file)
        })

        // 2. Process with Python backend
        const response = await fetch('http://localhost:8000/process-notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: text })
        });
        if (!response.ok) throw new Error('Failed to process notes');
        const processedData = await response.json()

        console.log(processedData)


        // 3. Save the file to the database
        // Each book is a separate row
        // const { data, error } = await supabase
        //     .from('book_notes')
        //     .insert({ 
        //         user_id: user.id, 
        //         raw: text,
        //         file_name: file.name,
        //         created_at: new Date().toISOString()
        //     })
        //     .select()
        for (const [bookTitle, notes] of Object.entries(processedData)) {
            console.log(bookTitle)
            // console.log(notes)
            const { data, error } = await supabase
                .from('book_notes')
                .insert({ 
                    user_id: user.id,
                    book_title: bookTitle.trim(),
                    notes: notes,        // array of [note_content, note_location]
                    // location: (notes as [string, string])[1],
                    file_name: file.name,
                    created_at: new Date().toISOString()
                })
                .select()
                if (error) throw error
                else fetchUserNotes(user.id)  // Refresh notes list
                reader.readAsText(file)
        }



    
    }
  }

  const deleteNote = async (noteId: string) => {
    const { error } = await supabase
      .from('book_notes')
      .delete()
      .eq('id', noteId)
    if (error) throw error
    else if (user) fetchUserNotes(user.id)  // Refresh notes list
  }


  return (
    <div className="success-page">
      {loading ? (
        <h1>Loading...</h1>
      ) : user && Object.keys(user).length !== 0 ? (
        <>
          <h1>Your Dashboard</h1>
          {/* <p>Your Dashboard is ready!</p> */}

          {/* File upload section */}
          <input className="file-input"
            type="file" 
            accept=".txt,.doc,.docx"
            onChange={uploadFile}
          />

          {/* Sign out button */}
          {/* <button onClick={signOut}>Sign Out</button> */}
          


          {/* Show all saved notes */}
          {/* <div>
            <h2>Your Notes:</h2>
            {userNotes.map((note) => (
              <div key={note.id} className="note-container">
                <button onClick={() => deleteNote(note.id)}>Delete</button>
                <h3>{note.book_title}</h3>
                <pre>{note.notes}</pre>
                
              </div>
            ))}
          </div> */}
          <div className="book-card-container">
            
                        {userNotes.map((note) => (
                            <div key={note.id} className="note-container">
                              <div className="book-card">
                                <BookCard book={note.book_title} />
                              </div>
                              <button onClick={() => deleteNote(note.id)}>Delete</button>
                            </div>
                        ))}
                    </div>


          
        </>
      ) : (
        <>
          <h1>You are not logged in</h1>
          <button onClick={() => navigate('/login')}>Login</button>
        </>
      )}
    </div>
  )
}
