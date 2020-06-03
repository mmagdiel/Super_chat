import React, { useState } from "react"
import { CardText, TextField, CardActions, Button } from "react-md"

import axios from "axios"
import { navigate } from "gatsby"
import { connect } from "react-redux"
import { set_username } from "../redux/actions"

function Index({ set_user }) {
  const [username, setUsername] = useState(""),
    [forSubmit, setForSubmit] = useState(true),
    [forError, setForError] = useState(false),
    handleInput = val => {
      setUsername(val)
      val ? setForSubmit(false) : setForSubmit(true)
      val == "" ? setForError(true) : setForError(false)
    },
    set_u = val => {
      set_user(val)
    },
    handleSubmit = () => {
      axios
        .post("http://localhost:8888/login", {
          username: username,
        })
        .then(response => {
          localStorage.setItem("token", response.data[0].token)
          localStorage.setItem("user", response.data[0].user)
          set_u(response.data[0].user)
          navigate("/room")
        })
        .catch(error => {
          alert(error)
        })
    }
  return (
    <>
      <CardText>
        <TextField
          label="Alias"
          value={username}
          error={forError}
          placeholder="Juanma"
          lineDirection="center"
          onChange={handleInput}
          id="floating-center-title"
        />
      </CardText>
      <CardActions stacked>
        <Button raised primary disabled={forSubmit} onClick={handleSubmit}>
          Envia
        </Button>
      </CardActions>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return { set_user: val => dispatch(set_username(val)) }
}

export default connect(null, mapDispatchToProps)(Index)
