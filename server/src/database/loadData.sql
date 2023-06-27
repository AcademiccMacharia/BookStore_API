ALTER DATABASE [Bookstore]
SET SINGLE_USER --or RESTRICTED_USER
WITH ROLLBACK IMMEDIATE;
GO
DROP DATABASE [Bookstore];
GO

CREATE DATABASE Bookstore;
GO

USE Bookstore;
GO

CREATE SCHEMA library;
GO

CREATE TABLE library.Books (
  BookID INT IDENTITY(1, 1) PRIMARY KEY,
  Title VARCHAR(100) NOT NULL,
  Author VARCHAR(50) NOT NULL,
  PublicationYear DATE,
  ImageUrl VARCHAR(255) NOT NULL,
  Status VARCHAR(20) DEFAULT 'Available'
);

CREATE TABLE library.Members (
  MemberID INT IDENTITY(1, 1) PRIMARY KEY,
  Name VARCHAR(50) NOT NULL,
  Email VARCHAR(255) NOT NULL UNIQUE,
  Address VARCHAR(50) NOT NULL,
  ContactNumber VARCHAR(50) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Role VARCHAR(255) DEFAULT 'User'
);
GO

CREATE TABLE library.Loans (
  LoanID INT IDENTITY(1, 1) PRIMARY KEY,
  BookID INT NOT NULL,
  MemberID INT NOT NULL,
  LoanDate DATE NOT NULL,
  ReturnDate DATE,
  FOREIGN KEY (BookID) REFERENCES Books (BookID),
  FOREIGN KEY (MemberID) REFERENCES Members (MemberID)
);
GO


USE Library;

INSERT INTO library.Books (Title, Author, PublicationYear, ImageUrl)
VALUES
    ('The Silent Witness', 'Emily Collins', '2019-08-12', 'https://m.media-amazon.com/images/I/51FWmarLGEL.jpg'),

    ('Beyond the Horizon', 'Michael Adams', '2020-03-27', 'https://m.media-amazon.com/images/I/51NYDwJ0m5L._SX364_BO1,204,203,200_.jpg'),

    ('The Forgotten Path', 'Sarah Mitchell', '2017-11-05', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1670861660i/65831389.jpg'),

    ('Echoes of Destiny', 'Benjamin Foster', '2022-06-14', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1641593510i/60057742.jpg'),

    ('The Secret Garden', 'Jessica Anderson', '2015-09-03', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327873635i/2998.jpg'),

    ('The Lost Symbol', 'Christopher Roberts', '2009-11-25', 'https://m.media-amazon.com/images/I/51FM28OaUkL._SX328_BO1,204,203,200_.jpg'),

    ('Shadows of Betrayal', 'Samantha Collins', '2018-05-18', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1639526791i/59826212.jpg'),

    ('The Art of Deception', 'David Mitchell', '2013-02-09', 'https://m.media-amazon.com/images/I/61vGIv1Dy+L.jpg'),

    ('The Crimson Crown', 'Olivia Davis', '2021-10-20', 'https://m.media-amazon.com/images/I/51lz8wXbh3L.jpg'),

    ('1984', 'George Orwell', '1949-06-08', 'https://m.media-amazon.com/images/I/612oBD9OSjL.jpg'),

    ('The Catcher in the Rye', 'J.D. Salinger', '1951-07-16', 'https://m.media-amazon.com/images/I/51Dzbf3oPKL.jpg'),

    ('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', '1997-06-26', 'https://m.media-amazon.com/images/I/51xJbFMRsxL.jpg'),

    ('The Hobbit', 'J.R.R. Tolkien', '1937-09-21', 'https://m.media-amazon.com/images/P/054792822X.01._SCLZZZZZZZ_SX500_.jpg');

GO

INSERT INTO Members (Name, Email, Address, ContactNumber, Password)