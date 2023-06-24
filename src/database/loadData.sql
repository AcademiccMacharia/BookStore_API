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

CREATE TABLE library.Books(
    BookID INT IDENTITY(1,1) PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    Author VARCHAR(50) NOT NULL,
    PublicationYear DATE,
    Status VARCHAR(20) DEFAULT 'Available',
    Category VARCHAR(255) NOT NULL,
    ImageUrl VARCHAR(255)
);
GO

CREATE TABLE library.Members(
    MemberID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Address VARCHAR(50) NOT NULL,
    ContactNumber VARCHAR(50) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
);
GO

CREATE TABLE library.Loans (
    LoanID INT IDENTITY(1, 1) PRIMARY KEY,
    BookID INT NOT NULL,
    MemberID INT NOT NULL,
    LoanDate DATE NOT NULL,
    ReturnDate DATE NOT NULL,
    FOREIGN KEY (BookID) REFERENCES library.Books (BookID),
    FOREIGN KEY (MemberID) REFERENCES library.Members (MemberID),
    CONSTRAINT UQ_BookID UNIQUE (BookID)
);
GO


USE Bookstore;

INSERT INTO library.Books (Title, Author, PublicationYear)
VALUES
    ('The Silent Witness', 'Emily Collins', '2019-08-12'),

    ('Beyond the Horizon', 'Michael Adams', '2020-03-27'),

    ('The Forgotten Path', 'Sarah Mitchell', '2017-11-05'),

    ('Echoes of Destiny', 'Benjamin Foster', '2022-06-14'),

    ('The Secret Garden', 'Jessica Anderson', '2015-09-03'),

    ('The Lost Symbol', 'Christopher Roberts', '2009-11-25'),

    ('Shadows of Betrayal', 'Samantha Collins', '2018-05-18'),

    ('The Art of Deception', 'David Mitchell', '2013-02-09'),

    ('The Crimson Crown', 'Olivia Davis', '2021-10-20'),

    ('A Thousand Splendid Suns', 'Khaled Hosseini', '2007-05-22'),

    ('The Girl on the Train', 'Paula Hawkins', '2015-01-13'),

    ('The Alchemist', 'Paulo Coelho', '1988-06-01'),

    ('The Da Vinci Code', 'Dan Brown', '2003-04-01'),

    ('Pride and Prejudice', 'Jane Austen', '1813-01-28'),

    ('To Kill a Mockingbird', 'Harper Lee', '1960-07-11'),

    ('The Great Gatsby', 'F. Scott Fitzgerald', '1925-04-10'),

    ('1984', 'George Orwell', '1949-06-08'),

    ('The Catcher in the Rye', 'J.D. Salinger', '1951-07-16'),

    ('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', '1997-06-26'),

    ('The Hobbit', 'J.R.R. Tolkien', '1937-09-21');

GO

INSERT INTO library.Members (Name, Address, ContactNumber, Email, Password)
VALUES
    ('John Kimani', 'Nairobi, Kenya', '+254 712 345 678', 'example@example.com', 'P@ssw0rd1');
GO