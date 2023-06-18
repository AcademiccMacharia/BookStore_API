const  memberRoutes = require('express').Router();
const { postMember, loginMember } = require('../controllers/memberController')

memberRoutes.post('/', postMember)
memberRoutes.post('/login', loginMember)

module.exports = memberRoutes;