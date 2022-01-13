import { useParams } from "react-router"
import { useState, useEffect } from "react"
import axios from "axios"
import apiUtils from "../utils/apiUtils"


const SpeakerContent = () => {


    const [talkBySpeaker, setTalkBySpeaker] = useState([]);

    //This is the id used in the useEffect below
    const id = parseInt(useParams().id)
    
    const URL = apiUtils.getUrl()
    
    useEffect(() => {
        const getTalkBySpeaker = async () => {
            const response = await axios.get(URL + "/talk/byspeaker" + id)
            setTalkBySpeaker(response.data.talks)
        }
        getTalkBySpeaker()
    }, [URL,id]);
    

    return (
        <div>
            <h1>Welcome</h1>




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
          {talkBySpeaker.map((tbs) => <tr key={tbs.id}><td>{tbs.id}</td>
          <td>{tbs.topic}</td>
          <td>{tbs.duration}</td>
          <td>{tbs.propsList}</td>
          <td>{tbs.conference.id}</td>
          </tr>)}
        </tbody>
      </table>

        </div>
    )
}

export default SpeakerContent