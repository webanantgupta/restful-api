const postSchema = require("../models/postSchema");




const createPost = async (req,res) => {
    // res.send('create post working')
    const {title,description,image,video} = req.body;
    const userId = req.user;
     try {
        let data = await postSchema.create({
            title,
            description,
            image,
            video,
            userId
         })
          return res.json({msg:"Post created successfully",success:true,data})
     } catch (error) {
          return res.json({msg:"Error in creating Post",success:false, error:error.message})
     }

}
const updatePost = async (req,res) => {
    // res.send('update post working')
   try {
    let userId = req.user;
    let postId = req.params._id;

    let post = await postSchema.findById(postId);
    if(post.userId != userId){
        return res.json({msg:"not allowed to update post",success:false})
    }
    
    let {title,description} = req.body;
    let data = await postSchema.findByIdAndUpdate(postId,{$set:{title,description}},{new:true})
    return res.json({msg:"post updated successfully",success:true,data})
   } catch (error) {
    return res.json({msg:"error in updating post",success:false,error:error.message})
    
   }
}
const deletePost =async (req,res) => {
    // res.send('delete post working')
    try {
        let userId = req.user;
        let postId = req.params._id;
    
        let post = await postSchema.findById(postId);
        if(post.userId != userId){
            return res.json({msg:"not allowed to update post",success:false})
        }
        
        let data = await postSchema.findByIdAndDelete(postId,{$set:{title,description}},{new:true})
        return res.json({msg:"post deleted successfully",success:true})
       } catch (error) {
        return res.json({msg:"error in deleting post",success:false,error:error.message})
        
       }
}
const getAllPost = async (req,res) => {
    // res.send('getAll post working')
    try {
        let allPost = await postSchema.find();
        return res.json({msg:"Here are all post",success:true,allPost})
    } catch (error) {
        return res.json({msg:"error in getting all post",success:false,})
        
    }
}
const getYourPost = (req,res) => {
    // res.send('getYour post working')
    let yourId = req.params._id;
    try {
        
    } catch (error) {
        
    }

}

module.exports = {createPost,updatePost,deletePost,getAllPost,getYourPost}