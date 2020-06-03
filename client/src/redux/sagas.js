import io from "socket.io-client"
import { call, put, take, all, fork, takeLatest } from "redux-saga/effects"
import { eventChannel } from "redux-saga"
import * as TYPES from "./types"
import axios from "axios"
/*
cancel,
import {
  socket_login,
  socket_logout,
  socket_write,
  socket_message,
} from "./actions"
*/

export default function* saga() {
  yield all([
    fork(flow),
    takeLatest(TYPES.FETCH_LOGIN_REQUEST, fetch_login),
    takeLatest(TYPES.FETCH_LOGOUT_REQUEST, fetch_logout),
  ])
}

function* fetch_login({ payload }) {
  const url_login = "http://localhost:8888/login"
  try {
    const user = yield call(api_username, url_login, payload)
    yield put({ type: TYPES.FETCH_LOGIN_SUCCESS, payload: user })
  } catch (e) {
    const msg = "No se obtiene respuesta del servidor, ☹️"
    yield put({ type: TYPES.FETCH_LOGIN_FAILURE, payload: { msg } })
  }
}

function* fetch_logout({ payload }) {
  const url_login = "http://localhost:8888/logout"
  try {
    yield call(api_token, url_login, payload)
    yield put({ type: TYPES.FETCH_LOGOUT_SUCCESS, payload })
  } catch (e) {
    const msg = "No se obtiene respuesta del servidor, ☹️"
    yield put({ type: TYPES.FETCH_LOGOUT_FAILURE, payload: { msg } })
  }
}

function* flow() {
  const socket = yield call(connect)
  const socketChannel = yield call(subscribe, socket)
  while (true) {
    let { payload } = yield take(socketChannel)
    console.log(payload)
    yield put({ type: TYPES.SOCKECT_MESSAGE, payload })
  }
}

function connect() {
  const socket = io("http://localhost:8889")

  return new Promise(resolve => {
    socket.on("connection", () => {
      resolve(socket)
    })
  })
}

const api_username = (url, body) =>
  axios.post(url, { username: body }).then(response => response.data)

const api_token = (url, body) =>
  axios.post(url, { token: body }).then(response => response.data)

function subscribe(socket) {
  return eventChannel(emit => {
    const handleMsg = event => {
      emit(event.payload)
    }

    socket.on("message", handleMsg)

    const unsubscribe = () => {
      socket.off("message", handleMsg)
    }
    return unsubscribe
  })
}
