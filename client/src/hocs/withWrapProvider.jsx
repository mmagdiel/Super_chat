import React from "react"
import { Provider } from "react-redux"
import globalStore from "../redux/combine"

export default ({ element }) => {
  const store = globalStore()
  return <Provider store={store}>{element}</Provider>
}
