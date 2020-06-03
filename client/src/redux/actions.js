import * as TYPES from "./types"

export const fetch_login_request = payload => {
  return {
    type: TYPES.FETCH_LOGIN_REQUEST,
    payload,
  }
}

export const fetch_logout_request = payload => {
  return {
    type: TYPES.FETCH_LOGOUT_REQUEST,
    payload,
  }
}

export const socket_login = payload => {
  return {
    type: TYPES.SOCKECT_LOGIN,
    payload,
  }
}

export const socket_logout = payload => {
  return {
    type: TYPES.SOCKECT_LOGOUT,
    payload,
  }
}

export const socket_write = payload => {
  return {
    type: TYPES.SOCKECT_WRITE,
    payload,
  }
}

export const socket_message = payload => {
  return {
    type: TYPES.SOCKECT_MESSAGE,
    payload,
  }
}
