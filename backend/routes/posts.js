const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.post("",(req,res,next)=>{

  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result=>{
    res.status(200).json({
      message:'posr success',
      postid:result._id
    });
  });

})
router.put("/:id",(req,res,next)=>{
  const post= new Post({
    _id:req.body._id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id},post).then(result=>{
    res.status(200).json({message:'updated success'});
  })
})

router.get('',(req,res,next)=>{
Post.find().then(doc=>{
  res.status(200).json({
    message:'success',
    posts:doc
  });
});
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});
  });
  router.delete('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Post.deleteOne({_id:req.params.id}).then(res=>{
      console.log(res)
    })
    res.status(200).json({
      message:"deleted"
    })
  })


  module.exports = router;
