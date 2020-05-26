const request = require('superagent')
export default async function(users_info,vm) {

  let usernames = ""
  for(let user of users_info){
      usernames = (usernames + user['oj_info']['codeforces']['username'] + ';')
  }
  const info = await query_user_info(usernames)

  for(const [index, user] of Object.entries(users_info)){
    vm.users_oj_info_data[index]['oj_info']['codeforces']['info']['rating'] = info[index]['rating']
    vm.users_oj_info_data[index]['oj_info']['codeforces']['info']['maxRating'] = info[index]['maxRating']
  }
}


/**
 * 查询 user.info
 * @param username
 * @returns {Promise<null>}
 */
async function query_user_info(usersnames_handle) {
  //console.log(usersnames_handle)
  let res = {}
  try {
    res = await request
      .get('http://codeforces.com/api/user.info')
      .query({ handles: usersnames_handle })

    let res_obj = JSON.parse(res.text)
    //console.log(res_obj.result)
    if(res_obj.status === 'OK') return JSON.parse(res.text).result
  } catch (e) {
    console.log(e)
    return res;
  }
}
