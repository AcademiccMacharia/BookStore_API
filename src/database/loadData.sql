USE Library;


INSERT INTO Books (Title, Author, PublicationYear)
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


INSERT INTO Members (Name, Address, ContactNumber)
VALUES
    ('John Kimani', 'Nairobi, Kenya', '+254 712 345 678'),
    ('Grace Muthoni', 'Mombasa, Kenya', '+254 701 234 567'),
    ('Peter Wanjiku', 'Nakuru, Kenya', '+254 703 456 789'),
    ('Mary Njeri', 'Kisumu, Kenya', '+254 712 345 678'),
    ('James Kamau', 'Eldoret, Kenya', '+254 702 345 678'),
    ('Faith Wairimu', 'Nairobi, Kenya', '+254 712 345 678'),
    ('Joseph Mwangi', 'Mombasa, Kenya', '+254 701 234 567'),
    ('Susan Akinyi', 'Nakuru, Kenya', '+254 703 456 789'),
    ('David Omondi', 'Kisumu, Kenya', '+254 712 345 678'),
    ('Elizabeth Auma', 'Eldoret, Kenya', '+254 702 345 678'),
    ('Michael Ochieng', 'Nairobi, Kenya', '+254 712 345 678'),
    ('Catherine Wanjiru', 'Mombasa, Kenya', '+254 701 234 567'),
    ('Samuel Njoroge', 'Nakuru, Kenya', '+254 703 456 789'),
    ('Joyce Achieng', 'Kisumu, Kenya', '+254 712 345 678'),
    ('Daniel Mutua', 'Eldoret, Kenya', '+254 702 345 678'),
    ('Rose Mwikali', 'Nairobi, Kenya', '+254 712 345 678'),
    ('Pauline Muthoni', 'Mombasa, Kenya', '+254 701 234 567'),
    ('Simon Mwaura', 'Nakuru, Kenya', '+254 703 456 789'),
    ('Grace Achieng', 'Kisumu, Kenya', '+254 712 345 678'),
    ('Joshua Okoth', 'Eldoret, Kenya', '+254 702 345 678');
GO

SELECT * FROM Books;

SELECT * FROM Members;