export default async function (users_info) {
  setTimeout(function() {
    console.log(users_info)
    users_info[0]['oj_info']['codeforces']['solved'] = 999
    return users_info[0]
  }, 5000);
}




