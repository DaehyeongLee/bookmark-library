import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import SelectedTitle from '../Commons/SelectedTitle';
import Pagination from '../Commons/util/Pagination';
import './Sections/SearchedBookmark.css';
import '../Commons/body_design.css';



function SearchedBookmark(props) {

    const searchVariable = props.match.params.input;
    const [resultItems, setresultItems] = useState(null)


    

    useEffect(() => {
        axios.post('/api/bookmark/searchBookmark', { searchInput: searchVariable }).then(response => {
            if (response.data.success) {

                setresultItems(response.data.result)
                console.log(response.data.result)


            } else {
                alert("검색 결과를 가져오는 것에 실패했습니다.")
            }
        })
    }, [])


    return (
        <React.Fragment>
            <div style={{ width: '100%', margin: '0', padding: '0' }}>
                <SelectedTitle fieldName="통합검색" />
            </div>

            <div className="Result-body">

                <div className="result-msg">
                    Search result with keyword &nbsp;<em className="result-msg__em-tag">{searchVariable}</em>
                </div>

                <div className="content">
                    <h3 className="content__title">Bookmark List <span className="content__title__itemNum">{resultItems && resultItems.length} items</span></h3>
                    {resultItems && resultItems.length > 0 && resultItems.map((item, index) => {
                        return <div key={index} className="content__list">
                            <span className="content__list__title">{item.title}</span>
                            <br />
                            <br />  
                            <p>
                                Writer Name: <strong>{item.writer.name}</strong>
                                <br />
                                Upload Date: <strong>{/*To do: Time stamp Update */}</strong>
                            </p>
                            <Link style={{fontSize: '15px'}}to={`/bookmark/detail/${item._id}`}>▶ Detail</Link>
                        </div>
                    })
                    }
                    {resultItems && resultItems.length == 0 &&
                        <div>검색 결과가 존재하지 않습니다.</div>
                    }
                </div>
                <div className="pagination"><Pagination totalCount = {resultItems && resultItems.length}/></div>
            </div>
            

        </React.Fragment>
    )
}

export default withRouter(SearchedBookmark)
