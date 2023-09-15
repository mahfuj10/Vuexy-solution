import {
    FETCH_CHAT_CONVERSATION_REQUEST,
    FETCH_CHAT_CONVERSATION_SUCCESS,
    FETCH_CHAT_CONVERSATION_FAILURE,
    END_CHAT
  } from '../../actions/messaging/index'
  
  const initialState = {
    loading: false,
    conversation: [],
    error: null
  }
  
  const messaging = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CHAT_CONVERSATION_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_CHAT_CONVERSATION_SUCCESS:
        return { 
          ...state,
          loading: false,
          conversation: action.payload,
          error: null
        } 
      case FETCH_CHAT_CONVERSATION_FAILURE:
        return {
          ...state,
          loading: false,
          conversation: [],
          error: action.payload
        } 
      case END_CHAT:
        return {
          ...state,
          conversation: []
        }
      default:
        return state 
    }
  } 
  
  export default messaging 
  