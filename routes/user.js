const {Router} = require('express');
const { getTeacher, confirmRate, getUser,getUsers, adminEditUsers, editUsers, getUserRating, delUsers} = require('../controller/userController');
const { verifyIsLoggedIn, verifyIsAdmin, verifyIsAllowed, verifyIsTeacher } = require('../middlewares/verifyAuthToken');
const route = Router();

// route.use('/',require("./register"));
// route.use('/',require("./login"));

// router.use(verifyIsLoggedIn);

route.get('/get-teacher',verifyIsLoggedIn, verifyIsTeacher, getTeacher);
route.post('/confirm-rate',verifyIsLoggedIn, confirmRate);
route.get('/get-user',verifyIsLoggedIn, getUser);
route.get('/get-user/rating',verifyIsLoggedIn, getUserRating);
route.put('/edit-user',verifyIsLoggedIn, editUsers);

// admin opportunities
route.get('/admin/get-users',verifyIsLoggedIn,verifyIsAdmin, getUsers);
route.delete('/admin/user-delete/:id',verifyIsLoggedIn,verifyIsAdmin, delUsers);
route.put('/admin/user-edit/:id',verifyIsLoggedIn,verifyIsAdmin, adminEditUsers);


module.exports = route;