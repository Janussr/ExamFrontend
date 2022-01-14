import { useState, useEffect } from "react"
import apiUtils from "../utils/apiUtils"
import axios from "axios"

const Talk = () => {
    const URL = apiUtils.getUrl()

    const [talks, setTalks] = useState([]);
    const [createTalk, setCreateTalk] = useState({ topic: "", duration: "", propsList: "", conference: {id: 0} });


    //Used to create createTalk
    const handleInput = (event) => {
        setCreateTalk({ ...createTalk, [event.target.id]: event.target.value })
    }


    useEffect(() => {
        const getTalks = async () => {
            const response = await apiUtils.getAuthAxios().get(URL + '/talk/all')
            setTalks(response.data.talks)
        }
        getTalks()
    }, [URL]);

    const deletedata = async (event) => {
        const talkId = event.target.id
        await axios.delete(URL + '/talk/' + talkId)

        //Fetch again in the function in order to re render the website(so it doesnt spam in network)
        const response = await apiUtils.getAuthAxios().get(URL + '/talk/all')
        setTalks(response.data.talks)
    }

    const createData = async () => {
        await axios.post(URL + "/talk/create", {
            topic: createTalk.topic,
            duration: createTalk.duration,
            propsList: createTalk.propsList,
         conference: { id: createTalk.id }
       })

       //Fetch again in the function in order to re render the website(so it doesnt spam in network)
      const response = await apiUtils.getAuthAxios().get(URL + '/talk/all')
      setTalks(response.data.talks)
    }

    return (



        <div>
            <h1>Welcome to ADMIN  TALK SITE</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>topic</th>
                        <th>duration</th>
                        <th>propsList</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {talks.map((t) => (<tr key={t.id}>
                        <td>{t.id}</td>
                        <td>{t.topic}</td>
                        <td>{t.duration}</td>
                        <td>{t.propsList}</td>
                        <td><button className="btn btn-danger" id={t.id} onClick={deletedata}>Delete</button></td>
                    </tr>))}
                </tbody>

               
            </table>

            <div className="center">
                <form onChange={handleInput}>
                    <input placeholder="topic" id="topic" />
                    <input placeholder="duration" id="duration" />
                    <input placeholder="propsList" id="propsList" />
                    <input  id="id" placeholder="Enter conference ID" type="text"></input>
                </form>   
                <button className="btn btn-success" onClick={createData}>Create</button>
            </div>

        </div>
    )
}
export default Talk