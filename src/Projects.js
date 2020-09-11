
const getPageGen = () => {

  /*
    Closure over this map serves as a cache to remember
    which project pages we have visited.

    The cache will update items that are older than 30
    min.
  */
  var projectList = new Map()
  const THIRTY_MIN = 1800000

  return async (fetch, n) => {
    const url_prefix = process.env.API_URL
    const key = process.env.API_KEY
    const url = `${url_prefix}projects?page=${n}&per_page=12&api_key=${key}`
    var res = {}
    if (!projectList.has(n)) {
      res = (await fetch(url).then(res => res.json()))
      projectList.set(res.page, {
        projects: res.projects,
        lastUpdated: Date.now()
      })
      res = res.projects
    } else {
      var rn = Date.now()
      /* Check time to see if we should update our cached page */
      if (res.lastUpdated < (rn - THIRTY_MIN)) { 
        res = (await fetch(url).then(res => res.json()))
        res = res.projects
        projectList.set(n, {
          projects: res,
          lastUpdated: Date.now()
        })
      } else {
        res = projectList.get(n).projects
      }
    }
    return res
  }
}

const getProjectGen = () => {

  var projectMap = new Map()
  const THIRTY_MIN = 1800000

  return async (fetch, id) => {
    const url_prefix = process.env.API_URL
    const key = process.env.API_KEY
    const url = `${url_prefix}projects/${id}?api_key=${key}`

    var res = {}
    if(projectMap.has(id)) {
      res = projectMap.get(id)
      const rn = Date.now()
      if (res.lastUpdated < (rn - THIRTY_MIN)) { 
        res = await fetch(url).then(res => res.json())
        projectMap.set(id, {
          prj: res,
          lastUpdated: Date.now()
        })
      } else {
        res = res.prj
      }
    } else {
      res = await fetch(url).then(res => res.json())
      projectMap.set(id, {
        prj: res,
        lastUpdated: Date.now()
      })
    }
    return res
  }
}

module.exports = { getPageGen, getProjectGen }