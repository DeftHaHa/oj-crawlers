const request = require('superagent')

export default async function(vm) {
  try {
    const url = 'https://bird.ioliu.cn/v1?url=http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1'
    const result = await request.get(url)
    const resObj = JSON.parse(result.text)
    const imageURL = 'http://cn.bing.com' + resObj.images[0].url
    const stlyString = "background-image:url('" + imageURL + "'); background-repeat:no-repeat ;background-size:cover;"
    console.log(stlyString)
    vm.backGroundStyle = stlyString
    // vm.getbackGroundUrl =  'http://cn.bing.com'+resObj.images[0].url
  } catch (e) {
    console.log(e)
  }
}
