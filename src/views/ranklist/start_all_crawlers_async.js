import oj_names from './oj_names'
import crawlers_map_init from './crawlers_map'
import user_tags from '@/views/ranklist/user_tags'
export default async function(users_info,vm) {
  // loading_button 结束
  const other_oj_names = ['poj', 'uva', 'leetcode_cn']
  const crawlers_map = crawlers_map_init()
  const total_cnt = parseInt(oj_names.length * users_info.length) // 总共需要爬取的次数
  const time_allbegin = new Date().getTime()
  let finish_cnt = 0 // 已经完成的爬取次数
  for (const [index, user] of Object.entries(users_info)) {
    vm.users_oj_info_data[index]['name'] = users_info[index]['name']
    vm.users_oj_info_data[index]['class'] = users_info[index]['class']
    vm.users_oj_info_data[index]['oj_info']['total_solved'] = 0
    vm.users_oj_info_data[index]['oj_info']['total_submissions'] = 0
    vm.users_oj_info_data[index]['oj_info']['other_solved'] = 0

    if (user['oj_info']['jisuanke']['solved'] >= 0) {
      vm.users_oj_info_data[index]['oj_info']['total_solved'] += user['oj_info']['jisuanke']['solved']
      vm.users_oj_info_data[index]['oj_info']['total_submissions'] += user['oj_info']['jisuanke']['solved']
    }
    if (user['oj_info']['pta']['solved'] >= 0) {
      vm.users_oj_info_data[index]['oj_info']['total_solved'] += user['oj_info']['pta']['solved']
      vm.users_oj_info_data[index]['oj_info']['total_submissions'] += user['oj_info']['pta']['solved']
    }
    for (const oj_name of oj_names) {
      let solved = -2
      let submissions = -2
      try {
        vm.users_oj_info_data[index]['oj_info'][oj_name]['solved'] = -1
        vm.users_oj_info_data[index]['oj_info'][oj_name]['submissions'] = -1
        oj_crawler(user['oj_info'][oj_name]['username'], crawlers_map.get(oj_name), oj_name).then(result => {
          solved = parseInt(result['solved'])
          submissions = parseInt(result['submissions'])
          vm.users_oj_info_data[index]['oj_info'][oj_name]['solved'] = solved
          vm.users_oj_info_data[index]['oj_info'][oj_name]['submissions'] = submissions
          if (solved > 0) {
            vm.users_oj_info_data[index]['oj_info']['total_solved'] += solved
            for (const other_oj_name of other_oj_names) {
              if (oj_name === other_oj_name) {
                vm.users_oj_info_data[index]['oj_info']['other_solved'] += solved
              }
            }
          }
          if (submissions > 0) {
            vm.users_oj_info_data[index]['oj_info']['total_submissions'] += submissions
          }
          finish_cnt++ // 单个完成爬取计数
          // loading_button 结束
          console.log(finish_cnt + '/' + total_cnt + '  ' + oj_name)
          if (finish_cnt === total_cnt) { // 计数判断所有爬虫完成
            vm.button_start_crawlers_text = '刷新'
            vm.is_loading = false
            vm.custom = 'custom'
            vm.users_oj_info_data.sort(vm.cmp('rating', false)) // 升序
            // 加载tags
            for (const [index, user] of Object.entries(users_info)) {
              vm.users_oj_info_data[index]['tags'] = user_tags(user)
            }

            const time_allspend = new Date().getTime() - time_allbegin
            console.log('ALL oj_crawlers_finish_time: ' + time_allspend.toString())
            console.log(users_info)
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}

/**
 * 使用代理调用爬虫
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

/**
 *
 * @param username
 * @param crawling  爬虫函数
 * @param oj_name
 * @returns {Promise<{submissions: number, solved: number}|*>}
 */
const oj_names_use_api = ['leetcode_cn'] // 哪些OJ使用后端api  '','vjudge'
async function oj_crawler(username, crawler_function, oj_name) {
  const res_error = { 'solved': -2, 'submissions': -2 }
  const res_nouser = { 'solved': -3, 'submissions': -3 }
  if (username === '' || username === null || username === undefined) return res_nouser
  config.proxy_url = proxy_url_array[random(0, proxy_url_array.length - 1)] // 随机选择代理网址
  const MAX_time = 10 // 请求失败的重复次数
  let use_api = false
  for (const oj_name_use_api of oj_names_use_api) {
    if (oj_name_use_api === oj_name) use_api = true
  }
  for (let i = 0; i < MAX_time; i++) {
    try {
      if (!use_api) {
        return await crawler_function(config, username) // 不使用后端api
      } else {
        const res = await crawlers_api(username, oj_name) // 使用后端api
        if (!res.error) {
          return res.data
        }
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
 * 生成随机数闭区间
 * @param lower
 * @param upper
 * @returns {number}
 */
function random(lower, upper) {
  return parseInt(Math.floor(Math.random() * (upper - lower + 1)) + lower)
}

/**
 * 调用后端接口
 * @param username
 * @param oj_name
 * @returns {Promise<void>}
 */
const request = require('superagent')
async function crawlers_api(username, oj_name) {
  // let url = 'http://localhost:12001/api/crawlers/' + oj_name + "/" +username
  const url = '/nwpuapi/crawlers/' + oj_name + '/' + username
  const res = await request.get(url)
  const resObj = JSON.parse(res.text)
  // console.log(resObj.data)
  // console.log("@@@@")
  return resObj
}
