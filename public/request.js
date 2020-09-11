const key = "432af6505ecd64f498584231da4660a7";

const requestCity = async (city) => {
  const baseURL = "https://api.openweathermap.org/data/2.5/weather";
  const query = `?q=${city}&appid=${key}`;

  //fetch data call
  const response = await fetch(baseURL + query);
  //data call
  const data = await response.json();
  return data;
};
