import reducer, { setTemperature, STATE } from "../../redux/SettingsReducer";

it("action creator returns correct action", () => {
  const action = { type: "SET_TEMPERATURE", payload: "celcius" };
  expect(setTemperature("celcius")).toEqual(action);
});

it("reduce a new state", () => {
  const newState = reducer(STATE, setTemperature("fahrenheit"));
  expect(newState.temperature).toBe("fahrenheit");
});
