import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
//mport { Container, Row, Col } from 'reactstrap';
import {Collapse, Button, Input, Row, Col, Form} from 'antd';
import './Sections/UploadBookmark.css';
const { Panel } = Collapse;
const { TextArea } = Input;

function Bookmark() {

    const user = useSelector(state => state.user);  //redux에서 user의 정보를 가져옴

    const [winUsername, setwinUsername] = useState("")
    const [bookmarkData, setbookmarkData] = useState(null)
    const [isSelectedBookmark, setisSelectedBookmark] = useState(false)
    const [selectedBookmark, setselectedBookmark] = useState(null)
    const [bookmarkTitle, setbookmarkTitle] = useState("")
    const [bookmarkDescription, setbookmarkDescription] = useState("")

    //console.log(result)
    

    useEffect(() => {
        axios.post('/api/bookmark/getUsername').then(response => {
            if (response.data.success) {

                setwinUsername(response.data.username)

                const path = `C:/Users/${response.data.username}/AppData/Local/Google/Chrome/User Data/Default/Bookmarks`
                axios.post('/api/bookmark/readBookmark', {path: path}).then(response => {
                    if (response.data.success) {
                        //console.log(JSON.parse(response.data.bookmark))
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

    const onTitleChange = (e) => {
        setbookmarkTitle(e.currentTarget.value)
    }
    const onDescriptionChange = (e) => {
        setbookmarkDescription(e.currentTarget.value)
    }

    const onSelectBookmark = (childItem) => {
        setisSelectedBookmark(true);
        setselectedBookmark(childItem)
    }
    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            bookmark: JSON.stringify(selectedBookmark),
            title: bookmarkTitle,
            description: bookmarkDescription
        }

        axios.post('/api/video/uploadBookmark', variables)
        .then(response => {
            if(response.data.success) {

                response.data.message('성공적으로 업로드 되었습니다.')
                

            } else {
                alert('북마크 업로드에 실패했습니다.')
            }
        })
    }

    return (
        <div className = "bookmark_body">

            <h4>My chrome bookmark list :</h4> <br />
            
                <Row>
                <Col className = "bookmark_panel">
                    {bookmarkData && bookmarkData.roots.bookmark_bar.children.map((item, index) => {
                        if (item.type == "folder") {
                            return <React.Fragment key={index}><Collapse>
                                <Panel header={item.name} >
                                    {item && item.children.map((childItem, childIndex) => {
                                        return <div key={childIndex}>{childIndex + 1}.&nbsp;&nbsp;&nbsp;{childItem.name}</div>
                                    })
                                    }
                                    <Button className="bookmark_select_btn" onClick = {() => onSelectBookmark(item.children)}>Select</Button>
                                </Panel>
                            </Collapse>
                            </React.Fragment>
                        }
                    })
                    }
                </Col>
                <Col className="bookmark_selectedPanel">
                    {isSelectedBookmark &&
                    <Form onSubmit = {onSubmit}>
                        <Form.Item
                            label="Bookmark Detail List"
                            name="Bookmark Detail List"
                        >
                            {selectedBookmark && isSelectedBookmark && selectedBookmark.map((item, index) => {
                                return <div key={index}>{index + 1}.&nbsp;&nbsp;&nbsp;<a href={item.url} target="_blank">{item.name}</a></div>
                            })}
                        </Form.Item>
                        <Form.Item
                            label="Title"
                            name="Title"
                            rules={[{ required: true, message: 'Please input title' }]}
                        >
                            <Input onChange={onTitleChange} value={bookmarkTitle}/>
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="Description"
                            rules={[{ required: true, message: 'Please input description' }]}
                        >
                            <TextArea onChange={onDescriptionChange} value={bookmarkDescription}/>
                        </Form.Item>
                        <Button type="primary" className="bookmark_select_btn" onClick = {onSubmit}>Upload</Button>
                    </Form>
                    }
                </Col>
            </Row>

        </div>
    )
}

export default Bookmark
