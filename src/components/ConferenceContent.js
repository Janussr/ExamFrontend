import { useParams } from "react-router"
import { useState, useEffect } from "react"
import axios from "axios"
import apiUtils from "../utils/apiUtils"

const ConferenceContent = () => {
    const [talks, setTalks] = useState([]);

//This is the id used in the useEffect below
const id = parseInt(useParams().id)

const URL = apiUtils.getUrl()

useEffect(() => {
    const getTalks = async () => {
        const response = await axios.get(URL + "/talk/" + id)
        setTalks(response.data.talks)
    }
    getTalks()
}, [URL,id]);


    return (

        <div>
            <h1>Welcome here you can see talks in this conference with the ID: {id}</h1>

            <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Topic</th>
            <th>Duration</th>
            <th>Props</th>
            <th>Conference ID</th>
          </tr>
        </thead>
        <tbody>
          {talks.map((talk) => <tr key={talk.id}><td>{talk.id}</td><td>{talk.topic}</td>
          <td>{talk.duration}</td><td>{talk.propsList}</td>
          <td>{talk.conference.id}</td>
          </tr>)}
        </tbody>
      </table>
        </div>
    )
}

export default ConferenceContent