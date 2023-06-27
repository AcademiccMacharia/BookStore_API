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