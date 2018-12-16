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
  const newState = reducer(
    STATE,
    getForecastSuccess({ weather: WeatherData, name: "Helsinki" })
  );
  expect(newState.weather[WeatherData.city.name]).toBe(WeatherData);
});
