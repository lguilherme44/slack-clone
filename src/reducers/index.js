import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { channelReducer } from './channelReducer'

export const reducers = combineReducers({
  user: userReducer,
  channel: channelReducer,
})
