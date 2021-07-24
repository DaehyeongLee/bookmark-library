import React, { useState } from 'react';
import { Button, Input, Form } from 'antd';
import MainImage from './Sections/MainImage';
import bannerImg from '../../../images/landing-banner.jpg';

function LandingPage(props) {

    const [searchText, setsearchText] = useState("")

    const onSubmit = (e) => {
        e.preventDefault();

        if (searchText.length > 0) {
            props.history.push(`/bookmark/search-result/${searchText}`);
        }
        else {
            alert("Please enter the text.")
        }

    }
    const onInputChange = (e) => {

        setsearchText(e.currentTarget.value)
    }

    return (
        <div style = {{width: '100%', margin: '-35px 0 0 0', padding: '0'}}>
            <MainImage 
                image={bannerImg} 
                title = "Title"
                text = "Text"/>
            <div className="app">
                <Form onSubmit={onSubmit}>
                    <Form.Item
                        label="Search the bookmarks you want"
                        name="Bookmark_Search"
                    >
                        <Input onChange={onInputChange} value={searchText} />
                    </Form.Item>
                    <Button type="primary" className="bookmark_search_btn" onClick={onSubmit}>Search</Button>
                </Form>
            </div>
        </div>


    )
}

export default LandingPage
