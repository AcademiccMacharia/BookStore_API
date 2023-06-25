-- Get member by ID

USE Library;
GO

CREATE OR ALTER PROCEDURE library.GetMemberByID
    @MemberID INT
AS
BEGIN
    SELECT *
    FROM library.Members
    WHERE MemberID = @MemberID;
END;
GO

EXEC GetMemberByID @MemberID = 1;

CREATE OR ALTER PROCEDURE library.getMemberByEmail
    @Email
AS
BEGIN
    SELECT *
    FROM library.Members
    WHERE Email = @Email;
END;
GO