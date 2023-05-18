import Axios from 'axios'


const Axiosinstance=Axios.create({
    baseURL:"http://localhost:4000/",
    headers: {
        "Content-Type": "application/json",
    },
})

export default Axiosinstance;