const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const XHttps = new XMLHttpRequest()

const API = 'https://rickandmortyapi.com/api/character/'
const RESULTS_NUMB = 0

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    XHttps.onreadystatechange = (event) => {
      if (XHttps.readyState === 4) {
        if (XHttps.status == 200) resolve(JSON.parse(XHttps.responseText))
        else reject(`Error URL: ${url_api}`)
      }
    }
    XHttps.open('GET', url_api, false)
    XHttps.send()
  })
}

fetchData(API)
.then(r => {
  console.info(`Personajes: ${r.info.count}`)
  return fetchData(`${API}${r.results[RESULTS_NUMB].id}`)
})
.then(r => {
  console.info(`Personaje No. ${r.id}: ${r.name}`)
  return fetchData(r.origin.url)
})
.then(r => {console.info(`Dimensión: ${r.dimension}`)})
.catch(e => {console.error(e)})


// +++++++++++++++++++++++++++++
// ++   Solución del paso 2   ++
/* 
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const XHttps = new XMLHttpRequest()

const API = 'https://rickandmortyapi.com/api/character/'
const RESULTS_NUMB = 0

const fetchData = (url_api, callback) => {
  XHttps.onreadystatechange = (event) => {
    if (XHttps.readyState === 4) {
      if (XHttps.status == 200) {
        return callback(null, JSON.parse(XHttps.responseText))
      }
      else {
        return callback(url_api)
      }
    }
  }
  XHttps.open('GET', url_api, false)
  XHttps.send()
}

fetchData(
  API, 
  (error, dataAll) => {
    if (error) return console.error(`Error 1: ${error}`)

    fetchData(
      `${API}${dataAll.results[RESULTS_NUMB].id}`, 
      (error, character) => {
        if (error) return console.error(`Error 2: ${error}`)

        fetchData(
          character.origin.url, 
          (error, characterLocation) => {
            if (error) return console.error(`Error 3: ${error}`)

            console.log(
              `Personajes: ${dataAll.info.count}\n` + 
              `Personaje ${character.id}: ${character.name}\n` +
              `Dimensión: ${characterLocation.dimension}\n`)
          }
        )
      }
    )
  }
)
*/
