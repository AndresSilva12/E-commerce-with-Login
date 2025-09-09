export const filterByDate = ({year, month, minDay, maxDay}) => {
    const currentDate = new Date()
    const yearNum = Number(year) || currentDate.getFullYear()
    const monthNum = Number(month) || currentDate.getMonth()
    const minDayNum = Number(minDay) || 1
    const lastDayMonth = new Date (yearNum, monthNum , 0)
    const maxDayNum = Number(maxDay) || lastDayMonth.getDate()
    const where = {}

    where.date = {}
    if (year){
        if (month){
            where.date.gte= new Date (yearNum, monthNum -1, minDayNum)
            if (minDay){
                if (maxDay){
                    where.date.lt = new Date (yearNum, monthNum -1, maxDayNum +1)
                }else {
                    where.date.lt = new Date (yearNum, monthNum - 1, minDayNum + 1)
                }
            }else {
                where.date.lt = new Date (yearNum, monthNum -1, maxDayNum +1)
            }
        }else {
            where.date.gte = new Date (yearNum, 0, 1)
            where.date.lt = new Date (yearNum + 1, 0, 0)
        }
    }else {
        where.date.gte = new Date (yearNum, monthNum, minDayNum)
        where.date.lt = new Date (yearNum, monthNum, maxDayNum)
    }
    return where
}