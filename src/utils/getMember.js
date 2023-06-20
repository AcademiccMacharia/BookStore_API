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

module.exports = { getMemberByID };
