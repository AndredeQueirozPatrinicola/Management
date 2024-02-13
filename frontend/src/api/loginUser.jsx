import axios from 'axios'
import baseURL from './baseURL'

export default async function loginUser( {email, password} ){
	let res = await axios.post(`${baseURL}/api/auth/login/`, {
		email: email, 
		password: password
	})
    return res.data
}