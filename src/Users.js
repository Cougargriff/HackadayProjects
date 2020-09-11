const getUserGen = () => {
  /*
    Closure over this map serves as a cache to remember
    which users we have seen.
  */
  var userList = new Map();
  const THIRTY_MIN = 1800000

  return async (fetch, id) => {
    const url_prefix = process.env.API_URL;
    const key = process.env.API_KEY;
    const url = `${url_prefix}users/${id}?api_key=${key}`;
    var res = {};
    if (!userList.has(id)) {
      res = await fetch(url).then((res) => res.json());
      userList.set(id, {
        user: res,
        lastUpdated: Date.now()
        })
    } else {
      res = userList.get(id);
      const rn = Date.now()
      if (res.lastUpdated < (rn - THIRTY_MIN)) { 
        res = await fetch(url).then(res => res.json())
        userList.set(id, {
          user: res,
          lastUpdated: Date.now()
        })
      } else {
        res = res.user
      }
    }
    return res;
  };
};

module.exports = { getUserGen };
