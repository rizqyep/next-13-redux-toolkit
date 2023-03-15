"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createUser, fetchUsers } from "@/slices/userSlice";
import { AppDispatch, RootState } from "@/store/store";

export default function Home() {
  const userRef = useRef(false);

  const { entities, loading, value } = useSelector(
    (state: RootState) => state.user
  );

  const [page, setPage] = useState(1);

  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");

  const changePage = (operation: string) => {
    let newPage = page;
    if (operation === "next") {
      setPage(newPage++);
    } else {
      setPage(newPage--);
    }
    dispatch(fetchUsers({ page: newPage }));
  };
  useEffect(() => {
    if (userRef.current === false) {
      dispatch(fetchUsers({ page: 1 }));
    }

    return () => {
      userRef.current = true;
    };
  }, []);

  return (
    <div>
      <h1>Create User</h1>

      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />

      <button
        onClick={() => {
          dispatch(createUser({ title: name }));
        }}
      ></button>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        entities?.map((user: any) => <h3 key={user.id}>{user.title}</h3>)
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
