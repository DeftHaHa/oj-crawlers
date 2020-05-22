const cralwers_map_init = require('./crawlers_map_init')
const oj_crawler = require('./oj_crawler')
const users_info = require('./users_info')
const oj_names = ['codeforces', 'luogu', 'vjudge', 'nowcoder', 'hdu', 'leetcode', 'uva', 'poj', 'putongoj']
/**
 * 'oj_name' 映射 爬虫函数 map 初始化
 */

module.exports = async function() {
  const crawlers_map = cralwers_map_init()
  for (const user of users_info) {
    let total_sloved = 0
    let total_submissions = 0
    for (const oj_name of oj_names) {
      let result = {}
      let solved = -1
      let submissions = -1
      try {
        const username = user['oj_info'][oj_name]['username']
        // eslint-disable-next-line eqeqeq
        const time_begin = new Date().getTime()
        if (username !== ' ' && username != null && username !== undefined) {
          // console.log('start - ' + user['name'] + ' ' + oj_name)
          result = await oj_crawler(username, crawlers_map.get(oj_name))
          solved = parseInt(result['solved'])
        }
        submissions = parseInt(result['submissions'])
        user['oj_info'][oj_name]['solved'] = solved
        user['oj_info'][oj_name]['submissions'] = submissions
        if (solved !== -1) total_sloved += solved
        if (solved !== -1) total_submissions += submissions
        // eslint-disable-next-line eqeqeq
        if (solved !== -1) {
          const time_end = new Date().getTime()
          const time_spend = time_end - time_begin
          console.log(user['name'] + ' ' + oj_name + '  solved:' + solved + ' submissions:' + submissions + '  Time:' + time_spend.toString())
        }
      } catch (e) {
        console.log(e)
      }
    }
    user['total_sloved'] = total_sloved
    user['total_submissions'] = total_submissions
  }
  return users_info
}
