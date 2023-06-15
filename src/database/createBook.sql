CREATE PROCEDURE library.CreateBook
    @Title VARCHAR(100),
    @Author VARCHAR(50),
    @PublicationYear DATE,
    @Status VARCHAR(20) = 'Available'
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO library.Books (Title, Author, PublicationYear, Status)
    VALUES (@Title, @Author, @PublicationYear, @Status);
END;
GO
EXEC library.CreateBook
    @Title='Abunwasi na sufuria',
    @Author='Chungu mwema',
    @PublicationYear='2018-02-21'
GO
SELECT * FROM library.Books;