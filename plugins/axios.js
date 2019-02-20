import axios from 'axios'

export default axios.create({
  baseURL: 'https://say.kmeo.cl'
})


// The server-side needs a full url to work
/*if (process.server) {
	axios.default.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
}*/
