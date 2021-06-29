import React, { useEffect, useState} from 'react';
import axios from 'axios';

function Bookmark() {

    const [winUsername, setwinUsername] = useState("")
    const [bookmarkData, setbookmarkData] = useState(null)
    //const result = getChromeBookmark(path)

    //console.log(result)
    

    useEffect(() => {
        axios.post('/api/bookmark/getUsername').then(response => {
            if (response.data.success) {

                setwinUsername(response.data.username)

                const path = `C:/Users/${response.data.username}/AppData/Local/Google/Chrome/User Data/Default/Bookmarks`
                axios.post('/api/bookmark/readBookmark', {path: path}).then(response => {
                    if (response.data.success) {
                        console.log(JSON.parse(response.data.bookmark))
                        setbookmarkData(JSON.parse(response.data.bookmark))
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
            My chrome bookmark list : <br />
            <li>
            {bookmarkData && bookmarkData.roots.bookmark_bar.children.map((item, index) => (
                <ul key={index}>
                    {item.name}
                </ul>
            ))
            }
            </li>                    
        </div>
    )
}

export default Bookmark
