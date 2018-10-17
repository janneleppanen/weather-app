import produce from "immer";

export const handleActions = (actionsMap: object, defaultState) => (
  state = defaultState,
  { type, payload }
) =>
  produce(state, draft => {
    const action = actionsMap[type];
    action && action(draft, payload);
  });
