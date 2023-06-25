CREATE TRIGGER UpdateBook
ON library.Loans
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    UPDATE library.Books
    SET Status = 'Loaned'
    WHERE BookID IN (SELECT BookID FROM inserted);

    UPDATE Books
    SET Status = 'Available'
    WHERE BookID IN (SELECT BookID FROM deleted);
END;