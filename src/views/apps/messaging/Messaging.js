import React, { useEffect } from 'react'  
import { useDispatch, useSelector } from 'react-redux'  
import { fetchChatConversation, endChat } from '../../../redux/actions/messaging/index'  
import ScrollToBottom from 'react-scroll-to-bottom'

export default function Messaging() {
  
  const dispatch = useDispatch()  
  const { loading, conversation, error } = useSelector((state) => state.messaging)  
   

  useEffect(() => {
    dispatch(fetchChatConversation())  
    }, [dispatch])  
      

    if (loading) {
      return <h6> Loading... </h6>
    }

  const handleEndChat = () => {
    dispatch(endChat())
  }
    
  const formatChatTime = (BeginOffsetMillis) => {
    const startDate = new Date(conversation.start_date_time)
    const startTimeStamp = startDate.getTime()
    const updatedTimeStamp = startTimeStamp + BeginOffsetMillis
    const updatedDate = new Date(updatedTimeStamp)
    const options = { hour: "numeric", minute: "numeric" }
    const formattedTime = updatedDate.toLocaleTimeString(undefined, options)
   return formattedTime     
  }

  const renderChatBubbles = () => {
    return conversation.metadata && conversation.metadata.transcription && conversation.metadata.transcription.map((message, index) => (
        <div key={index} className={`chat-bubble ${message.ParticipantRole.toLowerCase()}`}>
            {message.Content}
            <small className='message_time'>{formatChatTime(message.BeginOffsetMillis)}</small>
        </div>
    ))
}

  return (
    <div className="chat-page">
    
    <button className='clear-btn' onClick={handleEndChat}>Clear chat</button>      

      <ScrollToBottom>
            <div className="chat-container">
                {renderChatBubbles()}
                {renderChatBubbles()}
            </div>
      </ScrollToBottom>
    </div>
  )
}
