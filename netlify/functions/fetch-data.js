exports.handler = async function (event) {
  const apiKey = process.env.API_KEY;
  const title = event.queryStringParameters.title;

  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`
  );
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
