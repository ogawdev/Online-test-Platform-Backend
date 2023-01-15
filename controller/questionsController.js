const Category = require("../modals/categoryModal");
const Questions = require("../modals/Questions");
const { $where } = require("../modals/UserModal");
const User = require("../modals/UserModal");


// let qq = idx == 0 ? val.test1.qiymat : idx == 1 ? val.test2.qiymat : idx == 2 && val.test3.qiymat;
// let qq2 = idx == 0 ? val.test1.isTrue : idx == 1 ? val.test2.isTrue : idx == 2 && val.test3.isTrue;
// console.log(idx == 0 ? val.test1.isTrue : idx == 1 ? val.test2.isTrue : idx == 2 && val.test3.isTrue);


const addNewQuestions = async (req, res) => {

    try {
        const { questions } = req.body;
        // console.log(questions);
        if (!questions) {
            res.json({ error: "Ma`lumotni kiriting" })
        } else {

            let prevData = await Questions.find({});

            let data = new Questions();

            // checking category
            // let isExist = prevData.some((s) => s.categoryId.toString() == questions[0].cat.toString())

            data.matn = questions.title;
            data.categoryId = questions.cat;
            if (questions.tests.length > 0) {
                questions.tests.map((val, idx) => {
                    data.tests.push(val);
                })
            }

            await data.save();
            res.json(data);
        }

    } catch (error) {
        console.log(error);
    }
}

const getQuestions = async (req, res) => {
    try {
        let data = await Questions.aggregate([{ $sample: { size: 3 } }]);
        if (data) {
            console.log('data =>', data);
            res.json(data)
        } else {
            res.json({ msg: "Savollar xali mavjud emas" })
        }
    } catch (error) {
        console.log(error);
    }
}
const getQuestionsById = async (req, res) => {
    try {
        let { id } = req.params;
        let data1 = await Questions.find({});
        let data = await Questions.aggregate([{$sample:{size:data1.length}}]);
        data = data.filter(s=>s.categoryId == id);
        // let data = await Questions.find({});
        if (data) {
            res.json(data);
            console.log('questions=>', data);
        } else {
            res.json({ msg: "Savollar xali mavjud emas" })
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = { addNewQuestions, getQuestions, getQuestionsById }