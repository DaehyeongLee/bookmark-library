import React from 'react'

function SelectedTitle(props) {
    return (
        <div style = {{backgroundColor: '#f2f2f2',
        height: '100px',
        backgroundSize: '100%, cover',
        width: '100%',
        position: 'absolute',
        top: '142px',
        borderBottom: '1px solid #dcdcdc',
        fontSize: '2rem',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
        }}>
            
            {props.fieldName}
                
        </div>
    )
}

export default SelectedTitle
