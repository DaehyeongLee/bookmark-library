import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import SelectedTitle from '../Commons/SelectedTitle';
import Pagination from '../Commons/util/Pagination';
import './Sections/SearchedBookmark.css';
import '../Commons/body_design.css';



function SearchedBookmark(props) {

    const searchVariable = props.match.params.input;
    const [resultItems, setresultItems] = useState(null)
    const [currentItems, setcurrentItems] = useState(null)
    const [itemsPerPage, setitemsPerPage] = useState(10)

    const PerPageOptions = [
        { value: 5, label: "5" },
        { value: 10, label: "10" },
        { value: 20, label: "20" }
    ]
    const onPerPageChange = (e) => {
        setitemsPerPage(e.currentTarget.value)
    }

    useEffect(() => {
        axios.post('/api/bookmark/searchBookmark', { searchInput: searchVariable }).then(response => {
            if (response.data.success) {

                setresultItems(response.data.result)
                console.log(response.data.result)

                setcurrentItems(response.data.result.slice(0, itemsPerPage))

            } else {
                alert("검색 결과를 가져오는 것에 실패했습니다.")
            }
        })
    }, [itemsPerPage])


    return (
        <React.Fragment>
            <div style={{ width: '100%', margin: '0', padding: '0' }}>
                <SelectedTitle fieldName="통합검색" />
            </div>

            <div className="Result-body">

                <div className="result-msg">
                    Search result with keyword &nbsp;<em className="result-msg__em-tag">{searchVariable}</em>
                </div>

                <div className="searched-content">
                    <h3 className="searched-content__title">Bookmark List <span className="searched-content__title__itemNum">{resultItems && resultItems.length} items</span></h3>
                    {currentItems && currentItems.length > 0 && currentItems.map((item, index) => {
                        return <div key={index} className="searched-content__list">
                            <span className="searched-content__list__title">{item.title}</span>
                            <br />
                            <br />
                            <p>
                                Writer Name: <strong>{item.writer.name}</strong>
                                <br />
                                Upload Date: <strong>{/*To do: Time stamp Update */}</strong>
                            </p>
                            <Link style={{ fontSize: '15px' }} to={`/bookmark/detail/${item._id}`}>▶ Detail</Link>
                        </div>
                    })
                    }
                    {currentItems && currentItems.length == 0 &&
                        <div>검색 결과가 존재하지 않습니다.</div>
                    }
                </div>
                <Row gutter={16}>
                    <Col span={6}>
                        <div className="pagination">
                            <Pagination
                                totalCount={resultItems && parseInt(resultItems.length / itemsPerPage) + 1}
                                items={resultItems}
                                setcurrentItems={setcurrentItems}
                                itemsPerPage={itemsPerPage}
                            />
                        </div>
                    </Col>
                    <Col span={18}>
                        <select className="page_dropdown" onChange={onPerPageChange}>
                            {PerPageOptions.map((item, index) => {
                                if (item.value == 10) {
                                    return <option key={index} value={item.value} selected>{item.label}</option>
                                } else {
                                    return <option key={index} value={item.value}>{item.label}</option>
                                }                                
                            })}
                        </select>
                    </Col>
                </Row>
            </div>


        </React.Fragment>
    )
}

export default withRouter(SearchedBookmark)
