
export const makeTestStore = (initialState = {
  LanguageReducer: {
    language: 'en'
  },
  UserReducer: {
    data: []
  }
}) => {
  let state = initialState;
  const listeners = new Set();
  return {
    getState: () => state,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    dispatch(next) {
      const content = next(state)
      state = {...state, ...content};
      listeners.forEach(l => l());

      return next;
    }
  };
};

export const store = makeTestStore()