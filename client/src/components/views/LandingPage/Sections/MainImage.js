import React from 'react';

function MainImage(props) {
    return (
        <div style = {{background: `linear-gradient(to bottom, rgba(0,0,0,0) 
        39%, rgba(0,0,0,0) 
        41%, rgba(0,0,0,0.65) 
        100%),
        url('${props.image}'), #1c1c1c`,
        height: '400px',
        backgroundSize: '100%, cover',
        width: '100%',
        position: 'absolute',
        top: '142px'
        }}>
        </div>
    )
}

export default MainImage