import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { BookType } from "@/contexts/Types";


interface ReadBookState {
  books: BookType[];
}

const initialState: ReadBookState = {
  books: loadReadBooksFromLocalStorage(),
};

const ReadBooks = createSlice({
  name: "read",
  initialState,
  reducers: {
    // =====  Add To Read =====
    addToRead: (state, action: PayloadAction<BookType>) => {
      const newBook = action.payload;
      const existingBook = state.books.find((book) => book.id === newBook.id);

      if (existingBook) {
        existingBook.quantity;
      } else {
        state.books.push({
          ...newBook,
          quantity: 1,
        });
      }
      saveReadBooksToLocalStorage(state.books);
    },

    // ====  Delete Read ====
    deleteRead: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
      saveReadBooksToLocalStorage(state.books);
    },

    // ==== Clear Read ====
    clearRead: (state) => {
      state.books = [];
      saveReadBooksToLocalStorage(state.books);
    },
  },
});

// ==== Load Read From LocalStorage ====
function loadReadBooksFromLocalStorage(): BookType[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedReadBooks = localStorage.getItem("read");
  return storedReadBooks ? JSON.parse(storedReadBooks) : [];
}

// ===== Save Read To LocalStorage ====
function saveReadBooksToLocalStorage(read: BookType[]) {
  localStorage.setItem("read", JSON.stringify(read));
}

export const ReadBooksActions = ReadBooks.actions;

export const selectReadBooks = (state: RootState) => state.read.books;

export default ReadBooks.reducer;
