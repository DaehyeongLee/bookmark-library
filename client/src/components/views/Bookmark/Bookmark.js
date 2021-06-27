import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { getChromeBookmark } from 'chrome-bookmark-reader';

function Bookmark() {

    const [winUsername, setwinUsername] = useState("")
    const path = `C:/Users/${winUsername}/AppData/Local/Google/Chrome/User Data/Default/Bookmarks`
    //const result = getChromeBookmark(path)

    //console.log(result)
    

    useEffect(() => {
        axios.post('/api/bookmark/getUsername').then(response => {
            if (response.data.success) {
                console.log(response.data)
                setwinUsername(response.data.username)
            } else {
                alert(response.data.message)
            }
        })
    }, [])

    return (
        <div>
            My Windows user name is {winUsername}
        </div>
    )
}

export default Bookmark
