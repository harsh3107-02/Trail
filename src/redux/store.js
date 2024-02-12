import { createStore } from "redux";

const initialState = {
  searchQuery: "",
  searchResults: [],
  cart:[],
};

const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

export const setSearchResults = (results) => ({
  type: SET_SEARCH_RESULTS,
  payload: results,
});

export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
});

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (item) => ({
  type: REMOVE_FROM_CART,
  payload: item,
});

const searchReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    case CLEAR_SEARCH_RESULTS:
      return { ...state, searchResults: [] };
    case ADD_TO_CART:
      const itemToAdd = action.payload;
      if (!state.cart.includes(itemToAdd)) {
        const newCartAdd = [...state.cart, itemToAdd];
        localStorage.setItem("CartItems", JSON.stringify(newCartAdd));
        return { ...state, cart: newCartAdd };
      }
      return state;

    case REMOVE_FROM_CART:
      const itemToRemove = action.payload;
      const newCartRemove = state.cart.filter((item) => item !== itemToRemove);
      localStorage.setItem("CartItems", JSON.stringify(newCartRemove));
      return {
        ...state,
        cart: newCartRemove,
      };

    default:
      return state;
  }
};

export const store = createStore(searchReducer);
export default searchReducer;
