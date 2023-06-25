CREATE PROCEDURE library.CheckLoanStatus
AS
BEGIN
    DECLARE @Today DATE = GETDATE();
    DECLARE @DueDateThreshold DATE = DATEADD(DAY, 3, @Today);

    -- Fetch the member emails for loans that are overdue or due within 3 days
    SELECT M.Email
    FROM library.Loans L
    INNER JOIN library.Members M ON L.MemberID = M.MemberID
    WHERE L.ReturnDate < @Today OR L.ReturnDate <= @DueDateThreshold;
END;
GO
