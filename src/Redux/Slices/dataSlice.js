import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get, update, remove, push } from "firebase/database"; // Import `push` for adding new items
import { database } from "../../firebase"; // Import the database instance

// 🔹 API Fetch using Redux Thunk
export const fetchData = createAsyncThunk("data/fetchData", async (_, { rejectWithValue }) => {
  try {
    const dataRef = ref(database, "pageData");
    const snapshot = await get(dataRef);

    if (snapshot.exists()) {
      return snapshot.val(); // Return the data as an object
    } else {
      return {};
    }
  } catch (err) {
    return rejectWithValue("Error fetching data");
  }
});

// 🔹 Add Item to Firebase and Redux Store
export const addItem = createAsyncThunk("data/addItem", async (newItem, { rejectWithValue }) => {
  try {
    const dataRef = ref(database, "pageData");
    const newItemRef = push(dataRef); // Create a new unique key in Firebase
    const newItemWithId = { id: newItemRef.key, ...newItem }; // Add the generated key to the item
    await update(newItemRef, newItemWithId); // Save the new item in Firebase
    return newItemWithId; // Return the new item for Redux state
  } catch (err) {
    return rejectWithValue("Error adding item");
  }
});

// 🔹 Update Item in Firebase and Redux Store
export const updateItem = createAsyncThunk("data/updateItem", async (updatedItem, { rejectWithValue }) => {
  try {
    const itemRef = ref(database, `pageData/${updatedItem.id}`);
    await update(itemRef, updatedItem); // Update the item in Firebase
    return updatedItem; // Return the updated item for Redux state
  } catch (err) {
    return rejectWithValue("Error updating item");
  }
});

// 🔹 Delete Item from Firebase and Redux Store
export const deleteItem = createAsyncThunk("data/deleteItem", async (id, { rejectWithValue }) => {
  try {
    const itemRef = ref(database, `pageData/${id}`); // Use the item's ID or key
    await remove(itemRef); // Remove the item from Firebase
    return id; // Return the ID of the deleted item
  } catch (err) {
    return rejectWithValue("Error deleting item");
  }
});

// 🔹 Create Redux Slice
const dataSlice = createSlice({
  name: "data",
  initialState: {
    items: {}, // Store data as an object
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Store the fetched data as an object
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        const newItem = action.payload;
        state.items[newItem.id] = newItem; // Add the new item to the Redux store
      })
      .addCase(addItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        state.items[updatedItem.id] = updatedItem; // Update the specific item in the object
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        delete state.items[action.payload]; // Remove the item from the Redux store
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default dataSlice.reducer;
