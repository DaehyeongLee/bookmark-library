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
                <SelectedTitle fieldName="통합검색"/>
            </div>

            {/* To do: Body 전체 보이도록 css 수정 
            바디 템플릿 수정*/}
            <div className="Result-body">
                <h3>Result : </h3> <br />
                {resultItems && resultItems.length > 0 && resultItems.map((item, index) => {
                    return <div key={index}>
                        {index + 1}. <Link to={`/bookmark/detail/${item._id}`}>{item.title}</Link>
                        {/*To do: Click one item -> Detail Page 
                    parameter -> item*/}
                        <br />
                        <br />
                    </div>
                })
                }
                {resultItems && resultItems.length == 0 &&
                    <div>검색 결과가 존재하지 않습니다.</div>
                }
            </div>

        </React.Fragment>
    )
}

export default withRouter(SearchedBookmark)
