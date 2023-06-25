CREATE PROCEDURE library.create_member
    @Name VARCHAR(50),
    @Address VARCHAR(50),
    @ContactNumber VARCHAR(50),
    @Email VARCHAR(255),
    @Role VARCHAR(50),
    @Password VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO library.Members (Name, Address, ContactNumber, Email, Role, Password)
    VALUES (@Name, @Address, @ContactNumber, @Email, @Role, @Password);
END;