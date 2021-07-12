import React, {useState} from 'react';
import {Button, Input, Form} from 'antd';

function LandingPage(props) {

    const [searchText, setsearchText] = useState("")

    const onSubmit = (e) => {
        e.preventDefault();

        if(searchText.length > 0) {
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
