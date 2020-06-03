import React, { useState } from "react"
import { CardText, TextField, CardActions, Button } from "react-md"

import { connect } from "react-redux"
import { fetch_login_request } from "../redux/actions"

function Index({ current, fetch_login }) {
  const [username, setUsername] = useState(""),
    [isSubmit, setIsSubmit] = useState(true),
    [isError, setIsError] = useState(false),
    [isFetch, setIsFetch] = useState(false),
    handleInput = val => {
      setUsername(val)
      val ? setIsSubmit(false) : setIsSubmit(true)
      val === "" ? setIsError(true) : setIsError(false)
    },
    handleSubmit = () => {
      fetch_login(username)
      setIsFetch(true)
    }
  return (
    <>
      <CardText className="md-text--error">
        <TextField
          label="Alias"
          value={username}
          error={isError}
          placeholder="Juanma"
          lineDirection="center"
          onChange={handleInput}
          id="floating-center-title"
        />
        {isFetch && current.status !== 200
          ? "Hubo un error en el servidor"
          : ""}
      </CardText>
      <CardActions stacked>
        <Button raised primary disabled={isSubmit} onClick={handleSubmit}>
          Envia
        </Button>
      </CardActions>
    </>
  )
}

const mapStateToProps = ({ current }) => {
  return { current }
}

const mapDispatchToProps = dispatch => {
  return { fetch_login: val => dispatch(fetch_login_request(val)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
