import { useState, useEffect } from "react"
import apiUtils from "../utils/apiUtils"
import axios from "axios";

const Conference = () => {

    const URL = apiUtils.getUrl()

    const [conferences, setConferences] = useState([]);

    useEffect(() => {
        const getConferences = async () => {
            const response = await apiUtils.getAuthAxios().get(URL + '/conference/all')
            setConferences(response.data.conferences)
        }
        getConferences()
    }, [URL]);
    
    return (
        <div>
            <h1>Welcome TO CONFERENCE SITE</h1>


            <table className="table table-light">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>capacity</th>
                        <th>Date</th>
                        <th>Time the conference starts</th>
                    </tr>
                </thead>

               <tbody>
                 


                </tbody>
               
            </table>


        </div>
    )
}

export default Conference