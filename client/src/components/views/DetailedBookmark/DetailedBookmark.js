import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DetailedBookmark(props) {

    const detailItemId = props.match.params.item;
    const [datailItems, setdatailItems] = useState(null)
    const [detailTitle, setdetailTitle] = useState("")
    const [detailDescription, setdetailDescription] = useState("")

    useEffect(() => {
        axios.post('/api/bookmark/detailedBookmark', { bookmarkId: detailItemId }).then(response => {
            if (response.data.success) {

                console.log(response.data.result)

                setdatailItems(JSON.parse(response.data.result[0].bookmark))
                setdetailTitle(response.data.result[0].title)
                setdetailDescription(response.data.result[0].description)

            } else {
                alert("상세 결과를 가져오는 것에 실패했습니다.")
            }
        })
    }, [])


    return (
        <div className = "Result-body">

            {/* To do : Result - body CSS, Result -body common화하기 */}

            {detailTitle && 
                <div>Title: {detailTitle} </div>
            }
            {detailDescription &&
                <div>Description: {detailDescription} </div>
            }
            <br />
            <br />
            {datailItems && datailItems.length > 0 && datailItems.map((item, index) => {
                return <div key={index}>
                         <div>{index + 1}. Name: {item.name} &nbsp; URL: {item.url}</div>
                    <br />
                </div>
            })
            }
        </div>
    )
}

export default DetailedBookmark