const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const API = 'https://rickandmortyapi.com/api/character/'
const XHttps = new XMLHttpRequest()

const fetchData = (url_api, callback) => {
  XHttps.onreadystatechange = (event) => {
    if (XHttps.readyState === 4) {
      if (XHttps.status == 200) return callback(null, XHttps.responseText)
      else return callback(url_api)
    }
  }
  XHttps.open('GET', url_api, false)
  XHttps.send()
}

fetchData(
  API, 
  (error, data1) => {
    if (error) return console.error(`Error 1: ${error}`);
    data1 = JSON.parse(data1)

    fetchData(
      `${API}${data1.results[0].id}`, 
      (error, data2) => {
        if (error) return console.error(`Error 3: ${error}`)
        data2 = JSON.parse(data2)
        
        fetchData(
          data2.origin.url, 
          (error3, data3) => {
            if (error3) return console.error(`Error 3: ${error}`)
            data3 = JSON.parse(data3)
            console.log(`Personajes: ${data1.info.count}`)
            console.log(`Primer Personaje: ${data2.name}`)
            console.log(`Dimensión: ${data3.dimension}`)
          }
        )
      }
    )
  }
)