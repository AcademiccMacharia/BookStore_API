import React, { useEffect, useState } from 'react';

const Loans = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6050/borrowers')
      .then(res => res.json())
      .then(data => setData(data.results[0]))
      .catch(err => console.log(err))
  }, []);

  console.log(data);
  return (
    <div className="book-table-container">
      <h3>Borrowed Books</h3>
      <table className="book-table">
        <thead>
          <tr>
            <th>Member ID</th>
            <th>Book Name</th>
            <th>Book ID</th>
            <th>Book Title</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.MemberID}>
              <td>{d.MemberID}</td>
              <td>{d.Name}</td>
              <td>{d.BookID}</td>
              <td>{d.Title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Loans;
