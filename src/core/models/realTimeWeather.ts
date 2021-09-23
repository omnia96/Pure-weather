export default class RealTimeWeather {
    current = {};
    weather = {};
    wind = {};
    constructor(
        public temperature = {current: 0},
    ) {
    }
}
