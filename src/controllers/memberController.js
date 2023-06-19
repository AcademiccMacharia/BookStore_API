const config = require('../config/bookStoreConfig');
const mssql = require('mssql');
const bcrypt = require('bcrypt');
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

      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
