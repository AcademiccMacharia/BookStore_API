CREATE PROCEDURE library.create_member
    @Name VARCHAR(50),
    @Email VARCHAR(255),
    @Address VARCHAR(50),
    @ContactNumber VARCHAR(50),
    @Password VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO library.Members (Name, Email, Address, ContactNumber, Password)
    VALUES (@Name, @Email, @Address, @ContactNumber, @Password);
END;