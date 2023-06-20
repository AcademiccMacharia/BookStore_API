const config = require('../config/bookStoreConfig');
const mssql = require('mssql');
const bcrypt = require('bcrypt');
const { getMemberByID } = require('../utils/getMember');
const { tokenGenerator } = require('../utils/tokens');
const { sendMail } = require('../utils/sendMail');

module.exports = {
  postMember: async (req, res) => {
    try {
      let member = req.body;
      let hashedPwd = await bcrypt.hash(member.Password, 8);

      let sql = await mssql.connect(config);
      if (sql.connected) {
        let results = await sql.request()
          .input("Name", member.Name)
          .input("Address", member.Address)
          .input("ContactNumber", member.ContactNumber)
          .input("Password", hashedPwd)
          .input("Email", member.Email)
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
    let { MemberID, Password } = req.body;
    try {
      let member = await getMemberByID(MemberID);
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
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

