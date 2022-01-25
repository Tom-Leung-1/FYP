const groupBy = (arr, key) => {
    return arr.reduce((acc, order) => {
      (acc[order[key]] = acc[order[key]] || []).push(order) // 1st: acc.key = acc.key (if present) or [] 2nd: assignment will return the left value 3rd: acc.key.push(..)
      return acc;
    }, {})
}

const eachFirst = (map) => {
    let arr = []
    for (const [key, value] of Object.entries(map)) {
        arr.push(value[0])
    }
    return arr
}

export { groupBy, eachFirst }