const express = require('express');
const router = express.Router();

const getUsername = require('username');


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



module.exports = router;
