const express = require('express');
const router = express.Router();

const getUsername = require('username');
const fs = require('fs');
const multer = require('multer');

const {Bookmark} = require('../models/Bookmark')


//=================================
//             Bookmark
//=================================

// router.post("/getUsername", (req, res) => {
//     (async () => {
//         let username = await getUsername.sync();
//         if (username.length > 0) {
//             return res.json({
//                 success: true,
//                 username
//             }); 
//         } else {
//             return res.json({
//                 success: false,
//                 message: "Failed to get username"
//             }); 
//         }
//     })();
// });

let storage = multer.diskStorage({
    //파일 저장 경로
    destination: (req, file, cb) => {
        cb(null, "server/uploads/");
    },
    //파일 저장 시 지정될 파일 이름 (날짜 + 파일이름)
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    // fileFilter: (req, file, cb) => {
    //     const ext = path.extname(file.originalname)
    //     if (ext !== '.mp4') {
    //         return cb(res.status(400).end('only mp4 is allowed'), false);
    //     }
    //     cb (null, true)
    // }
})
const upload = multer({storage: storage}).single("file"); //single은 파일 하나만

router.post('/dropFile', (req, res) => {

    //To Do: 북마크 파일로만 제한 필요
        upload(req, res, err => {
            if(err) {
                return res.json({success: false, err})
            }
            if (res.req.file.filename.slice(-9, res.req.file.filename.length) == "Bookmarks") {
                //url: 파일 저장이 된 경로(uploads/), filename: 파일이름
                return res.json({success: true, fileName: res.req.file.filename})
            } else {
                return res.json({success: false, err: "Not bookmark files. Please upload the bookmark file."})
            }
        })
   

    
})

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

router.post("/searchBookmark", (req, res) => {
    Bookmark.find({ title : {$regex : req.body.searchInput} } ) 
    .populate('writer')
    .exec((err, result) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({success: true, result})
    })
    
});

router.post("/detailedBookmark", (req, res) => {
    Bookmark.find({ _id : req.body.bookmarkId} ) 
    .populate('writer')
    .exec((err, result) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({success: true, result})
    })
    
});

module.exports = router;
