const config = require('../config/bookStoreConfig');
const mssql = require('mssql');
const bcrypt = require('bcrypt');
<<<<<<< HEAD
const { newMemberValidator } = require('../validators/newMemberValidator');

module.exports = {
  postMember: async (req, res) => {
    let member = req.body;
    try {


      let { value } = newMemberValidator(member)

      let hashedPwd = await bcrypt.hash(member.password, 8);

      let sql = await mssql.connect(config);

      if (sql.connected) {
        let results = await sql.request()
          .input("Name", value.Name)
          .input("Address", value.Address)
          .input("ContactNumber", value.ContactNumber)
          .input("Password", hashedPwd)
          .execute("create_member");

        console.log(results);
        results.rowsAffected ? res.status(201).send({ success: true, message: 'saved user' })
          : res.status(500).send({ success: false, message: 'An error occured. Try again!' })
      }
    } catch (error) {
      res.send(error.message)

    }
  },

  loginMember: async (req, res) => {
    try {
      let { MemberID, Password } = req.body;

      let sql = await mssql.connect(config);
      if (sql.connected) {
        let results = await sql
          .request()
          .input("MemberID", MemberID)
          .execute("GetMemberByID");

        let member = results.recordset[0];
        if (member) {
          let passwordMatch = await bcrypt.compare(Password, member.password);
          passwordMatch ? res.json({
            success: true,
            message: "Logged in Successfully"
          })
            : res.status(401).json({
              success: false,
              message: "Wrong credentials"
            });
        } else {
          res.status(404).json({
            success: false,
            message: "No user found"
          });
        }
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    } catch (error) {

=======
const { getMemberByID } = require('../utils/getMember');
const { tokenGenerator } = require('../utils/tokens');

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
          .execute("library.create_member");

        console.log(results);
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
          })

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
>>>>>>> main
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
