const mssql = require('mssql');
const config = require('../config/bookStoreConfig');

async function getMemberByID(member_id) {
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.request()
      .input("MemberID", member_id)
      .execute("library.GetMemberByID");

    let member = results.recordset[0];
    return member;
  }
}

const getMemberByEmail = async (email) => {
  try {
    let sql = await mssql.connect(config);
    if (sql.connected) {
      let result = await sql
        .request()
        .input("Email", email)
        .query("SELECT * FROM library.Members WHERE Email = @Email");

      return result.recordset[0];
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};


module.exports = { getMemberByID, getMemberByEmail };
