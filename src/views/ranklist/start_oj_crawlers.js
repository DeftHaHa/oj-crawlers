import oj_names from './oj_names'
import crawlers_map_init from './crawlers_map'
import {console} from "vuedraggable/src/util/helper";

const users_info_init = require('@/utils/crawler_util/users_info.json')
const other_oj_names = ['poj', 'uva', 'leetcode']
const crawlers_map = crawlers_map_init()
let total_cnt = 0 // 一共需要的爬取次数
let finish_cnt = 0 // 已经完成的爬取次数
let time_allbegin = 0
export default async function start_oj_crawlers(users_info, vm) {
  time_allbegin = new Date().getTime()
  vm.users_oj_info_data = users_info_init
  finish_cnt = 0
  total_cnt = parseInt(oj_names.length * users_info.length) // 总共需要爬取的次数
  time_allbegin = new Date().getTime()

  for (const [index, user] of Object.entries(users_info)) {
    vm.users_oj_info_data[index]['oj_info']['total_solved'] = 0
    vm.users_oj_info_data[index]['oj_info']['total_submissions'] = 0
    if (user['oj_info']['jisuanke']['solved'] >= 0) {
      vm.users_oj_info_data[index]['oj_info']['total_solved'] += user['oj_info']['jisuanke']['solved']
      vm.users_oj_info_data[index]['oj_info']['total_submissions'] += user['oj_info']['jisuanke']['solved']
    }
    if (user['oj_info']['pta']['solved'] >= 0) {
      vm.users_oj_info_data[index]['oj_info']['total_solved'] += user['oj_info']['pta']['solved']
      vm.users_oj_info_data[index]['oj_info']['total_submissions'] += user['oj_info']['pta']['solved']
    }
  }

  for (const oj_name of oj_names) {
    crawler_one_oj(oj_name, users_info, vm)
  }
}

/**
 * 一个OJ的所有user同步方式爬取 防止目标服务器阻塞
 * @param oj_name
 * @param users_info
 * @param vm
 * @returns {Promise<void>}
 */
async function crawler_one_oj(oj_name, users_info, vm) {
  for (const [index, user] of Object.entries(users_info)) {
    try {
      await one_crawler(user['oj_info'][oj_name]['username'], index, oj_name, 2, vm).then(result => {
        //console.log("@@@Finish"+index)
      })
    } catch (e) {
      console.log("##" + oj_name + " " + e)
    }
    finish_cnt++// 单个完成爬取计数
    console.log(finish_cnt + '/' + total_cnt + '  ' + oj_name)
    if (finish_cnt === total_cnt) { // 计数判断所有爬虫完成
      const time_allspend = new Date().getTime() - time_allbegin
      console.log('ALL oj_crawlers_finish_time: ' + time_allspend.toString())
      console.log(users_info)
    }
  }
}

/**
 * 失败时间隔1s发送请求
 * @param username 用户对象
 * @param index 用户对象在users_info中的下标
 * @param oj_name  OJ名
 * @param MAX_time  失败重发次数
 * @param vm
 * @returns {Promise<unknown>}
 */
function one_crawler(username, index, oj_name, MAX_time, vm) {
  let time_d = 1500//再次请求间隔
  if (oj_name === 'luogu') MAX_time = 5
  if (username === '' || username === null || username === undefined) MAX_time = 1
  return new Promise(resolve => {
    let try_time = 0
    let result = {}
    let crawler_sucsess = false //请求成功标记
    let solved = -2
    let submissions = -2
    let timer = setInterval(() => {
      try_time++
      try {
        oj_crawler(username, crawlers_map.get(oj_name)).then(res => {
          result = res
          if (oj_name === 'codeforces') {
            console.log("@@@" + username)
            console.log(result)
          }
          solved = parseInt(result["solved"])
          if (solved > 0) crawler_sucsess = true
          submissions = parseInt(result['submissions'])
          if (crawler_sucsess || try_time >= MAX_time) {
            vm.users_oj_info_data[index]['oj_info'][oj_name]['solved'] = solved
            vm.users_oj_info_data[index]['oj_info'][oj_name]['submissions'] = submissions
            if (solved > 0) {
              for (let other_oj_name of other_oj_names) {
                if (oj_name === other_oj_name) {
                  vm.users_oj_info_data[index]['oj_info']['other_solved'] += solved
                  break
                }
              }
              vm.users_oj_info_data[index]['oj_info']['total_solved'] += solved
              crawler_sucsess = true
            }
            if (submissions > 0) {
              vm.users_oj_info_data[index]['oj_info']['total_submissions'] += submissions
            }
            console.log(crawler_sucsess + " " + index + "  " + oj_name + "   tryTime: " + try_time)
          }
        })
      } catch (e) {
        console.log(e)
      }
      if (crawler_sucsess || try_time >= MAX_time) {
        resolve(result)
        clearInterval(timer)
      }
    }, time_d)
  })
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
