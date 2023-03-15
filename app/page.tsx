"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTodo, fetchTodos } from "@/slices/todoSlice";
import { AppDispatch, RootState } from "@/store/store";

export default function Home() {
  const todoRef = useRef(false);

  const { entities, loading, value } = useSelector(
    (state: RootState) => state.todo
  );

  const [page, setPage] = useState(1);

  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");

  const changePage = (operation: string) => {
    let newPage = page;
    if (operation === "next") {
      setPage(newPage++);
    } else {
      setPage(newPage--);
    }
    dispatch(fetchTodos({ page: newPage }));
  };
  useEffect(() => {
    if (todoRef.current === false) {
      dispatch(fetchTodos({ page: 1 }));
    }

    return () => {
      todoRef.current = true;
    };
  }, []);

  return (
    <div>
      <h1>Create Todo</h1>

      <input
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
      />

      <button
        onClick={() => {
          dispatch(createTodo({ title }));
        }}
      ></button>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        entities?.map((todo: any) => <h3 key={todo.id}>{todo.title}</h3>)
      )}

      <button
        onClick={() => {
          changePage("next");
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          changePage("previous");
        }}
      >
        -
      </button>
    </div>
  );
}
