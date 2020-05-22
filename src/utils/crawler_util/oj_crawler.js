/**
 * 调用爬虫
 * @param username
 * @param crawling     爬虫函数
 * @returns {Promise<void>}
 */
module.exports = async function(username, crawling) {
  res = { 'solved': -1, 'submissions': -1 }
  try {
    res = await crawling('', username)
    return res
  } catch (e) {
    return res
  }
  return res
  // Promise.all([crawling('', username)]).then(result => {
  //   // console.log(result)
  //   res = result[0]
  // }).catch((error) => {
  //   // console.log(crawling + ' ' + username + error)
  //   return res
  // })
}
