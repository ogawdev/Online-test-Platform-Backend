const RatingModal = require("../modals/RatingModal");
const UserModal = require("../modals/UserModal");
// const User = require("../modals/UserModal");
const generateAuthToken = require("../utils/generateAuthTokem");
const { comparePasswords, hashPassword } = require("../utils/hashedPassword");


const registerUser = async (req, res) => {
  try {
    const { name, lastName, login, password, isTeacher, status } = req.body;
    if (!(name && lastName && login && password)) {
      return res.json({ error: "All inputs are required" });
    }

    const userExists = await UserModal.findOne({ login });
    if (userExists) {
      return res.json({ error: "Bunday foydalanuvchi allaqachon mavjud" });
    } else {
      const hashedPassword = hashPassword(password);
      const user = await User.create({
        name,
        lastName,
        login: login.toLowerCase(),
        password: hashedPassword,
        status,
        isTeacher
      });
      res
        .status(201)
        .json({
          access_token: generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.login,
            user.isAdmin,
            user.isTeacher,
            user.isAllowed,
            user.status,
            user.phoneNumber
          ),
          userCreated: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            login: user.login,
            isAdmin: user.isAdmin,
            isAllowed: user.isAllowed,
            status: user.status,
            isTeacher: user.isTeacher,
            number: user.phoneNumber
          },
        });
    }

  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!(login && password)) {
      return res.json({ error: "All inputs are required" });
    }

    const user = await User.findOne({ login });
    if (user && comparePasswords(password, user.password)) {
      return res
        .json({
          access_token:
            generateAuthToken(
              user._id,
              user.name,
              user.lastName,
              user.login,
              user.isAdmin,
              user.isTeacher,
              user.isAllowed,
              user.status,
              user.phoneNumber
            ),
          userLoggedIn: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            login: user.login,
            isAdmin: user.isAdmin,
            isAllowed: user.isAllowed,
            status: user.status,
            isTeacher: user.isTeacher,
            number: user.phoneNumber
          },
        });
    } else {
      res.json({ error: "Xatolik, qaytadan urinib ko`ring" })
      // return res.status(401).send("wrong credentials");
    }
  } catch (err) {
    console.log(err);
  }
};

const getTeacher = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json(user)
    } else {
      res.json({ error: "Bunday foydalanuvchi topilmadi" })
    }
  } catch (error) {
    console.log(error);
  }
}

const confirmRate = async (req, res) => {
  try {

    const { rate, subjectId, number } = req.body;
    if (!rate || !subjectId || !number) {
      res.json({ error: "Xatolik, qaytadan urunib ko`ring" })
    } else {
      let user = new RatingModal();
      user.rating = rate;
      user.categoryId = subjectId;
      user.candidat = req.user._id;
      user.number = number;
      user.save();
      res.json(user);
    }


  } catch (error) {
    console.log(error);
  }
}

const getUser = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user)
    } else {
      res.json({ error: "Bunday foydalanuvchi topilmadi" })
    }
  } catch (error) {
    console.log(error);
  }
}
const editUsers = async (req, res) => {
  try {
    const { name, number, password, address, lastName, login } = req.body;
    let user = await User.findById({ _id: req.user._id });

    let isExist = await User.find({ login });
    if (isExist.length > 0) {
      res.json({ error: "Login bilan foydalanuvchi topildi", user: isExist })
    } else {
      user.name = name ? name : user.name;
      user.phoneNumber = number ? number : user.phoneNumber;
      user.lastName = lastName ? lastName : user.lastName;
      user.address = address ? address : user.address;
      // user.address = address;
      // must be hashed

      user.password = password ? hashPassword(password) : user.password;
      user.login = login ? login : user.login; user.save();

      res.json({
        access_token:
          generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.login,
            user.isAdmin,
            user.isTeacher,
            user.isAllowed,
            user.status,
            user.phoneNumber
          ),
        userEdited: {
          _id: user._id,
          name: user.name,
          lastName: user.lastName,
          login: user.login,
          isAdmin: user.isAdmin,
          isAllowed: user.isAllowed,
          status: user.status,
          isTeacher: user.isTeacher,
          number: user.phoneNumber
        },
      })

      // res.json(user);
    }

    // user.login = status;
    // user.isAdmin = isAdmin;
    // user.isTeacher = isTeacher;
    // user.isAdmin = isAllowed;

  } catch (error) {
    console.log(error);
  }
}

// rating user
const getUserRating = async (req, res) => {
  try {
    let ratings = await RatingModal.find({ candidat: req.user._id }).select('-password').populate("candidat categoryId");
    console.log(ratings);
    res.json(ratings)
  } catch (error) {
    console.log(error);
  }
}

const getUsers = async (req, res) => {
  try {
    let users = await User.find({});
    res.json(users)
  } catch (error) {
    console.log(error);
  }
}
const adminEditUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, phoneNumber, address, password, login, status, isAdmin, isTeacher, isAllowed, } = req.body;
    let user = await User.findByIdAndUpdate({ _id: id }, {
      isAllowed: isAllowed
    }, { new: true });
    // user.name = name;
    // user.lastName = lastName;
    // user.phoneNumber = phoneNumber;
    // user.address = address;
    // must be hashed
    // user.password = password;

    // user.login = login;
    // user.login = status;
    // user.isAdmin = isAdmin;
    // user.isTeacher = isTeacher ? isTeacher : user.isTeacher;
    // user.isAdmin = isAllowed;
    user.save();
    res.json({
      access_token:
        generateAuthToken(
          user._id,
          user.name,
          user.lastName,
          user.login,
          user.isAdmin,
          user.isTeacher,
          user.isAllowed,
          user.status,
          user.phoneNumber
        ),
      userEdited: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        login: user.login,
        isAdmin: user.isAdmin,
        isAllowed: user.isAllowed,
        status: user.status,
        isTeacher: user.isTeacher,
        number: user.phoneNumber
      },
    })
  } catch (error) {
    console.log(error);
  }
}

const delUsers = async (req, res) => {
  try {
    let user = await User.findByIdAndRemove(req.params.id);
    res.json(user)
  } catch (error) {
    console.log(error);
  }
}




module.exports = { loginUser, registerUser, getTeacher, confirmRate, getUser, getUsers, adminEditUsers, editUsers, getUserRating, delUsers }