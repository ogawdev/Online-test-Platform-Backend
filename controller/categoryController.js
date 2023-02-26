
const Category = require("../modals/categoryModal");


const addNewCategory = async (req, res) => {

    try {
        const { name } = req.body;
        if (!name) {
            res.json({ error: "Ma`lumotni kiriting" })
        } else {
            const { name } = req.body;
            let data = await Category.create({
                name: name.toLowerCase(),
                createdBy: req.user._id
            });
            res.json(data);
        }

    } catch (error) {
        console.log(error);
    }
}

const getCategories = async (req, res) => {
    try {
        let categories = await Category.find({});

        res.json(categories);
    } catch (error) {
        console.log(error);
    }
}
const editCategory = async (req, res) => {
    try {
        const { name, id } = req.body;
        if (name && id) {
            let category = await Category.findById(id);
            category.name = req.body.name.toLowerCase();
            category.save()
            res.json(category);
        } else {
            res.json({ error: "Xatolik, yana bir urunib ko'ring" })
        }

    } catch (error) {
        console.log(error);
    }
}
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id);
        if (id) {
            let category = await Category.findByIdAndDelete(id);
            res.json(category)
        } else {
            res.json({ error: "Xatolik, yana bir urunib ko'ring" })
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = { addNewCategory, getCategories, editCategory, deleteCategory }