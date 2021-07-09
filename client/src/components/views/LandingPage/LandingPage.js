import React from 'react';
import {Button, Input, Form} from 'antd';

function LandingPage() {

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        
            <div className = "app">
                <Form onSubmit = {onSubmit}>
                        <Form.Item
                            label="Search the bookmarks you want"
                            name="Bookmark_Search"
                        >
                            <Input />
                        </Form.Item>
                        <Button type="primary" className="bookmark_search_btn" onClick = {onSubmit}>Search</Button>
                    </Form>
            </div>
        
    )
}

export default LandingPage
