import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  contacts: [],
  contact: {},
  searchTerm: "",
  frequent: [],
  favorite: [],
};

const existedFavorite = Cookies.get("favorite");

if (existedFavorite) {
  initialState.favorite = JSON.parse(existedFavorite);
}

const existedFrequent = Cookies.get("frequent");
if (existedFrequent) {
  initialState.frequent = JSON.parse(existedFrequent);
}

export const contactSlice = createSlice({
  name: "contactSlice",
  initialState,
  reducers: {
    getContacts: (state, { payload }) => {
      if (payload) {
        state.contacts = payload?.map((item) => {
          return { ...item, fav: false };
        });

        // Cookies.set("contacts", JSON.stringify(state.contacts));
      }
    },
    getSingleContact: (state, { payload }) => {
      (state.contact = payload),
        Cookies.set("contact", JSON.stringify(state.contact));
    },
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
    getFrequent: (state, { payload }) => {
      const isExisted = state.frequent.find((item) => item.id === payload.id);
      if (isExisted) {
        return state;
      }
      state.frequent.push(payload);
      Cookies.set("frequent", JSON.stringify(state.frequent));
    },
    removeFrequent: (state, { payload }) => {
      state.frequent = state.frequent.filter((item) => item.id != payload);
      Cookies.set("frequent", JSON.stringify(state.frequent));
    },
    removeAllFrequent: (state) => {
      (state.frequent = []),
        Cookies.set("frequent", JSON.stringify(state.frequent));
    },
    toggleFav: (state, { payload }) => {
      const isExisted = state.favorite.find((item) => item.id === payload.id);
      if (isExisted) {
        state.favorite = state.favorite.filter(item => item.id !== isExisted.id)
      }else {
        state.favorite.push(payload)
      }
        Cookies.set("favorite", JSON.stringify(state.favorite))

    },
    removeAllFav: (state) => {
      (state.favorite = []),
        Cookies.set("favorite", JSON.stringify(state.favorite));
    },
    // toggleFav: (state, { payload }) => {
    //   state.contacts = state.contacts.map((item) => {
    //     if (item.id == payload.id) {
    //       item.fav = !item.fav;
    //     }

    //     return item;
    //   });
    //   Cookies.set("contacts", JSON.stringify(state.contacts));
    // },
  },
});

export const {
  getContacts,
  getSingleContact,
  setSearchTerm,
  getFrequent,
  removeFrequent,
  removeAllFrequent,
  toggleFav,
  removeAllFav
} = contactSlice.actions;
export default contactSlice.reducer;
