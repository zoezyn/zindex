// import { useState } from 'react'
// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { Main } from './pages/main'
// import { Login } from './pages/login'
// import { Navbar } from './components/navbar'
// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Main />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </Router>
//     </div>

//   )
// }

// export default App
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Navbar } from './components/navbar/navbar';
import { Navbar } from './components';
import {HomePage} from './pages/HomePage';
// import './styles.css';
import './App.css'
import { Login } from './pages/Login/Login';  
import { SuccessPage } from './pages/SuccessPage/SuccessPage';
import { BookPage } from './pages/Bookpage/BookPage'

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/book/:bookTitle" element={<BookPage />} />  {/* Add this line */}
          {/* Add more routes here as needed */}
        </Routes>
        
      </div>
    </Router>
  );
};

export default App;
