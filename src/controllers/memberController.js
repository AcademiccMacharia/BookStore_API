const config = require('../config/bookStoreConfig');
const mssql = require('mssql');
const bcrypt = require('bcrypt');
const { tokenGenerator } = require('../utils/tokens');
const { sendMail } = require('../utils/sendMail');
const { newMemberValidator } = require('../validators/newMemberValidator');

module.exports = {
  postMember: async (req, res) => {
    try {
      let member = req.body;
      let hashedPwd = await bcrypt.hash(member.Password, 8);

      let { value } = newMemberValidator(member);
      let sql = await mssql.connect(config);
      if (sql.connected) {
        let emailExists = await sql.request()
          .input("Email", value.Email)
          .query("SELECT COUNT(*) AS EmailCount FROM library.Members WHERE Email = @Email");

        if (emailExists.recordset[0].EmailCount > 0) {
          return res.status(400).json({
            success: false,
            message: "Email already exists"
          });
        }

        let results = await sql.request()
          .input("Name", value.Name)
          .input("Address", value.Address)
          .input("ContactNumber", value.ContactNumber)
          .input("Password", hashedPwd)
          .input("Email", value.Email)
          .execute("library.create_member");

        console.log(results);
        try {
          await sendMail(member.Email, member.Name);
        } catch {
          console.log("error");
        }
        res.json({
          success: true,
          message: "Member created successfully",
          results: results.recordsets[0]
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },


  loginMember: async (req, res) => {
    let { Email, Password } = req.body;
    try {
      let sql = await mssql.connect(config);
      if (sql.connected) {
        let result = await sql.request()
          .input("Email", mssql.VarChar(255), Email)
          .execute("library.GetMemberByEmail");

        let member = result.recordset[0];
        if (member) {
          let passwordMatch = await bcrypt.compare(Password, member.Password);
          if (passwordMatch) {
            let token = await tokenGenerator({
              MemberID: member.MemberID,
              roles: "admin"
            });

            res.json({
              success: true,
              message: "Logged in Successfully",
              token
            });
          } else {
            res.status(401).json({
              success: false,
              message: "Wrong credentials"
            });
          }
        } else {
          res.status(404).json({
            success: false,
            message: "No user found"
          });
        }
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}