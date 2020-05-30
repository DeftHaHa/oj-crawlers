const color_list = require('./color_list')

/**
 * 根据需要的颜色返回区分度较大的颜色列表
 * @param num
 */
module.exports =  function(num) {
  const len = color_list.length
  const d = parseInt(len / num)
  let res = []
  for(let i = 0;i < len;i += d){
    res.push(color_list[i])
  }
  return res
}
