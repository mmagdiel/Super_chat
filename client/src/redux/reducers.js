import initial from "./states"
import * as TYPES from "./types"
import { navigate } from "gatsby"

export default function reducer(state = initial, { type, payload }) {
  const handlers = {
    [TYPES.FETCH_LOGIN_SUCCESS]: handler_fetech_login_success,
    [TYPES.FETCH_LOGIN_FAILURE]: handler_fetch_login_failure,
    [TYPES.FETCH_LOGOUT_SUCCESS]: handler_fetech_logout_success,
    [TYPES.FETCH_LOGOUT_FAILURE]: handler_fetch_logout_failure,
    [TYPES.SOCKECT_WRITE]: handler_socket_write,
    [TYPES.SOCKECT_MESSAGE]: handler_socket_message,
  }
  return handlers[type] ? handlers[type](state, payload) : state
}

const handler_fetech_login_success = (state, payload) => {
  const status = 200,
    { usernames } = state,
    { user } = payload[0]

  localStorage.setItem("token", payload.token)
  navigate("/room")
  return {
    ...state,
    current: { ...payload[0], status },
    usernames: [...usernames, user],
  }
}

const handler_fetch_login_failure = (state, payload) => {
  const status = 500
  return {
    ...state,
    current: { ...payload, status },
  }
}

const handler_fetech_logout_success = (state, payload) => {
  const { usernames } = state,
    { current } = state,
    users = usernames.filter(u => u !== current.user)

  localStorage.removeItem("token")
  navigate("/")
  return {
    ...state,
    current: {},
    usernames: users,
  }
}

const handler_fetch_logout_failure = (state, payload) => {
  return {
    ...state,
  }
}

const handler_socket_write = (state, payload) => {}

const handler_socket_message = (state, payload) => {
  const { messages } = state
  return {
    ...state,
    messages: [...messages, payload],
  }
}
