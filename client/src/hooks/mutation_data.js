import { useState, useEffect } from "react"
import axios from "axios"

function mutation_data(url, body) {
  const [data, setData] = useState({})

  useEffect(() => {
    axios
      .post(url, body)
      .then(response => setData(response.data[0]))
      .catch(error => alert(error))
  }, [])

  return data
}

export default mutation_data
