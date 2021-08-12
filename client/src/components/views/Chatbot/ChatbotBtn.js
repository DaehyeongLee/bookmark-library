import React from 'react'
import chat_icon from '../../../assets/images/chat_white.png'

function ChatbotBtn() {
    return (
        <div style={{
            right: "40px",
            bottom: "40px",
            position: "fixed",
            zIndex: "21474830000",
            backgroundColor: "#F7931D",
            width: "60px",
            height: "60px",
            cursor: "pointer",
            borderRadius: "30px",
            boxShadow: "0 2px 16px 0 rgb(0 0 0 / 10%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <img src={chat_icon} style={{
                width: "60%",
                height: "60%",
                position: "relative",
                color: "white"
            }}/>
        </div>
    )
}

export default ChatbotBtn
