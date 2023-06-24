CREATE PROCEDURE library.GetMemberByEmail
  @Email VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;
  
  SELECT * FROM library.Members WHERE Email = @Email;
END;
GO