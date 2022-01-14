import axios from "axios";
const URL = 'http://localhost:8080/ExamBackend_war_exploded/api'
//const URL = 'https://januscphb.dk/tomcat/Exam/api';

const apiUtils = () => {

    const getUrl = () => {
        return URL;
    }

    const getAuthAxios = () => {
        const authAxios = axios.create({
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
            }
        })
        return authAxios
    }

    return {
        getUrl,
        getAuthAxios
    }
}

export default apiUtils();