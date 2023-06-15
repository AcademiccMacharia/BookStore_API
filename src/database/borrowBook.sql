
CREATE PROCEDURE library.BorrowBook
    @MemberID INT,
    @BookID INT,
    @LoanDate DATE,
    @ReturnDate DATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Checking if the book is available
    IF EXISTS (SELECT 1
    FROM Books
    WHERE BookID = @BookID AND Status = 'Available')
    BEGIN

        INSERT INTO Loans
            (BookID, MemberID, LoanDate, ReturnDate)
        VALUES
            (@BookID, @MemberID, @LoanDate, @ReturnDate);

        UPDATE Books SET Status = 'Borrowed' WHERE BookID = @BookID;

        SELECT 'Book borrowed successfully.' AS [Status];
    END
    ELSE
    BEGIN
        SELECT 'Book is not available for borrowing.' AS [Status];
    END;
END;
GO

DECLARE @MemberID INT;
DECLARE @BookID INT
DECLARE @LoanDate DATE;
DECLARE @ReturnDate DATE;


SET @MemberID = 2;
SET @BookID = 5;
SET @LoanDate = '2023-06-15';
SET @ReturnDate = '2023-07-15';

EXEC library.BorrowBook @MemberID, @BookID, @LoanDate, @ReturnDate;