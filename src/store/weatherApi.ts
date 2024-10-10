import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WeatherResponse } from '../types/weather';

const WEATHER_API_KEY = 'ad37acfa26824bc4b87104254241010';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.weatherapi.com/v1',
  }),
  endpoints: (builder) => ({
    getWeather: builder.query<WeatherResponse, { location: string | null; days: number }>({
      query: ({ location, days }) =>
        `forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=${days}`,
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;
