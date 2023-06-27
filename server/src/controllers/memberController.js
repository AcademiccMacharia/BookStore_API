const config = require('../config/bookStoreConfig');
const mssql = require('mssql');
const bcrypt = require('bcrypt');
const { getMemberByEmail } = require('../utils/getMember');
const { tokenGenerator } = require('../utils/tokens');
const { sendMail } = require('../utils/sendMail');
const { newMemberValidator } = require('../validators/newMemberValidator');

module.exports = {
  postMember: async (req, res) => {
    try {
      let member = req.body;
      let hashedPwd = await bcrypt.hash(member.Password, 8);

      let {value} = newMemberValidator(member)
      let sql = await mssql.connect(config);
      if (sql.connected) {
        let results = await sql.request()
          .input("Name", value.Name)
          .input("Email", value.Email)
          .input("Address", value.Address)
          .input("ContactNumber", value.ContactNumber)
          .input("Password", hashedPwd)
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
      let member = await getMemberByEmail(Email);
      if (member) {
        let passwordMatch = await bcrypt.compare(Password, member.Password);
        if (passwordMatch) {
          let token = await tokenGenerator({
            MemberID: member.MemberID
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

