import React, { useState } from 'react';

const Borrow = () => {
  const [memberID, setMemberID] = useState('');
  const [bookID, setBookID] = useState('');
  const [email, setEmail] = useState('');
  const [loanDate, setLoanDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:6050/borrow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        MemberID: memberID,
        BookID: bookID,
        Email: email,
        LoanDate: loanDate,
        ReturnDate: returnDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMemberID('');
        setBookID('');
        setEmail('');
        setLoanDate('');
        setReturnDate('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="borrow-book">
      <h2>Borrow Book</h2>
      <p>Words ignite worlds within us.</p>
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
          <label>
            Loan Date:
            <input
              type="date"
              value={loanDate}
              onChange={(e) => setLoanDate(e.target.value)}
            />
          </label>
          <label>
            Return Date:
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </label>
          <button type="submit">Get it!</button>
        </form>
      </div>
    </div>
  );
};

export default Borrow;
