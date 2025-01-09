import { supabase } from '../../lib/supabaseClient'
import './SuccessPage.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import BookCard from '../../components/bookcard/bookcard'
import { Link } from 'react-router-dom';
export const SuccessPage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  // const [fileContent, setFileContent] = useState<string>('')
  const [userNotes, setUserNotes] = useState<any[]>([])  // Add this
  const [selectedFile, setSelectedFile] = useState<File | null>(null)  // Add this line
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL;
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      // console.log(user)
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



  const uploadFile = async () => {
    console.log(selectedFile)
    if (!selectedFile || !user) return;
    
    setIsUploading(true);
    // const file = event.target.files?.[0]
    // setSelectedFile(file || null)
    try {

        const reader = new FileReader()
        
        // Read file and Convert file to text first
        const text = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string)
          reader.readAsText(selectedFile)
        })

        // 2. Process with Python backend
        const response = await fetch(`${API_URL}/process-notes`, {
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

        for (const [bookTitle, notes] of Object.entries(processedData)) {
            console.log(bookTitle)
            // console.log(notes)
            const { error } = await supabase
                .from('book_notes')
                .insert({ 
                    user_id: user.id,
                    book_title: bookTitle.trim(),
                    notes: notes,        // array of [note_content, note_location]
                    // location: (notes as [string, string])[1],
                    file_name: selectedFile.name,
                    created_at: new Date().toISOString()
                })
                .select()
                if (error) throw error
                else fetchUserNotes(user.id)  // Refresh notes list
                // reader.readAsText(selectedFile)
        }
        // await fetchUserNotes(user.id);
        setSelectedFile(null); // Clear selected file after successful upload
        
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload file. Please try again.');
      } finally {
        setIsUploading(false); // Set loading state to false when done
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

  // Add deleteAll function
  const deleteAllNotes = async () => {
    if (!user || userNotes.length === 0) return;
    
    // Add confirmation dialog
    if (!window.confirm('Are you sure you want to delete all notes? This cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('book_notes')
        .delete()
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      // Refresh notes list (will be empty)
      await fetchUserNotes(user.id);
    } catch (error) {
      console.error('Error deleting all notes:', error);
      alert('Failed to delete notes');
    }
  };

  return (
    
    <div className="success-page">
      {loading ? (
        <h1>Loading...</h1>
      ) : user && Object.keys(user).length !== 0 ? (
        <>
          <h1>Your Dashboard</h1>
          {/* <p>Your Dashboard is ready!</p> */}

          {/* File upload section */}
          <div className="file-upload-container">
            <input 
              type="file"
              accept=".txt,.doc,.docx"
              onChange={handleFileSelect}
              id="file-upload"
              className="hidden-input"
            />
            <label htmlFor="file-upload" className="choose-file-btn">
              {/* <i className="fas fa-cloud-upload-alt"></i>  */}
              Choose File
            </label>
            {/* Optional: Display selected filename */}
            {selectedFile ? <span className="file-name">{selectedFile.name}</span> : <span className="file-name">No file selected</span>}
            
            {selectedFile && (
              <button 
                onClick={uploadFile}
                className="upload-btn" // inverse of upload-btn
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-cloud-upload-alt"></i> Upload
                  </>
                )}
              </button>
            )}
          </div>


          {/* Show all saved notes */}
          <div className="book-card-container">
            {userNotes.length > 0 && (
              <div className="actions-bar">
                <button 
                  className="delete-all-btn"
                  onClick={deleteAllNotes}
                >
                  Delete All
                </button>
              </div>
            )}
            
            {userNotes.map((note) => (
              <div key={note.id} className="note-container">
                <div className="book-card">
                  <BookCard book={note.book_title} />
                </div>
                <button className="delete-btn" onClick={() => deleteNote(note.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>


          
        </>
      ) : (
        <>
          <h1>You are not logged in</h1>
          {/* <button onClick={() => navigate('/login')}>Login</button> */}
          <Link to="/login" className="btn btn-primary">Log in</Link>
        </>
      )}
    </div>
  )
}
