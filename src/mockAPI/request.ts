import axios from 'axios'
const BASE_URL = "http://localhost:3001/dtrecruit/v1/"

export const mockAPI = async (end_point: string, method = "POST") => {
    try {
        console.log(`${BASE_URL}${end_point}`)
        const headers = {
            'authorization': 'Bearer 9190beab5ede8d055ba190652bf2bb4754422d898f376446aa92ae4f1b1af215', // Optional, if API requires authentication
        };
        let resp = ""
        if (method == "POST") {

            resp = await axios.post(`${BASE_URL}${end_point}`, {}, { headers })
            console.log(resp)
        }
        else if (method == "GET") {
            resp = await axios.get(`${BASE_URL}${end_point}`)

        }
        return true
    } catch (error) {
        // console.log(error)
    }

}