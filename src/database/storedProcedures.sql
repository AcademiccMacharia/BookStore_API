-- Get book by ID

USE Library;
GO

CREATE PROCEDURE get_book_by_id
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

CREATE PROCEDURE create_member
    @Name VARCHAR(50),
    @Address VARCHAR(50),
    @ContactNumber VARCHAR(50),
    @Password VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Members (Name, Address, ContactNumber, Password)
    VALUES (@Name, @Address, @ContactNumber, @Password);
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

CREATE OR ALTER PROCEDURE GetMemberByID
    @MemberID INT
AS
BEGIN
    SELECT *
    FROM Members
    WHERE MemberID = @MemberID;
END;
GO

EXEC GetMemberByID @MemberID = 1;