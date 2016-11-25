const functions = require('../functions')
const models = require('../models')
const Sequelize = require('sequelize')

let router = require('express').Router()
let connection = functions.getSequelizeConnection()

let Members = models.members(connection, Sequelize)
let MembersWithDetails = models.members_with_details(connection, Sequelize)

function getMembers(req, res, includeDetails) {
    const queryable = [
        'member_id', 'info_id', 'body_id', 'session_id', 'position'
    ]

    const {queries, where} = functions.getWhereQuery(queryable, req.query)

    let promise
    if(includeDetails) {
        promise = queries ? MembersWithDetails.findAll({ where: where }) : MembersWithDetails.findAll()
    } else {
        promise = queries ? Members.findAll({ where: where }) : Members.findAll()
    }

    promise.then(response => res.json(response))
}

router.get('/', (req, res) => getMembers(req, res, false))
router.get('/details', (req, res) => getMembers(req, res, true))

module.exports = router
