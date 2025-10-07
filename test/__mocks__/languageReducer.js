
import { LANGUAGE_ACTIONS } from "../../src/store/actionsTypes";

import { deepCopy } from "../../src/utils/utils";

const update = (state, action) => {
    let newState = deepCopy(state);

    switch(action.payload.type) {
        case LANGUAGE_ACTIONS.CHANGE:
            return {
                ...newState,
                LanguageReducer: {
                    language: action.payload.value
                }
            };
    }

    return newState
}

export const languageActions = {
    update: (payload) => {
        return (state) => {
            return update(state, {payload})
        }
    }
}