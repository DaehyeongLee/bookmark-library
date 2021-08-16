import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../../../_actions/message_actions';
import Message from './Sections/Message';
import Card from './Sections/Card';
import { List, Icon, Avatar, Button } from 'antd';
import '../Commons/body_design.css';
import './Sections/Chatbot.css';
import backIcon from '../../../assets/images/back_icon_white.png'

function Chatbot(props) {
    const dispatch = useDispatch();
    const messagesFromRedux = useSelector(state => state.message.messages) //redux에 저장된 message 목록 불러옴

    useEffect(() => {
        eventQuery('WelcomMessage')
    }, [])

    const textQuery = async (text) => {

        //let conversationList = [] //conversations

        //유저가 보낸 Text로 변수 초기화
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }
        //conversationList.push(conversation) //유저의 입력을 대화 기록에 push
        dispatch(saveMessage(conversation)) //redux store에 저장

        const textQueryVariable = {
            text
        }

        //Text Query router로 request를 보내기
        try {
            const response = await Axios.post('/api/dialogflow/textQuery', textQueryVariable)

            //Chatbot의 response
            //response가 여러개일 수 있으므로 반복으로 구현
            for (let content of response.data.fulfillmentMessages) {
                conversation = {
                    who: 'bot',
                    content: content
                }
                //conversationList.push(conversation) //chatbot의 답장을 대화 기록에 push
                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            conversation = {
                who: 'user',
                content: {
                    text: {
                        text: "Error occured"
                    }
                }
            }
            //conversationList.push(conversation)
            dispatch(saveMessage(conversation))
        }


    }

    const eventQuery = async (event) => {

        const eventQueryVariable = {
            event
        }

        //Event Query router로 request를 보내기
        try {
            const response = await Axios.post('/api/dialogflow/eventQuery', eventQueryVariable)

            //Chatbot의 response
            //response가 여러개일 수 있으므로 반복으로 구현
            for (let content of response.data.fulfillmentMessages) {
                let conversation = {
                    who: 'bot',
                    content: content
                }
                console.log(conversation)
                dispatch(saveMessage(conversation))
            }

        } catch (error) {
            let conversation = {
                who: 'user',
                content: {
                    text: {
                        text: "Error occured"
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }


    }

    const keyPressHandler = (e) => {

        //Enter key press (keyboard)
        if (e.key === "Enter") {
            //아무것도 입력되지 않았을 경우
            if (!e.target.value) {
                return alert('Need to type something')
            }
            textQuery(e.target.value);

            e.target.value = ""; //입력했던 값 초기화
        }
    }

    const renderCards = (cards) => {

        return cards.map((card, i) => {
            return <Card key={i} cardInfo={card.structValue} />
        })
    }

    const renderOneMessage = (message, i) => {
        //console.log(message)

        //template for normal text
        if (message.content && message.content.text && message.content.text.text) {
            return <Message key={i} who={message.who} text={message.content.text.text} />
        }
        //template for card message
        //Card를 표시하기 위한 정보들은 dialogflow에서 json형식으로 보냄
        //이에 경우 다른 payload 사용 필요
        else if (message.content && message.content.payload.fields.card) {

            const AvatarSrc = message.who === 'bot' ? <Icon type="robot" /> : <Icon type="smile" />

            return <List.Item style={{ padding: '1rem' }}>
                <List.Item.Meta
                    avatar={<Avatar icon={AvatarSrc} />}
                    title={message.who}
                    description={renderCards(message.content.payload.fields.card.listValue.values)}
                />

            </List.Item>
        }
    }

    const renderMessage = (returnedMessages) => {

        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return renderOneMessage(message, i);
            })
        } else {
            return null;
        }
    }

    const onbackBtnClickHandler = () => {
        props.toggle(false)
    }

    return (
        <React.Fragment>
            {/*To do: 챗봇 밖 클릭 시 챗봇 닫힘, 닫았다가 다시 열었을 시 챗봇 대화기록 처음부터 시작 */}
            <div className="Chatbot-Header">
                <span className="Chatbot-Header__backBtn" onClick={onbackBtnClickHandler}><img style={{width: '14px'}}src={backIcon} /></span>
                &nbsp;&nbsp;Bookmark Library Chatbot
                </div>
            <div className="Chatbot-Content">
                <div className="Chatbot-Content__message">
                    {renderMessage(messagesFromRedux)}
                </div>

                <input className="Chatbot-Content__input"
                    placeholder="Enter a message.."
                    onKeyPress={keyPressHandler}
                    type="text"
                />
                {/*To do : 전송 버튼 넣기 */}
            </div>
        </React.Fragment>
    )
}

export default Chatbot
