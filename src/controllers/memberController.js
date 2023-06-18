const config = require('../config/bookStoreConfig');
const mssql = require('mssql');
const bcrypt = require('bcrypt');

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
                    .execute("create_member");

                console.log(results);
                res.json(results);
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
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
              let passwordMatch = await bcrypt.compare(Password, member.Password);
              passwordMatch? res.json({
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
