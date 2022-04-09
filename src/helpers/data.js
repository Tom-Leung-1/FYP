const groupBy = (arr, key) => {
    return arr?.reduce((acc, order) => {
      (acc[order[key]] = acc[order[key]] || []).push(order) // 1st: acc.key = acc.key (if present) or [] 2nd: assignment will return the left value 3rd: acc.key.push(..)
      return acc;
    }, {})
}

const eachFirst = (map) => {
    let arr = []
    if (!map) return 
    for (const [key, value] of Object.entries(map)) {
        arr.push(value[0])
    }
    return arr
}

const getTimeDate = (dateStr) => { // HK time
    const dateObj = new Date(dateStr)
    dateObj.setUTCHours(dateObj.getUTCHours() + 8);
    const time = `${dateObj.getHours()}:${dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes()}`
    const date = `${dateObj.getFullYear()}/${dateObj.getMonth()+1}/${dateObj.getDate()}`
    return [dateObj, time, date]
}

export { groupBy, eachFirst, getTimeDate}