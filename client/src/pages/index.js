import React from "react"
import { Card, CardTitle, Toolbar } from "react-md"
import Registry from "../components/registry"
const style = { maxWidth: 320 }

function Index() {
  return (
    <div>
      <Toolbar colored title="Super Chat" />
      <div className="center">
        <Card style={style} className="md-block-centered">
          <CardTitle
            title="Registro"
            className="pb-0"
            subtitle="Digite un nombre de usuario"
          />
          <Registry />
        </Card>
      </div>
    </div>
  )
}

export default Index
