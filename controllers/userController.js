const bcrypt = require('bcrypt');
let User = require('../models/userSchema');
let salt = bcrypt.genSaltSync(10);
var jwt = require('jsonwebtoken');
let JWT_SECRET = 'Anant';


const registerUser = async (req, res) => {
  let { name, email, password, address } = req.body;
  console.log(req.body)
  if (!name || !email || !password) {
    return res.json({ msg: 'Please provide all fields', success: false })
  }

  try {
    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.json({ msg: 'user already exits', success: false })
    } else {
      let hashpassword = await bcrypt.hashSync(password, salt)
      let user = await User.create({
        name,
        email,
        password: hashpassword,
        address
      })
      res.json({ msg: "user rigetstered successfully", success: true, user });
    }

  } catch (error) {
    res.json({ msg: 'Error in creating user', error: error.message, success: false })
  }
}



const loginUser = async (req, res) => {
  let { email, password } = req.body;
  let existingUser = await User.findOne({ email })


  try {
    if (existingUser) {
      let checkPassword = bcrypt.compareSync(password, existingUser.password)
      if (checkPassword) {
        var token = jwt.sign({ _id: existingUser._id }, JWT_SECRET);  //will generate random token for user
        return res.json({ msg: 'user logged in successfull', success: true, token: token })
      } else {
        return res.json({ msg: 'wrong password', success: false })
      }
    } else {
      return res.json({ msg: 'user not found' })
    }
  } catch (error) {
    return res.json({ msg: 'error in logging', success: false, error: error.message })
  }
}



const updateUser = async (req, res) => {
  let _id = req.params._id;
  let userId = req.user;
  if (userId !== _id) {
    return res.json({ msg: "unauthorized", success: false })
  }
  let { name, password, address, email, coverPic, profilePic } = req.body;
  let hashpassword;
  if (password) {
    hashpassword = bcrypt.hashSync(password, salt)
  }

  try {
    let data = await User.findByIdAndUpdate(userId, { $set: { name, password: hashpassword, address, email, coverPic, profilePic } }, { new: true })
    res.json({ msg: "user updated successfully", success: true, data })
  } catch (error) {
    res.json({ msg: "error in updating user", success: false, error: error.message })
  }
}

const deleteUser = async (req, res) => {
  let id = req.params._id;
  let _id = req.user;
  try {
    if (_id !== id) {
      return res.json({ msg: "Cannot delete another account", success: false })
    } else {
      await User.findByIdAndDelete(_id);
      res.json({ msg: "user deleted successfully", success: true })
    }
  } catch (error) {
    res.json({ msg: "error in deleting user", success: false, error: error.message })
  }


}


const getUserDetails = async (req, res) => {
  try {
    let userId = res.user;
    console.log("userId = ", userId)
    let user = await User.findById(userId);
    console.log(user)  //.select('-password')
    res.json({ msg: "User fetched successful", success: true, user })
  } catch (error) {
    res.json({ msg: "Error in getting user Details", success: false, error: error.message })
  }

}



module.exports = { registerUser, loginUser, updateUser, deleteUser, getUserDetails }

