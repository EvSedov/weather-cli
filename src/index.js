import fs from 'node:fs/promises';

const isFileExists = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (e) {
    return false;
  }
};

const getWeatherData = async (lat, lon, mode) => {
  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  const params = new URLSearchParams({
    lat,
    lon,
    appid: process.env.API_KEY ?? '',
    mode,
  });
  url.search = params.toString();

  const response = await fetch(url);
  return response.text();
};

const getWeatherCity = async (city, mode) => {
  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  const params = new URLSearchParams({
    q: city,
    appid: process.env.API_KEY ?? '',
    mode,
  });

  url.search = params.toString();

  const response = await fetch(url);
  return response.text();
};

export default async (options) => {
  const {
    lat, lon, city, mode, output, force,
  } = options;

  const weather = (city)
    ? await getWeatherCity(city, mode)
    : await getWeatherData(lat, lon, mode);

  if (!output) {
    // eslint-disable-next-line no-console
    console.log(weather);

    return;
  }

  if (await isFileExists(output) && force) {
    await fs.writeFile(output, weather);

    return;
  }

  if (await isFileExists(output)) {
    throw new Error(`File ${output} already exists`);
  }

  await fs.writeFile(output, weather);
};
