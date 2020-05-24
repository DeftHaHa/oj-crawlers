/**
 * 调用爬虫
 * @param username
 * @param crawling     爬虫函数
 * @returns {Promise<{submissions: number, solved: number}>}
 * return -2:爬取时出错  -3:无用户名
 */
module.exports = async function(username, crawling) {
  let res_error = { 'solved': -2, 'submissions': -2 }
  let res_nouser =  { 'solved': -3, 'submissions': -3 }
  if (username === '' && username === null && username === undefined) return res_nouser
  try {
    let res = await crawling('', username)
    //console.log(res)
    return res
  } catch (e) {
    return res_error
  }
  // Promise.all([crawling('', username)]).then(result => {
  //   // console.log(result)
  //   res = result[0]
  // }).catch((error) => {
  //   // console.log(crawling + ' ' + username + error)
  //   return res
  // })
}
