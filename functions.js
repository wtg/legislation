const Sequelize = require('sequelize')

exports.getSequelizeConnection = function () {
    return new Sequelize('stugov_legislation', 'root', 'hxdb', {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    })
}

exports.ordinal = function (i) {
    const j = i % 10, k = i % 100

    return (j == 1 && k != 11 ? `${i}st` :
                (j == 2 && k != 12 ? `${i}nd` :
                    (j == 3 && k != 13 ? `${i}rd` : `${i}th`)))
}

exports.getWhereasSeparator = function (i, length) {
    if(i == length - 2) return "; and";

    return ";";
}

exports.getOperativeSeparator = function (i, length) {
    if(i == length - 1) return ".";

    if(i == length - 2) return ", and";

    return ",";
}

exports.formatDate = function (datestring) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ]

    const date = new Date(datestring)

    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

exports.getWhereQuery = function (queryable, attempted) {
    let where = {}
    let queries = false

    for(var key in attempted) {
        let index = queryable.indexOf(key)
        if(attempted[key] && index != -1) {
            where[key] = attempted[key]
            queries = true
        }
    }

    return { queries, where }
}
