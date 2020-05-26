const request = require('superagent')

module.exports = async function(config, username) {
  if (!username) {
    throw new Error('Please enter username')
  }


  let uidRes = {}
  if(config.use_proxy){  //使用代理
    const url = config.proxy_url +"?url="+ 'https://www.luogu.com.cn/fe/api/user/search?keyword=' + username
    //console.log(url)
    uidRes = await request
      .get(url)
  }
  else {
    uidRes = await request
      .get('https://www.luogu.com.cn/fe/api/user/search')
      .query({ keyword: username })
  }



  if (!uidRes.ok) {
    throw new Error(`Server Response Error: ${uidRes.status}`)
  }

  const uidJSON = JSON.parse(uidRes.text)

  if (uidJSON.users[0] == null) {
    throw new Error('The user does not exist')
  }

  const uid = uidJSON.users[0].uid
  let res = {}
  if(config.use_proxy){  //使用代理
    config.proxy_url = 'https://bird.ioliu.cn/v1'
    const url = config.proxy_url +"?url="+ 'https://www.luogu.com.cn/user/' + uid
    //console.log(url)
    res = await request.get(url)
  }
  else {
    res = await request
      .get('wwd.domain/api/https://www.luogu.com.cn/user/' + uid)
  }



  if (!res.ok) {
    throw new Error(`Server Response Error: ${res.status}`)
  }
  //console.log(decodeURIComponent(res.text.match("(?<=decodeURIComponent\\(\\\\\\\")(.*?)(?=\\\\\\\"\\))")))
  //console.log("@@@")
  //console.log(res.text)
  //console.log(decodeURIComponent(res.text.match("(?<=decodeURIComponent\\(\\\\\\\")(.*?)(?=\\\\\\\"\\))")[0]))

  try {
    const data = await decodeURIComponent(res.text.match("(?<=decodeURIComponent\\(\\\\\\\")(.*?)(?=\\\\\\\"\\))")[0])
    const userJson = await JSON.parse(data)
    //const solvedJson = userJson.currentData.passedProblems
    //const acList = solvedJson.map((p) => p.pid)

    return {
      submissions: userJson.currentData.user.submittedProblemCount,
      solved: userJson.currentData.user.passedProblemCount,
      solvedList: {}
    }
  } catch (e) {
    console.log('luogu'+e)
    throw new Error('Error while parsing')
  }
}
