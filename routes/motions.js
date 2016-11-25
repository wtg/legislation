const functions = require('../functions')
const models = require('../models')
const Sequelize = require('sequelize')

let router = require('express').Router()
let connection = functions.getSequelizeConnection()

let Motions = models.motions(connection, Sequelize)
let MotionsWithDetails = models.motions_with_details(connection, Sequelize)

function getMotions(req, res, includeDetails) {
    const queryable = [
        "motion_id", "body_id", "session_id", "moving_member_id",
        "seconding_member_id", "motion_num", "meeting_num", "votes_favor",
        "votes_against", "votes_abstentions", "date", "text"
    ]

    const detailsQueryable = [
        ...queryable, "body_name", "legislation_prefix", "year_num",
        "moving_name", "moving_position", "seconding_name", "seconding_position"
    ]

    const {queries, where} = functions.getWhereQuery((includeDetails ? detailsQueryable : queryable), req.query)

    let promise
    if(includeDetails) {
        promise = queries ? MotionsWithDetails.findAll({ where: where }) : MotionsWithDetails.findAll()
    } else {
        promise = queries ? Motions.findAll({ where: where }) : Motions.findAll()
    }

    promise.then(response => res.json(response))
}



router.get('/', (req, res) => getMotions(req, res, false))
router.get('/details', (req, res) => getMotions(req, res, true))

module.exports = router
