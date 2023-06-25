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