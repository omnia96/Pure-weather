import {Storage} from '@/core/models/storage';
import {StorageValue} from '@/core/models/storageValue';

export const starCitiesStorage: Storage<Array<any>> = {
  key: 'StarCityList',
  value: new StorageValue<Array<any>>([]),
};
export const realTimeWeatherStorage = (cityCode: string, value?: any): Storage<any> => {
  return {
    key: `RealTimeWeather-${cityCode}`,
    value: new StorageValue<any>(value, 3600),
  };
};
export const weekWeatherStorage = (cityCode: string, value?: any): Storage<any> => {
  return {
    key: `OneWeekWeather-${cityCode}`,
    value: new StorageValue<any>(value, 28800),
  };
};
export const searchHistory: Storage<any> = {
  key: 'SearchHistory',
  value: new StorageValue<any>([]),
};
export const monthWeatherStorage = (cityCode :string, value?: any)=>{
  return {
    key: 'monthWeather' + cityCode,
    value: new StorageValue<any>(value, 43200),
  };
};
