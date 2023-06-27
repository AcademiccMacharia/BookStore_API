import React, { useEffect, useState } from 'react';

const Loans = () => {
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    getBooksBorrowedByMember();
  }, []);

  const getBooksBorrowedByMember = async () => {
    try {
      const response = await fetch('http://localhost:6050/borrowed/84');
      const data = await response.json();
      setData(data.results);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReturnBook = async (bookID) => {
    try {
      const response = await fetch(`http://localhost:6050/return`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          MemberID: 84, // Replace with the actual member ID
          BookID: bookID,
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setShowPopup(true);
      getBooksBorrowedByMember();
    } catch (error) {
      console.log(error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="book-table-container">
      <h3>Borrowed Books</h3>
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Book ID</th>
            <th>Return Book</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.BookID}>
              <td>{d.Title}</td>
              <td>{d.Author}</td>
              <td>{d.BookID}</td>
              <td>
                <button className="return-btn" onClick={() => handleReturnBook(d.BookID)}>
                  Return
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Book returned successfully!</p>
            <button className="close-btn" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loans;
