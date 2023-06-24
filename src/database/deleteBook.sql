CREATE PROCEDURE library.DeleteBook
    @BookID INT
AS
BEGIN
    SET NOCOUNT ON;
    
    DELETE FROM library.Books
    WHERE BookID = @BookID;
END;
GO

EXEC library.DeleteBook @BookID = 1;