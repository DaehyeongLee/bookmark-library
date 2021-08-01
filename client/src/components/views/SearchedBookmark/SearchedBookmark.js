import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import SelectedTitle from '../Commons/SelectedTitle';
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

                <div className="Result-body__result-msg">
                    Search result with keyword &nbsp;<em className="Result-body__result-msg__em-tag">{searchVariable}</em>
                </div>

                <div className="Result-body__content">
                    <h3 className="Result-body__content__title">Bookmark List <span className="Result-body__content__title__itemNum">{resultItems && resultItems.length} items</span></h3> 
                    <br />
                    {resultItems && resultItems.length > 0 && resultItems.map((item, index) => {
                        return <div key={index}>
                            {index + 1}. <Link to={`/bookmark/detail/${item._id}`}>{item.title}</Link>
                            <br />
                            <br />
                        </div>
                    })
                    }
                    {resultItems && resultItems.length == 0 &&
                        <div>검색 결과가 존재하지 않습니다.</div>
                    }
                </div>

            </div>

        </React.Fragment>
    )
}

export default withRouter(SearchedBookmark)
