import React, { useRef, useState, useEffect } from 'react'
import Chatbot from './Chatbot'
import chat_icon from '../../../assets/images/chat_white.png'

function ChatbotBtn() {

    const [ChatToggle, setChatToggle] = useState(false)

    const onClickHandler = () => {
        setChatToggle(true)
    }

    return (
        <React.Fragment>
            {ChatToggle && 
                <div style={{
                    width: "350px",
                    height: "600px",
                    borderRadius: "5px",
                    position: "fixed",
                    right: "40px",
                    bottom: "103px",
                    zIndex: "21474830000",
                    boxShadow: "0 2px 16px 0 rgb(0 0 0 / 10%)"
                }}>
                    <Chatbot toggle={setChatToggle}/>
                </div>
            }
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
            }} onClick={onClickHandler} >
                <img src={chat_icon} style={{
                    width: "60%",
                    height: "60%",
                    position: "relative",
                    color: "white"
                }}/>
            </div>
        </React.Fragment>
    )
}

export default ChatbotBtn
