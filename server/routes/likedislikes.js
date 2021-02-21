const express = require('express');
const router = express.Router();

const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

//=================================
//           Like
//=================================

router.post('/getLike', (req, res) => {
	
	let variable = {}
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId }
    } else if(req.body.commentId) {
        variable = { commentId: req.body.commentId }
    } 

    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes: likes })
        })
	
});


router.post('/like', (req, res) => {
	
	let variable = {}
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else if(req.body.commentId) {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }
	
	const like = new Like(variable)
	
	like.save((err, doc) => {
		if(err) return res.json({ success: false, err })
		
		Dislike.findOneAndDelete(variable)
			.exec((err, doc) => {
			if(err) return res.status(400).json({success: false, err})
			res.status(200).json({ success: true })
			})
	})
	
});

router.post('/unlike', (req, res) => {
	
	let variable = {}
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else if(req.body.commentId) {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }
	
	Like.findOneAndDelete(variable)
		.exec((err, doc) => {
			if(err) return res.status(400).json({success: false, err})
			res.status(200).json({ success: true })
		})
	
});


//=================================
//           Dislike
//=================================

router.post('/getDislike', (req, res) => {
	
	let variable = {}
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId }
    } else if(req.body.commentId) {
        variable = { commentId: req.body.commentId }
    }

    Dislike.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, dislikes: dislikes })
        })
	
});


router.post('/dislike', (req, res) => {
	
	
	let variable = {}
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else if(req.body.commentId) {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }
	
	const dislike = new Dislike(variable)
	
	dislike.save((err, doc) => {
		if(err) return res.json({ success: false, err })
		
		Dislike.findOneAndDelete(variable)
			.exec((err, doc) => {
			if(err) return res.status(400).json({success: false, err})
			res.status(200).json({ success: true })
			})
	})
	
});

router.post('/undislike', (req, res) => {
	
	let variable = {}
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }
	
	Dislike.findOneAndDelete(variable)
		.exec((err, doc) => {
			if(err) return res.status(400).json({success: false, err})
			res.status(200).json({ success: true, result: doc })
		})
	
});



module.exports = router;