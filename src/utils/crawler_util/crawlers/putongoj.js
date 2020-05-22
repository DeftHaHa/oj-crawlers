const request = require('superagent')

// eslint-disable-next-line no-undef

module.exports = async function(config, username) {
  if (!username) {
    throw new Error('请输入用户ID')
  }
  /**
   * PutongOJ用户名可能为中文
   * @type {string}
   */
  username = encodeURI(username)
  let solved = null
  let submissions = null
  const solvedList = new Set()

  // eslint-disable-next-line no-constant-condition
  const res = await request
    .get(`https://acm.cjlu.edu.cn/api/user/${username}`)
    .query({
      uid: username
    })

  if (!res.ok) {
    throw new Error(`Server Response Error: ${res.status}`)
  }
  const res_obj = JSON.parse(res.text)
  try {
    if (solved == null) {
      solved = res_obj.user.solve
      submissions = res_obj.user.submit
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
