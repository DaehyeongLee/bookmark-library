import React, { useEffect, useState} from 'react';
import axios from 'axios';

function Bookmark() {

    const [winUsername, setwinUsername] = useState("")
    const [bookmarkData, setbookmarkData] = useState("")
    //const result = getChromeBookmark(path)

    //console.log(result)
    

    useEffect(() => {
        axios.post('/api/bookmark/getUsername').then(response => {
            if (response.data.success) {

                setwinUsername(response.data.username)

                const path = `C:/Users/${response.data.username}/AppData/Local/Google/Chrome/User Data/Default/Bookmarks`
                axios.post('/api/bookmark/readBookmark', {path: path}).then(response => {
                    if (response.data.success) {
                        setbookmarkData(response.data.bookmark)
                        console.log(response.data.bookmark)
                    } else {
                        alert(response.data.message)
                    }
                })

            } else {
                alert(response.data.message)
            }
        })
    }, [])

    return (
        <div>
            My Windows user name is {winUsername} <br />
        </div>
    )
}

export default Bookmark
