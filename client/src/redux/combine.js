import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import reducer from "./reducers"
import initial from "./states"
import saga from "./sagas"

const globalStore = () => {
  const sagaMiddleware = createSagaMiddleware(),
    store = createStore(
      reducer,
      initial,
      compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__
          ? window.__REDUX_DEVTOOLS_EXTENSION__()
          : f => f
      )
    )
  sagaMiddleware.run(saga)
  return store
}

export default globalStore
