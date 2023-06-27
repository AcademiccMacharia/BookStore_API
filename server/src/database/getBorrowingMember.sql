CREATE OR ALTER PROCEDURE library.GetBorrowingMember
    @BookID INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Members.MemberID, Members.Name, Members.Address, Members.ContactNumber, Books.BookID, Books.Title
    FROM Members
    INNER JOIN Loans ON Members.MemberID = Loans.MemberID
    INNER JOIN Books ON Loans.BookID = Books.BookID
    WHERE Books.BookID = @BookID OR @BookID IS NULL;
END;