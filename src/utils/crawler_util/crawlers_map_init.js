const poj = require('./crawlers/poj')
const hdu = require('./crawlers/hdu')
const codeforces = require('./crawlers/codeforces')
const uva = require('./crawlers/uva')
const leetcode_cn = require('./crawlers/leetcode_cn')
const luogu = require('./crawlers/luogu')
const nowcoder = require('./crawlers/nowcoder')
const vjudge = require('./crawlers/vjudge')
const putongoj = require('./crawlers/putongoj')
/**
 * 返回 string映射所有爬虫函数的map
 * @returns {Promise<Map<any, any>>}
 */
module.exports = function() {
  const crawlers_map = new Map()
  crawlers_map.set('poj', poj)
  crawlers_map.set('hdu', hdu)
  crawlers_map.set('codeforces', codeforces)
  crawlers_map.set('uva', uva)
  crawlers_map.set('leetcode', leetcode_cn)
  crawlers_map.set('luogu', luogu)
  crawlers_map.set('nowcoder', nowcoder)
  crawlers_map.set('vjudge', vjudge)
  crawlers_map.set('putongoj', putongoj)
  return crawlers_map
}
