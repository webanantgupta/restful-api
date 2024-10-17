const express = require('express');
const { registerUser, updateUser, deleteUser, loginUser, getUserDetails } = require('../controllers/userController');
const checkToken = require('../middleware/checkToken');
const router = express.Router();

router.post('/create', registerUser);
router.put('/update/:_id', checkToken, updateUser);
router.delete('/delete/:_id', checkToken, deleteUser);
router.post('/login', loginUser);
router.get('/getinfo', checkToken, getUserDetails);








module.exports = router;