CREATE TRIGGER SetAdminAfterRoleUpdate
ON library.Members
AFTER INSERT, UPDATE
AS
BEGIN
    IF UPDATE(Role)
    BEGIN
        UPDATE library.Members
        SET IsAdmin = 1
        FROM library.Members AS m
        JOIN inserted AS i ON m.MemberID = i.MemberID
        WHERE i.Role = 'admin'
    END
END;
GO