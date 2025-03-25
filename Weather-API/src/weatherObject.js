class Weather {
  constructor(
    address,
    time,
    tempF,
    feelslikeF,
    humidity,
    windspeed,
    description
  ) {
    this.address = address;
    this.time = time;
    this.tempF = tempF; //This temparature is in fahrenheit
    this.feelslikeF = feelslikeF; //This temparature is in fahrenheit
    this.humidity = humidity; //This must be a %
    this.windspeed = windspeed; //This is in mile/h it seems
    this.description = description;
  }
  getCelsius() {
    return {
      tempC: (((this.tempF - 32) * 5) / 9).toFixed(2),
      feelslikeC: (((this.feelslikeF - 32) * 5) / 9).toFixed(2),
    };
  }
}

export { Weather };
