import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Sections/SearchedBookmark.css';

function SearchedBookmark(props) {

    const searchVariable = props.match.params.input;
    const [resultItems, setresultItems] = useState(null)

    useEffect(() => {
        axios.post('/api/bookmark/searchBookmark', {searchInput: searchVariable}).then(response => {
            if (response.data.success) {

                setresultItems(response.data.result)
                console.log(response.data.result)

                
            } else {
                alert("검색 결과를 가져오는 것에 실패했습니다.")
            }
        })
    }, [])


    return (
        <div className = "Result-body">
            {resultItems && resultItems.length > 0 && 
                <div>SearchedBookmark</div>

            }
            {resultItems && resultItems.length == 0 &&
               <div>검색 결과가 존재하지 않습니다.</div>
            }
        </div>
    )
}

export default SearchedBookmark
