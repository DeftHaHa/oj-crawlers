const request = require('superagent')

module.exports = async function(users_info) {

  let usernames = ""
  for(let user of users_info){
      usernames = await (usernames + user['oj_info']['codeforces']['username'] + ';')
  }
  const info = await query_user_info(usernames)
  return info
}


/**
 * 查询 user.info
 * @param username
 * @returns {Promise<null>}
 */
async function query_user_info(usersname) {
  console.log(usersname)
  let res = {}
  try {
    res = await request
      .get('http://codeforces.com/api/user.info')
      .query({ handles: usersname })

    res_obj = JSON.parse(res.text)
    //console.log(res_obj.result)
    if(res_obj.status === 'OK') return JSON.parse(res.text).result
  } catch (e) {
    console.log(e)
    return res;
  }
}
