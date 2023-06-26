import React, { useState } from 'react';

const Return = () => {
  const [memberID, setMemberID] = useState('');
  const [bookID, setBookID] = useState('');
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:6050/return', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        MemberID: memberID,
        BookID: bookID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMemberID('');
        setBookID('');
        setEmail('');

        if (data.success) {
          setShowPopup(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="borrow-book">
      <h2>Return Book</h2>
      <p>Words ignite worlds within us.</p>
      {showPopup && (
        <div className="popup">
          <p>Book returned successfully!</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
      <div>
        <form className="borrow-form" onSubmit={handleSubmit}>
          <label>
            Member ID:
            <input
              type="number"
              placeholder="Enter your member ID..."
              value={memberID}
              onChange={(e) => setMemberID(e.target.value)}
            />
          </label>
          <label>
            Book ID:
            <input
              type="number"
              placeholder="Enter your book ID..."
              value={bookID}
              onChange={(e) => setBookID(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              placeholder="Enter your email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default Return;
