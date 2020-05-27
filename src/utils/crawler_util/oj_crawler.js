/**
 * 调用爬虫
 * @param username
 * @param crawling     爬虫函数
 * @returns {Promise<{submissions: number, solved: number}>}
 * return -2:爬取时出错  -3:无用户名
 */
const proxy_url_array = ['https://bird.ioliu.cn/v1', 'https://bird.ioliu.cn/v2']
const config = { // 代理设置
  use_proxy: true,
  proxy_url: '',
  username: 'Deft_t',
  password: 'a7dTxD_bTwB73KX'
}
module.exports = async function(username, crawling) {
  const res_error = { 'solved': -2, 'submissions': -2 }
  const res_nouser = { 'solved': -3, 'submissions': -3 }
  if (username === '' || username === null || username === undefined) return res_nouser
  config.proxy_url = proxy_url_array[random(0, proxy_url_array.length - 1)] // 随机选择代理网址
  try {
    const res = await crawling(config, username)
    // console.log(res)
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
/**
 * 生成随机数闭区间
 * @param lower
 * @param upper
 * @returns {number}
 */
function random(lower, upper) {
  return parseInt(Math.floor(Math.random() * (upper - lower + 1)) + lower)
}
