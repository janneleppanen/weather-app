import {
  getForecast,
  getForecastByCoords
} from "../../services/OpenWeatherMap";
import fetchMock from "fetch-mock";

const RESPONSE_GET_FORECAST = require("./getForecast.response.json");
const RESPONSE_GET_FORECAST_BY_COORDS = require("./getForecastByCoords.response.json");

describe("OpenWeatherMap API", () => {
  afterEach(function() {
    fetchMock.restore();
  });

  describe("getForecast", async () => {
    it("returns a correct response", () => {
      fetchMock.mock(
        "https://api.openweathermap.org/data/2.5/forecast?appid=undefined&q=Helsinki&mode=json",
        RESPONSE_GET_FORECAST
      );

      return getForecast("Helsinki").then(response =>
        expect(response).toEqual(RESPONSE_GET_FORECAST)
      );
    });
  });

  describe("getForecastByCoords", async () => {
    it("returns a correct response", () => {
      fetchMock.mock(
        "https://api.openweathermap.org/data/2.5/find?appid=undefined&lat=62.241&lon=25.759&cnt=10",
        RESPONSE_GET_FORECAST_BY_COORDS
      );

      return getForecastByCoords(62.241, 25.759).then(response =>
        expect(response).toEqual(RESPONSE_GET_FORECAST_BY_COORDS)
      );
    });
  });
});
