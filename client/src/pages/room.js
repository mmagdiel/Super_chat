import React, { useState } from "react"
import WithToken from "../hocs/withToken"
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  Grid,
  Cell,
  TextField,
  Button,
} from "react-md"
import { BrowserView, MobileView } from "react-device-detect"
import { connect } from "react-redux"
import { socket_message } from "../redux/actions"

function Room({ current, usernames, messages, socket_msg }) {
  const [message, setMessage] = useState(""),
    [isSubmit, setIsSubmit] = useState(true),
    [isError, setIsError] = useState(false),
    //    [isFetch, setIsFetch] = useState(false),
    handleInput = val => {
      setMessage(val)
      val ? setIsSubmit(false) : setIsSubmit(true)
      val === "" ? setIsError(true) : setIsError(false)
    },
    handleSubmit = () => {
      const { user } = current
      socket_msg({ message, user })
    }
  return (
    <WithToken>
      <Grid>
        <Cell size={3}>
          <DataTable plain>
            <TableHeader>
              <TableRow>
                <TableColumn>Conectados</TableColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usernames.map((username, i) => (
                <TableRow key={i + "_user"}>
                  <TableColumn>{username}</TableColumn>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
        </Cell>
        <Cell size={9}>
          <DataTable plain>
            <TableHeader>
              <TableRow>
                <TableColumn>Mesajes</TableColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message, i) => (
                <TableRow key={i + "_msg"}>
                  <TableColumn>{message.message}</TableColumn>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
        </Cell>
      </Grid>

      <BrowserView>
        <Grid>
          <Cell
            size={11}
            style={{
              position: "absolute",
              bottom: 0,
              left: "110px",
            }}
          >
            <TextField
              label="Alias"
              value={message}
              error={isError}
              placeholder="Juanma"
              lineDirection="center"
              onChange={handleInput}
              id="floating-center-title"
            />
          </Cell>
          <Cell
            size={1}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
            }}
          >
            <Button raised primary disabled={isSubmit} onClick={handleSubmit}>
              Envia
            </Button>
          </Cell>
        </Grid>
      </BrowserView>
      <MobileView>
        <Grid>
          <Cell
            size={2}
            style={{
              position: "absolute",
              bottom: 0,
              left: "110px",
            }}
          >
            <TextField
              label="Escriba su mensaje"
              value={message}
              error={isError}
              placeholder="Juanma"
              lineDirection="center"
              onChange={handleInput}
              id="floating-center-title"
            />
          </Cell>
          <Cell
            size={1}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
            }}
          >
            <Button raised primary disabled={isSubmit} onClick={handleSubmit}>
              Envia
            </Button>
          </Cell>
        </Grid>
      </MobileView>
    </WithToken>
  )
}

const mapStateToProps = ({ current, usernames, messages }) => {
  return { current, usernames, messages }
}

const mapDispatchToProps = dispatch => {
  return { socket_msg: val => dispatch(socket_message(val)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)
