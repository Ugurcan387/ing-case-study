import { USER_ACTIONS } from "../../src/store/actionsTypes";

import { deepCopy, createUniqueString } from "../../src/utils/utils";

const update = (state, action) => {
    const newState = deepCopy(state);

    switch(action.payload.type) {
        case USER_ACTIONS.CREATE:
            newState.data.push({
                ...action.payload.value,
                id: createUniqueString()
            })
            break;
        case USER_ACTIONS.UPDATE:
            const id = action.payload.id;
            const editContentIndex = newState.data.findIndex((entry) => entry.id === id);

            if (editContentIndex >= 0) {
                newState.data[editContentIndex] = {
                    ...newState.data[editContentIndex],
                    ...action.payload.value
                };
            }
            break;
        case USER_ACTIONS.DELETE:
            const deleteId = action.payload.id;
            const deleteContentIndex = newState.data.findIndex((entry) => entry.id === deleteId);

            if (deleteContentIndex >= 0) {
                newState.data.splice(deleteContentIndex, 1);
            }
            break;
    }

    return newState;
}

export const userActions = {
    update: (payload) => {
        return (state) => {
            return update(state, {payload})
        }
    }
}