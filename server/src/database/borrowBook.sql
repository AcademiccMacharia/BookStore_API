CREATE OR ALTER PROCEDURE library.BorrowBook
    @MemberID INT,
    @BookID INT,
    @LoanDate DATE,
    @ReturnDate DATE,
    @Status NVARCHAR(100) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    -- Checking if the book is available
    IF EXISTS (SELECT 1
        FROM Books
        WHERE BookID = @BookID AND Status = 'Available')
    BEGIN
        INSERT INTO Loans (BookID, MemberID, LoanDate, ReturnDate)
        VALUES (@BookID, @MemberID, @LoanDate, @ReturnDate);

        UPDATE Books SET Status = 'Borrowed' WHERE BookID = @BookID;

        SET @Status = 'Book borrowed successfully.';

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
            INNER JOIN Loans ON Books.BookID = Loans.BookID
            INNER JOIN Members ON Members.MemberID = Loans.MemberID
        WHERE
            Books.BookID = @BookID;
    END
    ELSE
    BEGIN
        SET @Status = 'Book is not available for borrowing.';
        SELECT @Status AS [Status];
    END;
END;
GO
