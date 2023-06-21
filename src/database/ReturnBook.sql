CREATE OR ALTER PROCEDURE library.ReturnBook
    @MemberID INT,
    @BookID INT,
    @Status NVARCHAR(100) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    -- Checking if the book is borrowed by the member
    IF EXISTS (SELECT 1
        FROM Loans
        WHERE MemberID = @MemberID AND BookID = @BookID)
    BEGIN
        DELETE FROM Loans WHERE MemberID = @MemberID AND BookID = @BookID;

        UPDATE Books SET Status = 'Available' WHERE BookID = @BookID;

        SET @Status = 'Book returned successfully.';

        SELECT
            @Status AS [Status],
            Books.BookID,
            Books.Title,
            Members.MemberID,
            Members.Name,
            Members.Address,
            Members.ContactNumber,
            Members.Email
        FROM
            Books
            INNER JOIN Members ON Members.MemberID = @MemberID
        WHERE
            Books.BookID = @BookID;
    END
    ELSE
    BEGIN
        SET @Status = 'Book is not borrowed by the member.';
        SELECT @Status AS [Status];
    END;
END;
GO


DECLARE @MemberID INT = 72; 
DECLARE @BookID INT = 5; 
DECLARE @Status NVARCHAR(100);

EXEC library.ReturnBook
  @MemberID = @MemberID,
  @BookID = @BookID,
  @Status = @Status OUTPUT;