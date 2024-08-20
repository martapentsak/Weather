export const getConditionFromWeatherCode= (condition : number) => {

    const cloudy = [1, 2, 3]
    const fog = [45, 48]
    const drizzle = [51, 53, 55]
    const rain = [56, 57, 61, 63, 65, 66, 67, 80, 81, 82]
    const snow = [71, 73, 75, 77]
    const thunderstorm = [95, 96, 99]





    if (condition === 0) {
      return "clear";
    } else if (rain.includes(condition)) {
      return "rainy";
    } else if (cloudy.includes(condition)) {
      return "cloudly";
    } else if (fog.includes(condition)) {
      return "fog";
    } else if (drizzle.includes(condition)) {
      return "rainy";
    } else if ( thunderstorm.includes(condition)) {
      return "thunderstorm";
    } else if (snow.includes(condition)) {
      return "snow";
    }
}