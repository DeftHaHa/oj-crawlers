/**
 * 调用爬虫
 * @param username
 * @param crawling     爬虫函数
 * @returns {Promise<void>}
 */
module.exports = async function(username, crawling) {
  Promise.all([crawling('', username)]).then(result => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })
}
