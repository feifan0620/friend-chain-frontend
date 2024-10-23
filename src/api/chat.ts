import axios from 'axios'

export const aiChat = (userInput: string) => {
  return axios({
    method: 'get',
    url: `http://localhost:8108/ai?userInput=${userInput}`
  })
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error
    })
}
