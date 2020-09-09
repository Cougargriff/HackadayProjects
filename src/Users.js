const getUserGen = () => {
  /*
    Closure over this map serves as a cache to remember
    which project pages we have visited.
  */
  userList = {};

  const getUser = async (fetch, id) => {
    const url_prefix = process.env.API_URL;
    const key = process.env.API_KEY;
    const url = `${url_prefix}users/${id}?api_key=${key}`;
    var res = {};
    if (userList[id] == undefined) {
      res = await fetch(url).then((res) => res.json());
      userList[res.id] = res;
      res = res;
    } else {
      res = userList[id];
    }
    return res;
  };
  return getUser;
};

module.exports = { getUserGen };
