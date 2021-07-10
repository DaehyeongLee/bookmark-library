import React, {useState} from 'react';
import {Button, Input, Form} from 'antd';
import SearchedBookmark from '../SearchedBookmark/SearchedBookmark';

function LandingPage(props) {

    const [searchText, setsearchText] = useState("")

    const onSubmit = (e) => {
        e.preventDefault();

        props.history.push(`/bookmark/search-result/${searchText}`);
    }
    const onInputChange = (e) => {
        setsearchText(e.currentTarget.value)
    }

    return (
        
            <div className = "app">
                <Form onSubmit = {onSubmit}>
                        <Form.Item
                            label="Search the bookmarks you want"
                            name="Bookmark_Search"
                        >
                            <Input onChange={onInputChange} value={searchText}/>
                        </Form.Item>
                        <Button type="primary" className="bookmark_search_btn" onClick = {onSubmit}>Search</Button>
                    </Form>
            </div>
        
    )
}

export default LandingPage
