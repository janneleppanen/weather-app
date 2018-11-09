import reducer, {
  getForecastSuccess,
  STATE
} from "../../redux/ForecastReducer";

const WeatherData = {
  city: {
    name: "Helsinki"
  }
};

it("sets forecast to state", () => {
  const newState = reducer(STATE, getForecastSuccess(WeatherData));
  expect(newState.weather[WeatherData.city.name]).toBe(WeatherData);
});
