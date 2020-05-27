const cralwers_map_init = require('./crawlers_map_init')
const oj_crawler = require('./oj_crawler')
const users_info = require('./users_info')
const request = require('superagent')
// 为pta jisuanke静态数据
const oj_names = ['codeforces', 'luogu', 'vjudge', 'nowcoder', 'hdu', 'leetcode_cn', 'uva', 'poj', 'putongoj']

/**
 * 'oj_name' 映射 爬虫函数 map 初始化
 */
const crawlers_map = cralwers_map_init()
// console.time('x')
// const crawl_all = require('./crawl_all')

// crawl_all().then(result => {
//   console.log("#####"+JSON.stringify(result))
//   console.timeEnd('x')
// for (const user of result) {
//   console.log(user['name'], '      Solved:' + user['total_sloved'] + '     Submissions:' + user['total_submissions'])
// }
// })

// const  get_cf_info = require('./crawlers/get_codeforces_info')
// get_cf_info(users_info).then(result => {
//   console.log(result)
// })

/**
 * 查询示范,promise需要使用then
 * 异步方式，适用于每一单元格动态更新table
 */
const username = 'LilPhoenix'  //  BlueLine     DeftHaHa  LilPhoenix
const oj_name = 'vjudge'  //  leetcode_cn     vjudge
oj_crawler(username, crawlers_map.get(oj_name),oj_name).then(result => {
  console.log(result)
})
console.log('####')




/**
 * excel导出的json数据架构转换
 */
// let newinfo = []
// let index = 0
// let empty_cf_info = {
//   "lastOnlineTimeSeconds": -1,
//   "city": "",
//   "rating": -1,
//   "rank": "",
//   "maxRating": -1,
//   "maxRank": ""
// }
// for (let user of users_info) {
//   var tmp = {}
//   let tmp_info = {}
//   for (let key of Object.keys(user)) {
//     if (key === '姓名') {
//       tmp.name = user[key]
//       tmp.tags = []
//     } else if (key === '班级') {
//       tmp.class = user[key]
//     } else if (key === 'pta_sloved') {
//       if (user[key] !== '') {
//         tmp_info['pta']['solved'] = parseInt(user[key])
//       } else {
//         tmp_info['pta']['solved'] = -1
//       }
//       //console.log(parseInt(tmp_info['pta']['solved']))
//     } else {
//       let tmp_oj = {}
//       if (key === 'jisuanke_solved') {
//         tmp_oj['username'] = ''
//         if (user[key] !== '') {
//           tmp_oj['solved'] = parseInt(user[key])
//         } else {
//           tmp_oj['solved'] = -1
//         }
//         tmp_oj['submissions'] = -1
//         tmp_info['jisuanke'] = tmp_oj
//       } else {
//         //console.log(key)
//         tmp_oj['username'] = user[key]
//         tmp_oj['solved'] = -1
//         tmp_oj['submissions'] = -1
//         if (key === 'codeforces') tmp_oj['info'] = empty_cf_info
//         tmp_info[key] = tmp_oj
//         //console.log(user[key])
//       }
//     }
//   }
//   tmp_info.other_solved = 0  //leetcode + uva + poj
//   tmp_info.other_submissions = 0
//   tmp_info.total_solved = 0
//   tmp_info.total_submissions = 0
//   tmp.oj_info = tmp_info
//   newinfo[index] = tmp
//   index++
// }
// console.log(JSON.stringify(newinfo))
