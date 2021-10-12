import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

export function handleResponse(thunk, expectedActions, ...params) {
    const store = mockStore({});
    return store.dispatch(thunk(...params)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(expectedActions.length);
        const expectedActionsTypes = expectedActions.map(({type}) => type);
        actions.forEach((action, index) => {
            const {payload} = expectedActions[index];
            expect(expectedActionsTypes).toContain(action.type);
            expect(action.payload).toEqual(payload);
        });
    });
}