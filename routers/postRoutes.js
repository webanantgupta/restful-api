const express = require('express');
const { createPost, updatePost, deletePost, getAllPost, getYourPost } = require('../controllers/postController');
const checkToken = require('../middleware/checkToken');
const router = express.Router();



router.post('/create',checkToken,createPost)
router.put('/update/:_id',checkToken,updatePost)
router.delete('/delete/:_id',checkToken,deletePost)
router.get('/getallpost',getAllPost)
router.get('/getyourpost/:_id',getYourPost)


module.exports = router;