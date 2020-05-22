const cralwers_map_init = require('./crawlers_map_init')
const oj_crawler = require('./oj_crawler')
const users_info = require('./users_info')

const oj_names = ['codeforces', 'luogu', 'vjudge', 'nowcoder', 'hdu', 'leetcode', 'uva', 'poj', 'putongoj']

/**
 * 'oj_name' 映射 爬虫函数 map 初始化
 */
const crawlers_map = cralwers_map_init()

console.time('x')
const crawl_all = require('./crawl_all')
crawl_all().then(result => {
  console.log(result)
  console.timeEnd('x')
  for (const user of result) {
    console.log(user['name'], '      Solved:' + user['total_sloved'] + '     Submissions:' + user['total_submissions'])
  }
})
console.log('###')

/**
 * 查询示范,promise需要使用then
 * 异步方式，适用于每一单元格动态更新table
 */
// const username = 'Deft_t'
// const oj_name = 'luogu'
// let res = { 'solved': -1, 'submissions': -1 }
// oj_crawler(username, crawlers_map.get(oj_name)).then(result => {
//   res['solved'] = result['solved']
//   res['submissions'] = result['submissions']
//   console.log(res)
// })
// console.log("####");
/**
 * excel导出的json数据架构转换
 */
// let newinfo = []
// let index = 0
// for (let user of users_info) {
//   var tmp = {}
//   let tmp_info = {}
//   for (let key of Object.keys(user)) {
//
//     if (key === '姓名') {
//       tmp.name = user[key]
//     } else if (key === '班级') {
//       tmp.class = user[key]
//     } else {
//       //console.log(key)
//       let tmp_oj = {}
//       tmp_oj['username'] = user[key]
//       tmp_info[key] = tmp_oj
//       //console.log(user[key])
//     }
//   }
//   tmp.oj_info = tmp_info
//   newinfo[index] = tmp
//   index++
// }
// console.log(JSON.stringify(newinfo))