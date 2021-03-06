import oj_names from './oj_names'
import crawlers_map_init from './crawlers_map'
const users_info_init = require('@/utils/crawler_util/users_info.json')
export default async function start_oj_crawlers(users_info, vm) {
  vm.users_oj_info_data = users_info_init
  const other_oj_names = ['poj', 'uva', 'leetcode_cn']
  const crawlers_map = crawlers_map_init()
  const total_cnt = parseInt(oj_names.length * users_info.length) // 总共需要爬取的次数
  const time_allbegin = new Date().getTime()
  let finish_cnt = 0 // 已经完成的爬取次数
  for (const [index, user] of Object.entries(users_info)) {
    if (user['oj_info']['jisuanke']['solved'] >= 0){
      vm.users_oj_info_data[index]['oj_info']['total_solved'] += user['oj_info']['jisuanke']['solved']
      vm.users_oj_info_data[index]['oj_info']['total_submissions'] += user['oj_info']['jisuanke']['solved']
    }
    if (user['oj_info']['pta']['solved'] >= 0){
      vm.users_oj_info_data[index]['oj_info']['total_solved'] += user['oj_info']['pta']['solved']
      vm.users_oj_info_data[index]['oj_info']['total_submissions'] += user['oj_info']['pta']['solved']
    }
    for (const oj_name of oj_names) {
      let solved = -2
      let submissions = -2
      try {
        oj_crawler(user['oj_info'][oj_name]['username'], crawlers_map.get(oj_name)).then(result => {
          solved = parseInt(result['solved'])
          submissions = parseInt(result['submissions'])
          vm.users_oj_info_data[index]['oj_info'][oj_name]['solved'] = solved
          vm.users_oj_info_data[index]['oj_info'][oj_name]['submissions'] = submissions
          if (solved > 0) {
            vm.users_oj_info_data[index]['oj_info']['total_solved'] += solved
            for (const other_oj_name in other_oj_names) {
              if (oj_name === other_oj_name) {
                vm.users_oj_info_data[index]['oj_info']['other_solved'] += solved
              }
            }
          }
          if (submissions > 0) {
            vm.users_oj_info_data[index]['oj_info']['total_submissions'] += submissions
          }
          finish_cnt++ // 单个完成爬取计数
          console.log(finish_cnt + '/' + total_cnt + '  ' + oj_name)
          if (finish_cnt === total_cnt) { // 计数判断所有爬虫完成
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
 * 调用爬虫
 * @param username
 * @param crawling     爬虫函数
 * @returns {Promise<{submissions: number, solved: number}>}
 * return -2:爬取时出错  -3:无用户名
 */
const proxy_url_array = ['https://bird.ioliu.cn/v1', 'https://bird.ioliu.cn/v2']
const config = {  //代理设置
  use_proxy: true,
  proxy_url: '',
  username: 'Deft_t',
  password: 'a7dTxD_bTwB73KX'
}

async function oj_crawler(username, crawling) {
  const res_error = {'solved': -2, 'submissions': -2}
  const res_nouser = {'solved': -3, 'submissions': -3}
  if (username === '' || username === null || username === undefined) return res_nouser
  try {
    config.proxy_url = proxy_url_array[random(0, proxy_url_array.length - 1)] //随机选择代理网址
    return await crawling(config, username)
  } catch (e) {
    return res_error
  }
}

function random(lower, upper) {
  return parseInt(Math.floor(Math.random() * (upper - lower + 1)) + lower)
}
