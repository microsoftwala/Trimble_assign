import axios from 'axios';

export const getChennaiWeather = async (lat, lon) => {
  const response = await axios.get(`http://localhost:5000/api/weather/weather`, {
    params: { lat, lon }
  });
  return response.data;
};