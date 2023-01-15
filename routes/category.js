const { Router } = require('express');
const { addNewCategory, getCategories, editCategory, deleteCategory } = require('../controller/categoryController');
const { verifyIsLoggedIn, verifyIsAllowed } = require('../middlewares/verifyAuthToken');

const route = Router();

route.post('/new-category', verifyIsLoggedIn, verifyIsAllowed, addNewCategory);
route.put('/edit-category', verifyIsLoggedIn, verifyIsAllowed, editCategory);
route.post('/delete-category', verifyIsLoggedIn, verifyIsAllowed, deleteCategory);
route.get('/categories', getCategories);

module.exports = route;