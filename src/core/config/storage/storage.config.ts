import { Storage } from '@/core/service/storage/storage';

let starCityList: Storage<Array<{citycode: string, cityname: any}>> = {
    key: 'StarCityList',
    value: []
};
let realTimeWeather = (citycode: string, value?:{create_time: string, data: any}): Storage<{create_time: string, data: any}> => {
    return {
        key: `RealTimeWeather-${citycode}`,
        value: value
    }
};
let oneWeekWeather = (citycode: string, value?: {create_time: string, data: any}): Storage<{create_time: string, data: any}> => {
    return {
        key: `OneWeekWeather-${citycode}`,
        value: value
    }
};
let searchHistory: Storage<any> = {
    key: 'SearchHistory',
    value: []
};
let monthWeatheradta = (citycode :string, value?: {create_time:string, data:any})=>{
    return{
        key: 'monthWeatheradta' + citycode,
        value: value
    }
}
export let storages = {
    starCityList,
    realTimeWeather,
    oneWeekWeather,
    searchHistory,
    monthWeatheradta
};
