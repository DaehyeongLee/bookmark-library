import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {Collapse, Button} from 'antd';
import './Sections/Bookmark.css';
const { Panel } = Collapse;

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
            
            <h4>My chrome bookmark list :</h4> <br />
            {bookmarkData && bookmarkData.roots.bookmark_bar.children.map((item, index) => {
                if (item.type == "folder") {
                    return <React.Fragment key={index}><Collapse>
                        <Panel header={item.name}> 
                        {item && item.children.map((childItem, childIndex) => {
                            return <div key={childIndex}>{childIndex+1}.&nbsp;&nbsp;&nbsp;{childItem.name}</div>
                        })
                        }
                        <Button className = "bookmark_select_btn">Select</Button>
                        </Panel>                        
                    </Collapse>
                    </React.Fragment>
                }    
            })
            }                  
        </div>
    )
}

export default Bookmark
