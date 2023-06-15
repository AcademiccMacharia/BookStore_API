CREATE PROCEDURE library.GetBorrowingMember
    @BookID INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Members.MemberID, Members.Name, Members.Address, Members.ContactNumber
    FROM Members
        INNER JOIN Loans ON Members.MemberID = Loans.MemberID
    WHERE (@BookID IS NULL OR Loans.BookID = @BookID);
END;
GO