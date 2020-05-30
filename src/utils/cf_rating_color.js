// rating对应颜色计算方法
export default function(rating) {
    if (rating >= 2400) return '#f00'
    if (rating >= 2100) return '#ff8c00'
    if (rating >= 1900) return '#a0a'
    if (rating >= 1600) return '#0000ff'
    if (rating >= 1400) return '#03a89e'
    if (rating >= 1200) return '#008000'
    return '#808080'
}
