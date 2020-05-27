const request = require('superagent')

const hostName = 'vjudge.net'

/**
 * vjudge 的设置项
 * @typedef vjudgeCrawlerConfig
 * @type {Object}
 * @param {String} crawler_login_user - 登录 vjudge 使用的用户名，vj需要一个账户才能访问api
 * @param {String} crawler_login_password
 */

/**
 * vjudge 的爬虫函数
 * @param {vjudgeCrawlerConfig} config
 * @param username 要爬取的用户名
 * @returns {Promise<crawlerReturns>} - 见 configReader
 */
module.exports = async function(config, username) {
  if (!username) {
    throw new Error('Please enter username')
  }
  let solved = -2
  let submissions = -2

  try {
    let res = {}
    if(config.use_proxy){  //使用代理
      const url = config.proxy_url +"?url="+ 'https://new.npuacm.info/api/crawlers/vjudge/' + username
      //console.log(url)
      res = await request
        .get(url)
    }
    else {
      res = await request
        .get('https://new.npuacm.info/api/crawlers/vjudge/DeftHaHa')
    }
    const resObj = JSON.parse(res.text)
    solved = resObj.data.solved
    submissions = resObj.data.submissions

  } catch (err) {
    console.log('vjudge  failed')
    const error = new Error('vjudge  failed')
    error.innerError = err
    throw error
  }



  return {
    solved: solved,
    submissions: submissions,
    solvedList: []
  }
}
