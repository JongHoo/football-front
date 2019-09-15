import axios from 'axios'

const SERVER_URL = process.env.NODE_ENV === 'local' ? 'http://localhost:3000' : 'https://uqy00myv2i.execute-api.ap-northeast-2.amazonaws.com/dev'
const axiosInstance = axios.create({
  baseURL: SERVER_URL
})

export default axiosInstance
