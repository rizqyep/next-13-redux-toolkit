import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/getAllTodos",
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

export const createTodo = createAsyncThunk(
  "todos/createTodo",
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

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    });
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.entities = [action.payload, ...state.entities.slice(0, 4)];
    });
    builder.addCase(createTodo.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export default todoSlice.reducer;
