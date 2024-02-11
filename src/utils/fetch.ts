const API_KEY = '6ff7285342d042a4b496d178213472ea'; // Esto debe ir en una variable de entorno
const API_URL = 'https://newsapi.org/v2/everything';

export default async (urlParams?: string) => {
  try {
    const response = await fetch(
      `${API_URL}?q=bitcoin&language=en&apiKey=${API_KEY}${
        typeof urlParams !== 'undefined' && urlParams?.length > 0
          ? urlParams
          : ''
      }`,
    );
    const data = await response.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
