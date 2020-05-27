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

const oj_names_use_api = ['leetcode_cn',''] //哪些OJ使用api
module.exports = async function (username, crawler_function,oj_name) {
  const res_error = { 'solved': -2, 'submissions': -2 }
  const res_nouser = { 'solved': -3, 'submissions': -3 }
  if (username === '' || username === null || username === undefined) return res_nouser
  config.proxy_url = proxy_url_array[random(0, proxy_url_array.length - 1)] // 随机选择代理网址
  const MAX_time = 10 // 请求失败的重复次数
  let use_api = false
  for (let oj_name_use_api of oj_names_use_api){
    if(oj_name_use_api === oj_name) use_api = true
  }
  for (let i = 0; i < MAX_time; i++) {
    try {
      if(!use_api)   {
        return await crawler_function(config, username)
      }  //不使用后端api
      else {
        let res = await crawlers_api(username,oj_name)    //使用后端api
        if(!res.error) return res.data
      }
    } catch (e) {
      if (i === MAX_time) {
        console.log(username + 'oj_crawler Fail: ' + e)
        return res_error
      }
    }
  }
  return res_error
}

/**
 * 调用后端接口
 * @param username
 * @param oj_name
 * @returns {Promise<void>}
 */
const request = require('superagent')
async function crawlers_api(username,oj_name) {
  let url = 'http://localhost:12001/api/crawlers/' + oj_name + "/" +username
  let res = await request.get(url)
  return res.body
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
