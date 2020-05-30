const request = require('superagent')
const users_info = require('./users_info')
const get_color_list = require('../get_color_list')
const MAX_time = 5  //失败重试次数
module.exports = async function() {
  let users_contest_data = []   //每个人完整信息
  let all_chart_series = []
  const colorList= get_color_list()
  try {
    let index = 0
    for (let user of users_info) {
      const username = user['oj_info']['codeforces']['username']
      let res = {}, resObj = {}
      const url = 'https://bird.ioliu.cn/v2?url=http://codeforces.com/api/user.rating?handle=' + username  //使用了代理
      for (let try_time = 0; try_time < MAX_time; try_time++) {
        res = await request.get(url)
        //resObj = res.body
        resObj = JSON.parse(res.text)
        if (resObj.status === 'OK') break
      }
      users_contest_data.push(resObj.result)
      let rating_data = []
      //生成坐标点
      for (let contest of resObj.result) {
        rating_data.push([contest.ratingUpdateTimeSeconds*1000, contest.newRating])
      }
      let chart_series = {   //表格serise数据模板
        name: '',
        symbolSize: 4,  //点的大小
        itemStyle: {
          normal: {
            color: '',  //点条颜色
            lineStyle: {
              color: '', //线条颜色
              width: 2   //线条族系
            }
          }
        },
        smooth: false,  //平滑
        type: 'line',
        data: [],
        animationDuration: 2800,
        animationEasing: 'cubicInOut'
      }
      chart_series.name = user.name
      //console.log(chart_series.name)
      chart_series.data = rating_data
      chart_series.itemStyle.normal.color = colorList[index]
      chart_series.itemStyle.normal.lineStyle.color = colorList[index]
      all_chart_series.push(chart_series)
      //console.log(all_chart_series[0])
      //console.log(all_chart_series[index])
      index++
      //console.log(typeof(all_chart_series))
    }
  } catch (e) {
    console.log(e)
  }
  let result = {}
  result.type = 'cf_rating'
  result.contest_data = users_contest_data
  result['chart_series'] = all_chart_series
  console.log(JSON.stringify(result))
  return result
}






