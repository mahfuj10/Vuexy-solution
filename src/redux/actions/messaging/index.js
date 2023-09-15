import axios from 'axios'

export const FETCH_CHAT_CONVERSATION_REQUEST = 'FETCH_CHAT_CONVERSATION_REQUEST'
export const FETCH_CHAT_CONVERSATION_SUCCESS = 'FETCH_CHAT_CONVERSATION_SUCCESS'
export const FETCH_CHAT_CONVERSATION_FAILURE = 'FETCH_CHAT_CONVERSATION_FAILURE'
export const END_CHAT = 'END_CHAT'


export const endChat = () => {
  return {
    type: END_CHAT
  }
}

export const fetchChatConversation = () => {
  return async (dispatch) =>  {
    dispatch({ type: FETCH_CHAT_CONVERSATION_REQUEST })

    try {
      const response = await axios.get('/contact_response.json')
      const data = response.data

      const jsonObject = new Function(`return ${data.metadata}`)()
      data.metadata = JSON.parse(jsonObject)

      dispatch({
        type: FETCH_CHAT_CONVERSATION_SUCCESS,
        payload: data
      })

    } catch (error) {
      dispatch({
        type: FETCH_CHAT_CONVERSATION_FAILURE,
        payload: error.message
      })
    }
  }
}
