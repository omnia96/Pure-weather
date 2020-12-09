import {Storage} from '@/core/service/storage/storage';

const starCityList: Storage<Array<{citycode: string, cityname: any}>> = {
  key: 'StarCityList',
  value: [],
};
const realTimeWeather = (citycode: string, value?:{create_time: string, data: any}): Storage<{create_time: string, data: any}> => {
  return {
    key: `RealTimeWeather-${citycode}`,
    value: value,
  };
};
const oneWeekWeather = (citycode: string, value?: {create_time: string, data: any}): Storage<{create_time: string, data: any}> => {
  return {
    key: `OneWeekWeather-${citycode}`,
    value: value,
  };
};
const searchHistory: Storage<any> = {
  key: 'SearchHistory',
  value: [],
};
const monthWeatheradta = (citycode :string, value?: {create_time:string, data:any})=>{
  return {
    key: 'monthWeatheradta' + citycode,
    value: value,
  };
};
export const storages = {
  starCityList,
  realTimeWeather,
  oneWeekWeather,
  searchHistory,
  monthWeatheradta,
};
