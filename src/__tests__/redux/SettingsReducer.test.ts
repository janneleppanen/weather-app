import reducer, {
  setTemperatureScale,
  STATE
} from "../../redux/SettingsReducer";

it("action creator returns correct action", () => {
  const action = { type: "SET_TEMPERATURE_SCALE", payload: "celcius" };
  expect(setTemperatureScale("celcius")).toEqual(action);
});

it("reduces a new state", () => {
  const newState = reducer(STATE, setTemperatureScale("fahrenheit"));
  expect(newState.temperatureScale).toBe("fahrenheit");
});
