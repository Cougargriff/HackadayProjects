
const getPageGen = () => {

  /*
    Closure over this map serves as a cache to remember
    which project pages we have visited.
  */
  projectList = {}

  const getPage = async (fetch, n) => {
    const url_prefix = process.env.API_URL
    const key = process.env.API_KEY
    const url = `${url_prefix}projects?page=${n}&per_page=12&api_key=${key}`
    var res = {}
    if (projectList[n] == undefined) {
      res = (await fetch(url).then(res => res.json()))
      projectList[res.page] = res.projects
      res = res.projects
    } else {
      res = projectList[n]
    }
    return res
  }
  return getPage
}


module.exports = { getPageGen }