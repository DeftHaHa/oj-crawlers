
const request = require('superagent')

module.exports = async function(config, username) {
  if (!username) {
    throw new Error('Please enter username')
  }

  const input = {
    query: 'query userPublicProfile($userSlug:String!){userProfilePublicProfile(userSlug:$userSlug){submissionProgress{totalSubmissions acTotal}}}',
    variables: { userSlug: username }
  }

  let res = {}
  if (config.use_proxy) { // 使用代理
    // const url = config.proxy_url + '?=' + 'https://leetcode-cn.com/graphql'
    // input.url = 'https://leetcode-cn.com/graphql'
    res = await request
      .post('https://leetcode-cn.com/graphql')
      .send(input)
  } else {
    res = await request
      .post('https://leetcode-cn.com/graphql')
      .send(input)
  }
  console.log(res)
  const data = res.body.data.userProfilePublicProfile

  if (!data) {
    throw new Error('The user does not exist')
  }

  return {
    solved: data.submissionProgress.acTotal,
    submissions: data.submissionProgress.totalSubmissions
  }
}

function serialize(obj) {
  const str = []
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  return str.join('&')
}
