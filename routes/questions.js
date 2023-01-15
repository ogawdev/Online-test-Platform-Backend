const {Router} = require('express');
const { addNewQuestions, getQuestions, getQuestionsById } = require('../controller/questionsController');
const route = Router();

// route.use('/',require("./register"));
// route.use('/',require("./login"));

// router.use(verifyIsLoggedIn);

route.post('/add-questions',addNewQuestions);
route.get('/get-questions',getQuestions);
route.get('/get-question/:id',getQuestionsById);


module.exports = route;