const poj = require('@/utils/crawler_util/crawlers/poj')
const hdu = require('@/utils/crawler_util/crawlers/hdu')
const codeforces = require('@/utils/crawler_util/crawlers/codeforces')
const uva = require('@/utils/crawler_util/crawlers/uva')
const leetcode_cn = require('@/utils/crawler_util/crawlers/leetcode_cn')
const luogu = require('@/utils/crawler_util/crawlers/luogu')
const nowcoder = require('@/utils/crawler_util/crawlers/nowcoder')
const vjudge = require('@/utils/crawler_util/crawlers/vjudge')
const putongoj = require('@/utils/crawler_util/crawlers/putongoj')
/**
 * 返回 string映射所有爬虫函数的map
 * @returns {Promise<Map<any, any>>}
 */
export default function() {
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
