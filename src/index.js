const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const XHttps = new XMLHttpRequest()

const API = 'https://rickandmortyapi.com/api/character/'
const RESULTS_NUMB = 0

let respuestas = []

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
  respuestas.push(r.info.count)
  return fetchData(`${API}${r.results[RESULTS_NUMB].id}`)
})
.then(r => {
  respuestas.push([r.id, r.name])
  return fetchData(r.origin.url)
})
.then(r => {respuestas.push(r.dimension)})
.then(() => { 
  console.info(
    `Personajes: ${respuestas[0]}\n` + 
    `Personaje No. ${respuestas[1][0]}: ${respuestas[1][1]}\n` +
    `Dimensión: ${respuestas[2]}\n`
  )  
})
.catch(e => {console.error(e)})


// ++++ Solución del paso 2 ++++
// fetchData(
//   API, 
//   (error, dataAll) => {
//     if (error) return console.error(`Error 1: ${error}`)
//     fetchData(
//       `${API}${dataAll.results[RESULTS_NUMB].id}`, 
//       (error, character) => {
//         if (error) return console.error(`Error 2: ${error}`)
//         fetchData(
//           character.origin.url, 
//           (error, characterLocation) => {
//             if (error) return console.error(`Error 3: ${error}`)
//             console.log(
//               `Personajes: ${dataAll.info.count}\n` + 
//               `Personaje No. ${character.id}: ${character.name}\n` +
//               `Dimensión: ${characterLocation.dimension}\n`)
//           }
//         )
//       }
//     )
//   }
// )