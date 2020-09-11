const findTagGen = () => {
  
  var seenTags = new Map()
  const THIRTY_MIN = 1800000

  return async (fetch, tag) => {
    const url_prefix = process.env.API_URL
    const key = process.env.API_KEY
    const url = `${url_prefix}search/projects?api_key=${key}&search_term=${tag}&per_page=5`

    var res = {}
    if(seenTags.has(tag))
    {
      const rn = Date.now()
      const tagP = seenTags.get(tag)
      if (tagP.lastUpdated < (rn - THIRTY_MIN)) {
        res = await fetch(url).then(res => res.json())
        res = {
          lastUpdated: Date.now(),
          tagged: res.projects,
          total: res.total
        }
      seenTags.set(tag, res)
      } else {
        res = seenTags.get(tag)
      }
    } else {
      res = await fetch(url).then(res => res.json())
      res = {
        lastUpdated: Date.now(),
        tagged: res.projects,
        total: res.total
      }
      seenTags.set(tag, res)
    }
    return res.total > 0 ? res.tagged : []
  }
}

module.exports = { findTagGen }
