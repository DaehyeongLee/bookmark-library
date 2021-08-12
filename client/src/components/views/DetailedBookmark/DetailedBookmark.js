import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { ConvertDate } from '../Commons/util/ConvertDate';
import '../Commons/body_design.css';
import './Sections/DetailedBookmark.css';

function DetailedBookmark(props) {

    const detailItemId = props.match.params.item;
    const [datailItems, setdatailItems] = useState(null)
    const [detailTitle, setdetailTitle] = useState("")
    const [detailDescription, setdetailDescription] = useState("")
    const [detailCreatedDate, setdetailCreatedDate] = useState("")
    const [detailWriter, setdetailWriter] = useState(null)

    const goBack = () => {
        props.history.goBack()
    }

    useEffect(() => {
        axios.post('/api/bookmark/detailedBookmark', { bookmarkId: detailItemId }).then(response => {
            if (response.data.success) {

                console.log(response.data.result)

                setdatailItems(JSON.parse(response.data.result[0].bookmark))
                setdetailTitle(response.data.result[0].title)
                setdetailDescription(response.data.result[0].description)
                setdetailCreatedDate(response.data.result[0].createdAt)
                setdetailWriter(response.data.result[0].writer)

            } else {
                alert("상세 결과를 가져오는 것에 실패했습니다.")
            }
        })
    }, [])

    const renderDetailContentInfo = (key, value) => {
        return (
            <div className="detail-content__info">
                <div className="detail-content__info__key">{key}</div>
                <div className="detail-content__info__value">{value}</div>
            </div>
        )
    }

    return (

        <div className="Result-body Result-body-padding">

            <div className="result-msg result-msg__content">
                <a className="result-msg__goBack" onClick={goBack}>&lsaquo;&nbsp;Return to previous results</a>
            </div>

            <div className="detail-content">
                {detailTitle &&
                    <h2 className="detail-content__title"> {detailTitle} </h2>
                }

                {renderDetailContentInfo("Browser", "Chrome")}
                {detailWriter && renderDetailContentInfo("Writer", detailWriter.name)}
                {detailWriter && renderDetailContentInfo("Writer Email", detailWriter.email)}
                {detailCreatedDate && renderDetailContentInfo("Upload Date", ConvertDate(detailCreatedDate))}
                {detailDescription && renderDetailContentInfo("Description", detailDescription)}

            </div>

            {/*To Do: '내 북마크에 추가' 기능 있어야 함 */}
            <div className="detail-linkTable">
                <div className="detail-linkTable__title">Included Links</div>
                <div className="detail-linkTable__table">
                    <table>
                        <thead>
                            <th style={{ width: '5%' }}>No.</th>
                            <th style={{ width: '30%' }}>Name</th>
                            <th style={{ width: '65%' }}>URL</th>
                        </thead>

                        <tbody>
                            {datailItems && datailItems.length > 0 && datailItems.map((item, index) => {
                                return (<tr key={index}>
                                    <td style={{ width: '5%', textAlign: 'center' }}>{index + 1}</td>
                                    <td style={{ width: '30%' }}>{item.name}</td>
                                    <td style={{ width: '65%' }}><a href={item.url} target="_blank">{item.url}</a></td>
                                </tr>)
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default DetailedBookmark
