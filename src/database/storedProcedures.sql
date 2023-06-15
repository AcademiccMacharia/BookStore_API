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
