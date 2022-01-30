import configureStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import reducer, {
    initialState,
    GeoMapState,
    updateCentreCoordinates,
    updateNorthWestCoordinates,
    updateNorthEastCoordinates,
    updateSouthWestCoordinates,
    updateSouthEastCoordinates,
    disableReduxInducedMapMovements,
    enableReduxInducedMapMovements,
} from "./GeoMapSlice";

const middlewares = [thunk];
interface mockStoreInterface {
    geoMap: GeoMapState;
}
const mockStore = configureStore<
    mockStoreInterface,
    ThunkDispatch<mockStoreInterface, unknown, AnyAction>
>(middlewares);

describe("Testing the reducers", () => {
    // set up a fake store for all our tests
    let store = mockStore();
    beforeEach(() => {
        const mockState: mockStoreInterface = { geoMap: initialState };

        store = mockStore(mockState);
    });
    afterEach(() => {
        store.clearActions();
    });

    it("tests that the default values for the map on open are as expected", () => {
        const state = store.getState().geoMap;
        const centreCoordinates = state.centreCoordinates;
        expect(centreCoordinates?.lat).toBe(52.52437);
        expect(centreCoordinates?.lng).toBe(13.41053);
    });

    it("tests to see if centre coordinates reducer is working as expected", () => {
        const newCoordinates = {
            lat: 0,
            lng: 0,
        };
        expect(
            reducer(initialState, {
                type: updateCentreCoordinates,
                payload: newCoordinates,
            })
        ).toEqual({
            ...initialState,
            centreCoordinates: newCoordinates,
        });
    });

    it("tests to see if north west coordinates reducer is working as expected", () => {
        const newCoordinates = {
            lat: 0,
            lng: 0,
        };
        expect(
            reducer(initialState, {
                type: updateNorthWestCoordinates,
                payload: newCoordinates,
            })
        ).toEqual({
            ...initialState,
            northWestCoordinates: newCoordinates,
        });
    });

    it("tests to see if north east coordinates reducer is working as expected", () => {
        const newCoordinates = {
            lat: 0,
            lng: 0,
        };
        expect(
            reducer(initialState, {
                type: updateNorthEastCoordinates,
                payload: newCoordinates,
            })
        ).toEqual({
            ...initialState,
            northEastCoordinates: newCoordinates,
        });
    });

    it("tests to see if south west coordinates reducer is working as expected", () => {
        const newCoordinates = {
            lat: 0,
            lng: 0,
        };
        expect(
            reducer(initialState, {
                type: updateSouthWestCoordinates,
                payload: newCoordinates,
            })
        ).toEqual({
            ...initialState,
            southWestCoordinates: newCoordinates,
        });
    });

    it("tests to see if south east coordinates reducer is working as expected", () => {
        const newCoordinates = {
            lat: 0,
            lng: 0,
        };
        expect(
            reducer(initialState, {
                type: updateSouthEastCoordinates,
                payload: newCoordinates,
            })
        ).toEqual({
            ...initialState,
            southEastCoordinates: newCoordinates,
        });
    });

    it("tests to see if disabling the map movements is working as expected", () => {
        expect(
            reducer(initialState, {
                type: disableReduxInducedMapMovements,
            })
        ).toEqual({
            ...initialState,
            canInduceMapMovements: false,
        });
    });

    it("tests to see if enabling the map movements is working as expected", () => {
        expect(
            reducer(initialState, {
                type: enableReduxInducedMapMovements,
            })
        ).toEqual({
            ...initialState,
            canInduceMapMovements: true,
        });
    });
});

/*

    // allows us to easily return reponses and/or success/fail for a thunk that calls a service
const mockServiceCreator =
    (body: unknown, succeeds = true) =>
    () =>
        new Promise((resolve, reject) => {
            setTimeout(() => (succeeds ? resolve(body) : reject(body)), 10);
        });
    it("tests updateCentreCoordinates so that it functions as expected", () => {
        const newCoordinates = {
            lat: 0,
            lng: 0,
        };
        const state = store.getState().geoMap;
        // mock dispatch event
        const response = store.dispatch(updateCentreCoordinates(newCoordinates));
        const action = { type: updateCentreCoordinates.fulfilled.type, payload: response.arg };
        const updated_state = reducer(store.getState().geoMap, action);

        const centreCoordinates = updated_state.centreCoordinates;
        // first lets check that what we wanted to update, worked successfully
        expect(centreCoordinates.lat).toBe(0);
        expect(centreCoordinates.lng).toBe(0);
        /*
        // now lets check that nothing else was effected
        const copyOfOrignalState = delete state.centreCoordinates;

        copyOfOrignalState.centreCoordinates.lat = 0;
        copyOfOrignalState.centreCoordinates.lng = 0;

        expect(copyOfOrignalState).toBe(updated_state);
        
    });
    
test('Updates a books author and title', () => {
  let state = store.getState().book;
  const unchangedBook = state.bookList.find((book) => book.id === '1');
  expect(unchangedBook?.title).toBe('1984');
  expect(unchangedBook?.author).toBe('George Orwell');

  store.dispatch(updateBook({ id: '1', title: '1985', author: 'George Bush' }));
  state = store.getState().book;
  let changeBook = state.bookList.find((book) => book.id === '1');
  expect(changeBook?.title).toBe('1985');
  expect(changeBook?.author).toBe('George Bush');

  store.dispatch(updateBook({ id: '1', title: '1984', author: 'George Orwell' }));
  state = store.getState().book;
  const backToUnchangedBook = state.bookList.find((book) => book.id === '1');

  expect(backToUnchangedBook).toEqual(unchangedBook);
});

test('Deletes a book from list with id', () => {
  let state = store.getState().book;
  const initialBookCount = state.bookList.length;

  store.dispatch(deleteBook({ id: '1' }));
  state = store.getState().book;

  expect(state.bookList.length).toBeLessThan(initialBookCount); // Checking if new length smaller than inital length, which is 3
});

test('Adds a new book', () => {
  let state = store.getState().book;
  const initialBookCount = state.bookList.length;

  store.dispatch(addNewBook({ id: '4', author: 'Tester', title: 'Testers manual' }));
  state = store.getState().book;
  const newlyAddedBook = state.bookList.find((book) => book.id === '4');
  expect(newlyAddedBook?.author).toBe('Tester');
  expect(newlyAddedBook?.title).toBe('Testers manual');
  expect(state.bookList.length).toBeGreaterThan(initialBookCount);
});

*/

/*
    it("tests updateCentreCoordinates so that it functions as expected", async () => {
        const newCoordinates = {
            lat: 0,
            lng: 0,
        };

        // first testing that the thunk execution exits successfully
        await store.dispatch(updateCentreCoordinates(newCoordinates)).then(() => {
            const actions = store.getActions();
            expect(actions[1].type).toEqual("geoMap/updateCentreCoordinates/fulfilled");
        });
        // next we need to test how the reducer handles a success message from the thunk
        const action = { type: updateCentreCoordinates.fulfilled.type, payload: newCoordinates };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            centreCoordinates: newCoordinates,
        });
        /*
        await store.dispatch(updateCentreCoordinates(newCoordinates));
        expect(store.getState().geoMap).toEqual({
            canInduceMapMovements: true,
            centreCoordinates: { lat: 0, lng: 0 },
            northWestCoordinates: { lat: 0, lng: 0 },
            northEastCoordinates: { lat: 0, lng: 0 },
            southWestCoordinates: { lat: 0, lng: 0 },
            southEastCoordinates: { lat: 0, lng: 0 },
        });
        */
//let state = store.getState().geoMap;
// mock dispatch event
//await store.dispatch(updateCentreCoordinates(newCoordinates));
//const actions = store.getActions();
//expect(fetch).toBeCalledWith("geoMap/updateCentreCoordinates");
//expect(postSpy).toBeCalledWith("geoMap/updateCentreCoordinates", newCoordinates);
// Return the promise
/*
        return store.dispatch(updateCentreCoordinates(newCoordinates)).then(() => {
            const actions = store.getActions();
            expect(actions[1].type).toEqual("geoMap/updateCentreCoordinates/fulfilled");
        });
        */
//const state = store.getState().geoMap;
//const centreCoordinates = state.centreCoordinates;
// first lets check that what we wanted to update, worked successfully
//expect(centreCoordinates.lat).toBe(0);
//const action = { type: updateCentreCoordinates.fulfilled.type, payload: response.arg };
//const updated_state = reducer(store.getState().geoMap, action);
/*
        const centreCoordinates = state.centreCoordinates;
        // first lets check that what we wanted to update, worked successfully
        expect(centreCoordinates.lat).toBe(0);
        expect(centreCoordinates.lng).toBe(0);
        */
/*
        // now lets check that nothing else was effected
        const copyOfOrignalState = delete state.centreCoordinates;

        copyOfOrignalState.centreCoordinates.lat = 0;
        copyOfOrignalState.centreCoordinates.lng = 0;

        expect(copyOfOrignalState).toBe(updated_state);
        */
//});
