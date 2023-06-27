import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [borrowed, setBorrowed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:6050/available');
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const data = await response.json();
      setBooks(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBorrow = async (bookId) => {
    try {
      const response = await fetch('http://localhost:6050/borrow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          MemberID: '84',
          BookID: bookId,
          LoanDate: new Date().toISOString(),
          ReturnDate: new Date().toISOString(), 
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      console.log(data);

      setBorrowed(true);
      setShowPopup(true);

    } catch (error) {
      console.log(error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className='book'>
      {showPopup && (
        <div className='popup'>
          <p>Book borrowed successfully!</p>
          <button className='close-button' onClick={closePopup}>Close</button>
        </div>
      )}
      <h3>Books</h3>
      <div className='book-list'>
        {books.map((book) => (
          <div key={book.BookID} className='book-item'>
            
              <div className='book-card'>
              <Link to={`/books/${book.BookID}`}><img src={book.thumbbnailUrl} alt={book.Title} /></Link>
                <div className='book-details'>
                  <div className='book-content'>
                  <h4>Title: {book.Title}</h4>
                  <p>Author: {book.Author}</p>
                  </div>
                  <button className='borrow-button' onClick={() => handleBorrow(book.BookID)}>Borrow</button>
                </div>
              </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;


