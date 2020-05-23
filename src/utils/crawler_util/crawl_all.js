const cralwers_map_init = require('./crawlers_map_init')
const oj_crawler = require('./oj_crawler')
const users_info = require('./users_info')
const oj_names = ['codeforces', 'luogu', 'vjudge', 'nowcoder', 'hdu', 'leetcode', 'uva', 'poj', 'putongoj']
/**
 * 'oj_name' 映射 爬虫函数 map 初始化
 */


module.exports = async function() {
  const crawlers_map = cralwers_map_init()
  const total_cnt = parseInt(oj_names.length * users_info.length) //总共需要爬取的次数
  //const time_allbegin = new Date().getTime()
  let finish_cnt = 0 //已经完成的爬取次数
  for (const user of users_info) {
    user['oj_info']['total_solved'] = 0
    user['oj_info']['total_submissions'] = 0
    if(user['oj_info']['jisuanke']['solved'] !== -1) user['oj_info']['total_solved'] += user['oj_info']['jisuanke']['solved']
    if(user['oj_info']['pta']['solved'] !== -1) user['oj_info']['total_submissions'] += user['oj_info']['pta']['solved']
    for (const oj_name of oj_names) {
      let result = {}
      let solved = -1
      let submissions = -1
      try {
        //const time_begin = new Date().getTime()  //计时
        const time_allbegin = new Date().getTime()
        // console.log('start - ' + user['name'] + ' ' + oj_name)
        //result = await oj_crawler(user['oj_info'][oj_name]['username'], crawlers_map.get(oj_name))
        oj_crawler(user['oj_info'][oj_name]['username'], crawlers_map.get(oj_name)).then(result =>{
          solved = parseInt(result['solved'])
          submissions = parseInt(result['submissions'])
          user['oj_info'][oj_name]['solved'] = solved
          user['oj_info'][oj_name]['submissions'] = submissions

          if (solved !== -1) user['oj_info']['total_solved'] += solved
          if (submissions !== -1) user['oj_info']['total_submissions'] += submissions
          // if (oj_name === 'codeforces'){
          //   console.log(result.info)
          //   user['oj_info']['codeforces']['info'] = result['info']
          // }
          finish_cnt++ //完成爬取计数
          if(finish_cnt === total_cnt){ //计数判断所有爬虫完成

            const time_allspend = new Date().getTime() - time_allbegin
            console.log("Finish Time: " + time_allspend.toString())
            console.log(JSON.stringify(users_info))
            return users_info
          }
        })
        // if (solved !== -1) {
        //   const time_end = new Date().getTime()
        //   const time_spend = time_end - time_begin
        //   console.log(user['name'] + ' ' + oj_name + '  solved:' + solved + ' submissions:' + submissions + '  Time:' + time_spend.toString())
        // }
      } catch (e) {
        console.log(e)
      }
    }
  }
  //return users_info
}
