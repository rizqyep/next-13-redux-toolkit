import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/getAllUsers",
  async ({ page }: { page?: number }) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_page=${
        page ?? 1
      }&_limit=5&sort=id&order=DESC`
    );
    const data = await response.json();
    return data;
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async ({ title }: { title: any }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title,
        completed: true,
      }),
    });
    const data = await response.json();
    return data;
  }
);

const initialState = {
  entities: [],
  loading: false,
} as any;

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    });
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.entities = [action.payload, ...state.entities.slice(0, 4)];
    });
    builder.addCase(createUser.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export default userSlice.reducer;
