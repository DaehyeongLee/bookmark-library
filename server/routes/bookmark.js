const express = require('express');
const router = express.Router();

const getUsername = require('username');
const fs = require('fs');

const {Bookmark} = require('../models/Bookmark')


//=================================
//             Bookmark
//=================================

router.post("/getUsername", (req, res) => {
    (async () => {
        let username = await getUsername.sync();
        if (username.length > 0) {
            return res.json({
                success: true,
                username
            }); 
        } else {
            return res.json({
                success: false,
                message: "Failed to get username"
            }); 
        }
    })();
});

router.post("/readBookmark", (req, res) => {
    
    let bookmarkPath = req.body.path;

    //Read bookmark data
    fs.readFile(bookmarkPath, 'utf8', function(err, bookmark){
        if (req.body.path) {
            return res.json({
                success: true,
                bookmark
            }); 
        } else {
            return res.json({
                success: false,
                message: "Failed to get bookmark data"
            }); 
        }
      });
});

router.post("/uploadBookmark", (req, res) => {
    
    const bookmark = new Bookmark(req.body)

    bookmark.save((err, doc) => {
        if(err) {
            console.log(err)
            return res.json({success: false, err})
        } else {
            return res.status(200).json({success: true})
        }
    })
});



module.exports = router;
