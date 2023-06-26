CREATE OR ALTER PROCEDURE GetMemberByID
    @MemberID INT
AS
BEGIN
    SELECT *
    FROM Members
    WHERE MemberID = @MemberID;
END;
GO