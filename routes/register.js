const { Router } = require('express');
const { registerUser } = require('../controller/userController');
const User = require('../modals/UserModal');
const generateAuthToken = require('../utils/generateAuthTokem');
const { hashPassword } = require('../utils/hashedPassword');
const route = Router();

route.post('/register',registerUser);

module.exports = route;