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
    @ContactNumber VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Members (Name, Address, ContactNumber)
    VALUES (@Name, @Address, @ContactNumber);
END;

-- EXEC create_member
--     @Name='Abunwasi',
--     @Address='Nyeri - 4567',
--     @ContactNumber='+254 712 345 574'

 

-- SELECT * FROM Members;