/**
 * 生成标签计算方法，返回tag的type数组
 * @param user 一个用户对象
 */
export default function(user, vm) {
  // name
  // color
  // effect
  //
  const tags = []
  tags.push(cf_rating_tag(user['oj_info']['codeforces']['info']['rating']))

  return tags
}

/**
 * cf rating对应tag计算方法
 * @param rating
 * @returns {string}
 */
function cf_rating_tag(rating) {
  const tag = {}
  tag.type = ''
  tag.effect = 'dark'
  if (rating >= 2400) {
    tag.color = '#f00'
    if (rating >= 3000) tag.name = 'legendary grandmaster'
    else if (rating >= 2600) tag.name = 'international grandmaster'
    else tag.name = 'grandmaster'
  } else if (rating >= 2100) {
    tag.color = '#ff8c00'
    if (rating >= 2300) tag.name = 'International Master'
    else tag.name = 'Master'
  } else if (rating >= 1900) {
    tag.color = '#a0a'
    tag.name = 'Candidate Master'
  } else if (rating >= 1600) {
    tag.color = '#0000ff'
    tag.name = 'Expert'
  } else if (rating >= 1400) {
    tag.color = '#03a89e'
    tag.name = 'Specialist'
  } else if (rating >= 1200) {
    tag.color = '#008000'
    tag.name = 'Pupil'
  } else {
    tag.color = '#808080'
    tag.name = 'Newbie'
  }
  return tag
}
