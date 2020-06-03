import React, { useState } from "react"
import { Toolbar, Button } from "react-md"
import { connect } from "react-redux"
import { fetch_logout_request } from "../redux/actions"

function WithToken({ children, fetch_logout, current }) {
  const [token, setToken] = useState(localStorage.token || current.token),
    handleClick = () => {
      fetch_logout(token)
      setToken(localStorage.token)
      /*
      setTimeout(function () {
        navigate("/")
      }, 700)
      */
    }
  if (!token) {
    return (
      <Toolbar colored title="Super Chat">
        <h1 className="center">Se require registro</h1>
      </Toolbar>
    )
  }
  return (
    <>
      <Toolbar
        colored
        title="Super Chat"
        actions={
          <Button flat onClick={handleClick}>
            Cerrar
          </Button>
        }
      ></Toolbar>
      {children}
    </>
  )
}

const mapStateToProps = ({ current }) => {
  return { current }
}

const mapDispatchToProps = dispatch => {
  return { fetch_logout: val => dispatch(fetch_logout_request(val)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithToken)
