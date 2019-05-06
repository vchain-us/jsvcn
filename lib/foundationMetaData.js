const foundationMetaData = async (hash, metahash, { apiUrl }) => {

  const metahashEndpoint = apiUrl + "/artifact/" + hash + "/" + metahash;

  const response = await fetch(metahashEndpoint, {
    method: "GET"
  });
  return await response.json();
};

export default foundationMetaData;
