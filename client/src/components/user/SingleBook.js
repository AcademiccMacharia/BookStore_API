import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await fetch(`http://localhost:6050/books/${id}`);

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      setBook(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className='single-book'>
      <h3>{book.Title}</h3>
      <p>{book.Author}</p>
      <p>{book.short_description}</p>
      <p>{book.PublicationYear}</p>
      <img src={book.thumbbnailUrl} alt={book.title} />
    </div>
  );
};

export default SingleBook;
