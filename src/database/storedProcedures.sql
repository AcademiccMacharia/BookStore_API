-- Get book by ID

USE Library;
GO

CREATE PROCEDURE library.get_book_by_id
    @BookID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM Books
    WHERE BookID = @BookID;
END
GO

EXEC get_book_by_id @BookID = 3;

-- Create new Member

CREATE PROCEDURE library.create_member
    @Name VARCHAR(50),
    @Address VARCHAR(50),
    @ContactNumber VARCHAR(50),
    @Email VARCHAR(255),
    @Password VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO library.Members (Name, Address, ContactNumber, Email, Password)
    VALUES (@Name, @Address, @ContactNumber, @Email, @Password);
END;

-- EXEC create_member
--     @Name='Abunwasi',
--     @Address='Nyeri - 4567',
--     @ContactNumber='+254 712 345 574'
--     @Password='Secret123'

 

-- SELECT * FROM Members;

-- Return Book
USE Library;
GO

CREATE PROCEDURE ReturnBook
    @MemberID INT,
    @BookID INT
AS
BEGIN
    SET NOCOUNT ON;
    
    DELETE FROM Loans
    WHERE MemberID = @MemberID
    AND BookID = @BookID;

    UPDATE Books
    SET Status = 'Available'
    WHERE BookID = @BookID;
END
GO

-- Get member by ID

USE Library;
GO

CREATE OR ALTER PROCEDURE library.GetMemberByID
    @MemberID INT
AS
BEGIN
    SELECT *
    FROM library.Members
    WHERE MemberID = @MemberID;
END;
GO

EXEC GetMemberByID @MemberID = 1;

CREATE OR ALTER PROCEDURE library.getMemberByEmail
    @Email
AS
BEGIN
    SELECT *
    FROM library.Members
    WHERE Email = @Email;
END;
GO