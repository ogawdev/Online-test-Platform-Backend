const {Router} = require('express');
const route = Router();

route.use('/',require("./register"));
route.use('/',require("./login"));

// router.use(verifyIsLoggedIn);
// getOne user
route.use('/user',require("./user"));
// adding category
route.use('/category',require('./category'));
// adding questions
route.use('/question',require('./questions'))


module.exports = route;