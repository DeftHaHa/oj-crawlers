const cralwers_map_init = require('./crawlers_map_init')
const oj_crawler = require('./oj_crawler')

const username = 'Deft'
const oj = 'luogu'
/**
 * 'oj' 映射 爬虫函数 map 初始化
 */
const crawlers_map = cralwers_map_init()
console.log(crawlers_map[oj])
oj_crawler(username, crawlers_map[oj])

