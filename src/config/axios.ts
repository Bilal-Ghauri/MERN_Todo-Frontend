import axios from 'axios'
import Cookies from 'js-cookie'


export const baseURL = 'http://localhost:5000/'

const api = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
})

api.interceptors.request.use(
	(config: any) => {
		const token = Cookies.get('todoToken')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

export default api