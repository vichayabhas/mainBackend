const size = new Map
const s = ['S', 'M', 'L', 'XL', 'XXL', '3XL']
s.forEach((e) => {
    size.set(e, 0)
})
exports.startSize = size
exports.swop = (olds, news, array) => {
    if (!olds) {
        if (news) {
            array.push(news)
        }
        return array
    }
    const re = array.filter(e => e != olds)
    if (news) {
        re.push(news)
    }
    return re
}




