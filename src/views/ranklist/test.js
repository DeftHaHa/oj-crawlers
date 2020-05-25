export default function(users_info) {
  return new Promise(resolve => {
    users_info[0]['oj_info']['codeforces']['solved'] = 666
    setTimeout(() => {
      resolve(users_info)
    }, 1000)
  })
}
