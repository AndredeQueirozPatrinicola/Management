import axios from 'axios'
import baseURL from './baseURL'

export default async function loginUser( {username, password} ){
	let res = await axios.post(`${baseURL}/api/auth/login/`, {
		username: username, 
		password: password
	})
    return res.data
}