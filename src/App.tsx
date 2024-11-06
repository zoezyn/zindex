import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
