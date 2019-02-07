export const oneToTwo = (oneString) => {
    let dates = oneString.split(" to ")
    let monthMaker = {
      'January': '01',
      'February': '02',
      'March': '03',
      'April': '04',
      'May': '05',
      'June': '06',
      'July': '07',
      'August': '08',
      'September': '09',
      'October': '10',
      'November': '11',
      'December': '12',
    }
    let startFrom = dates[0].split(" ")
    let monthFrom = startFrom[0]
    let yearFrom = startFrom[1]
    let endFrom = `${yearFrom}-${monthMaker[monthFrom]}`
    let startTo = dates[1].split(" ")
    let monthTo = startTo[0]
    let yearTo = startTo[1]
    let endTo = `${yearTo}-${monthMaker[monthTo]}`
    return {from: endFrom, to: endTo}
}