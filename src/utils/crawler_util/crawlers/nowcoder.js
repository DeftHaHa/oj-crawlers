const request = require('superagent')
const cheerio = require('cheerio')

module.exports = async function(config, username) {
  if (!username) {
    throw new Error('请输入用户ID')
  }

  if (isNaN(username)) {
    throw new Error('牛客网的输入必须是用户ID（数字格式）')
  }

  username = Number(username) + ''

  let solved = null
  let submissions = null
  const solvedList = new Set()

  let res = {}
  if(config.use_proxy){  //使用代理
    const url = config.proxy_url +"?url="+ "https://ac.nowcoder.com/acm/contest/profile/" + username + "/practice-coding"
    //console.log(url)
    res = await request.get(url)
  }
  else {
    res = await request
      .get(`https://ac.nowcoder.com/acm/contest/profile/${username}/practice-coding`)
  }

  if (!res.ok) {
    throw new Error(`Server Response Error: ${res.status}`)
  }

  const $ = cheerio.load(res.text)

  if ($('.null-tip').text().trim() === '用户不存在') {
    throw new Error('The user does not exist')
  }

  try {
    if (solved == null) {
      solved = Number($('span:contains("题已通过")').prev().text())
      submissions = Number($('span:contains("次提交")').prev().text())
    }
  } catch (e) {
    throw new Error('Error while parsing')
  }

  // eslint-disable-next-line no-unreachable
  return {
    solved,
    submissions,
    solvedList: [...solvedList]
  }
}
