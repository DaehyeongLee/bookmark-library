import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SelectedTitle from '../Commons/SelectedTitle';
import { useSelector } from 'react-redux';
//mport { Container, Row, Col } from 'reactstrap';
import { Collapse, Button, Input, Row, Col, Form } from 'antd';
import './Sections/UploadBookmark.css';
import '../Commons/body_design.css';
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
                axios.post('/api/bookmark/readBookmark', { path: path }).then(response => {
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

        axios.post('/api/bookmark/uploadBookmark', variables)
            .then(response => {
                if (response.data.success) {

                    alert('성공적으로 업로드 되었습니다.')


                } else {
                    alert('북마크 업로드에 실패했습니다.')
                }
            })
    }

    return (
        <React.Fragment>
            <div style={{ width: '100%', margin: '0', padding: '0' }}>
                <SelectedTitle fieldName="Upload" />
            </div>
            <div className="Result-body">
                <Row gutter={16}>
                    <Col className="panel" span={12}>
                        <h4>My chrome bookmark list :</h4> <br />
                        {bookmarkData && bookmarkData.roots.bookmark_bar.children.map((item, index) => {
                            if (item.type == "folder") {
                                return <React.Fragment key={index}>
                                    <Collapse>
                                        <Panel header={item.name} >
                                            {item && item.children.map((childItem, childIndex) => {
                                                return <div key={childIndex}>{childIndex + 1}.&nbsp;&nbsp;&nbsp;{childItem.name}</div>
                                            })
                                            }
                                            <div className="upload_btn"><Button type="primary" onClick={() => onSelectBookmark(item.children)}>Select</Button></div>
                                        </Panel>
                                    </Collapse>
                                </React.Fragment>
                            }
                        })
                        }
                    </Col>
                    <Col className="selected" span={12}>
                        {isSelectedBookmark &&
                            <Form onSubmit={onSubmit}>
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
                                    <Input onChange={onTitleChange} value={bookmarkTitle} />
                                </Form.Item>
                                <Form.Item
                                    label="Description"
                                    name="Description"
                                    rules={[{ required: true, message: 'Please input description' }]}
                                >
                                    <TextArea onChange={onDescriptionChange} value={bookmarkDescription} />
                                </Form.Item>
                                <div className="upload_btn"><Button type="primary" onClick={onSubmit}>Upload</Button></div>
                            </Form>
                        }
                    </Col>
                </Row>

            </div>
        </React.Fragment>
    )
}

export default Bookmark
