import produce from "immer";

export const handleActions = (actionsMap: object, defaultState: unknown) => (
  state = defaultState,
  { type, payload }: Action
) =>
  produce(state, draft => {
    const action = actionsMap[type];
    action && action(draft, payload);
  });
