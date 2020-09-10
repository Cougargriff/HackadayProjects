const { __esModule } = require("node-fetch")


const findTagGen = () => {
  seen = {}

  return async (fetch, tag) => {
    const url_prefix = process.env.API_URL
    const key = process.env.API_KEY
    const url = `${url_prefix}search/projects?api_key=${key}&search_term=${tag}&per_page=20`
  
    const res = await fetch(url).then(res => res.json())
    
    return res.total > 0 ? res.projects : []
   
  }
}

module.exports = { findTagGen }
