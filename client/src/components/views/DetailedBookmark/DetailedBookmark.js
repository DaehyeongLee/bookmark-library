import React from 'react'

function DetailedBookmark(props) {

    const detailItemTitle = props.match.params.item;

    return (
        <div>
            Detail Item's ID is : {detailItemTitle}
        </div>
    )
}

export default DetailedBookmark
