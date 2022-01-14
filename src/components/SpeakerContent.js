import { useParams } from "react-router"
import { useState, useEffect } from "react"
import axios from "axios"
import apiUtils from "../utils/apiUtils"


const SpeakerContent = () => {
    const URL = apiUtils.getUrl()

    const [speakers, setSpeakers] = useState([]);

    const [speaker, setSpeaker] = useState({ name: "", profession: "", gender: ""});


    //This is the id used in the useEffect below
    const id = parseInt(useParams().id)
    
    
    useEffect(() => {
        const getSpeakers = async () => {
            const response = await apiUtils.getAuthAxios().get(URL + '/speaker/all')
            setSpeakers(response.data.speakers)
        }
        getSpeakers()
    }, [URL]);
    

    const editSpeaker = async () => {
            await axios.put(URL + '/speaker/' + id, {
                name: speaker.name,
                profession: speaker.profession,
                gender: speaker.gender,
            })

         //Fetch again in the function in order to re render the website(so it doesnt spam in network)
         const response = await apiUtils.getAuthAxios().get(URL + '/speaker/all')
         setSpeakers(response.data.speakers)
    }

    const handleInput = (event) => {
        setSpeaker({ ...speaker, [event.target.id]: event.target.value })
    }

    return (
        <div>
            <h1>You are editing the speaker with the ID: {id}</h1>




            <table className="table">
            <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Profession</th>
                    </tr>
                </thead>
        <tbody>
        {speakers.map((s) => (<tr key={s.id}>
                        <td>{s.id}</td>
                        <td>{s.name}</td>
                        <td>{s.profession}</td>
                        <td>{s.gender}</td>
                    </tr>))}
        </tbody>
      </table>
      <form onChange={handleInput} >
                <input  id="name" defaultValue={speaker.name} placeholder="Enter name" type="text"></input>
                <input  id="profession" defaultValue={speaker.profession} placeholder="Enter profession" type="text"></input>
                <input  id="gender" defaultValue={speaker.gender} placeholder="Enter gender" type="text"></input>
            </form>
            <button onClick={editSpeaker} className="btn btn-success addButton">Edit</button>


        </div>
    )
}

export default SpeakerContent