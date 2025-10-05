import { createSlice } from "@reduxjs/toolkit";

import { LANGUAGE_ACTIONS } from "../actionsTypes";

import { deepCopy } from "../../utils/utils";
import { setLocale, getLocale } from "../../utils/locale";

const update = (state, action) => {
    const newState = deepCopy(state);

    switch(action.payload.type) {
        case LANGUAGE_ACTIONS.CHANGE:
            newState.language = action.payload.value;
            setLocale(newState.language);
    }

    return newState;
}

const {actions: languageActions, reducer: LanguageReducer} = createSlice({
    name: 'LanguageReducer',
    initialState: {
        language: getLocale()
    },
    reducers: {
        update
    }
});

export {languageActions, LanguageReducer};