import React, { useState } from 'react';
import { Button, Input, Form, Col, Row } from 'antd';
import MainImage from './Sections/MainImage';
import './Sections/LandingPage.css';
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
        <div style={{ width: '100%', margin: '0', padding: '0' }}>
            <MainImage
                image={bannerImg}
                title="Title"
                text="Text" />
            <div className="input-field">
                <Form onSubmit={onSubmit}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={3}>
                            <div className="search_label">통합검색</div>
                        </Col>
                        <Col className="gutter-row" span={16}>
                            <Form.Item
                                name="Bookmark_Search"
                            >
                                <div className="search_input"><Input onChange={onInputChange} value={searchText}/></div>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={5}>
                            <div className="bookmark_search_btn"><Button type="primary" onClick={onSubmit}><span class="fas fa-search"></span>Search</Button></div>
                            {/* To Do: Search Icon */}
                        </Col>
                    </Row>                    
                </Form>
            </div>
        </div>


    )
}

export default LandingPage
