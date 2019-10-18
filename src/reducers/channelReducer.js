import * as actionTypes from '../actions/types'

const INITIAL_CHANNEL_STATE = {
  currentChannel: null,
}

export const channelReducer = (state = INITIAL_CHANNEL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel,
      }
    default:
      return state
  }
}
