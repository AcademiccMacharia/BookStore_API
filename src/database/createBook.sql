CREATE PROCEDURE library.CreateBook
    @Title VARCHAR(100),
    @Author VARCHAR(50),
    @PublicationYear DATE,
    @Status VARCHAR(20) = 'Available'
    @Category VARCHAR(255),
    @ImageUrl VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO library.Books (Title, Author, PublicationYear, Status, Category, ImageUrl)
    VALUES (@Title, @Author, @PublicationYear, @Status, @Category, @ImageUrl);
END;
GO

SELECT * FROM library.Books;