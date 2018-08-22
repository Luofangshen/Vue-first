import axios from 'axios'

export default function (url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (method === 'GET') {
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr) {
        dataStr = dataStr.slice(0, -1)
        url = url + '?' + dataStr
      }
      promise = axios.get(url)
    } else if (method === 'POST') {
      promise = axios.post(url, data)
    }
    promise.then(res => resolve(res.data))
      .catch(error => reject(error))
  })
}
