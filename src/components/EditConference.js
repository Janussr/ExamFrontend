import { useParams } from "react-router"
import { useState, useEffect } from "react"
import axios from "axios"
import apiUtils from "../utils/apiUtils"

const EditConference = () => {
 const URL = apiUtils.getUrl()

 const [conferences, setConferences] = useState([]);
 const [con, setCon] = useState({ name: "", location: "", capacity: "", date: "", time: ""});
    

 useEffect(() => {
    const getConferences = async () => {
        const response = await apiUtils.getAuthAxios().get(URL + '/conference/all')
        setConferences(response.data.conferenceDTOs)
    }
    getConferences()
}, [URL]);
 
//This is the id used in the useEffect below
const id = parseInt(useParams().id) 

 const editConference = async () => {
    await axios.put(URL + '/conference/' + id, {
        name: con.name,
        location: con.location,
        capacity: con.capacity,
        date: con.date,
        time: con.time,
    })
 //Fetch again in the function in order to re render the website(so it doesnt spam in network)
 const response = await apiUtils.getAuthAxios().get(URL + '/conference/all')
 setCon(response.data.conferenceDTOs)
}
 
const handleInput = (event) => {
    setCon({ ...con, [event.target.id]: event.target.value })
}

 
 return (
        <div>
            <h1>Welcome, here you edit the conference with the ID: {id}</h1>

            <table className="table">
            <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>location</th>
                        <th>capacity</th>
                        <th>date</th>
                        <th>time</th>
                    </tr>
                </thead>
        <tbody>
        {conferences.map((c) => (<tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.name}</td>
                        <td>{c.location}</td>
                        <td>{c.capacity}</td>
                        <td>{c.date}</td>
                        <td>{c.time}</td>
                    </tr>))}
        </tbody>
      </table>
      
      <form onChange={handleInput} >
                <input  id="name" defaultValue={con.name} placeholder="Enter name" type="text"></input>
                <input  id="location" defaultValue={con.location} placeholder="Enter location" type="text"></input>
                <input  id="capacity" defaultValue={con.capacity} placeholder="Enter capacity" type="text"></input>
                <input  id="date" defaultValue={con.date} placeholder="Enter date" type="text"></input>
                <input  id="time" defaultValue={con.time} placeholder="Enter time" type="text"></input>
            </form>
            <button onClick={editConference} className="btn btn-success addButton">Edit</button>



        </div>
    )
}

export default EditConference