import { store } from "../app/store";
import reducer, {
    updateCentreCoordinates,
    updateNorthWestCoordinates,
    updateNorthEastCoordinates,
    updateSouthEastCoordinates,
} from "./GeoMapSlice";

describe("Testing the thunks", () => {
    it("tests that the default values for the map on open are as expected", () => {
        const state = store.getState().geoMap;
        const centreCoordinates = state.centreCoordinates;
        expect(centreCoordinates?.lat).toBe(52.52437);
        expect(centreCoordinates?.lng).toBe(13.41053);
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
        // now lets check that nothing else was effected
        updated_state.centreCoordinates.lat = 0;
        updated_state.centreCoordinates.lng = 0;
        state.centreCoordinates.lat = 0;
        state.centreCoordinates.lng = 0;

        expect(state).toBe(updated_state);
    });
});

/*
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
