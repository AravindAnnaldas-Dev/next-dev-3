"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusIcon, CheckIcon } from "@radix-ui/react-icons";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

type Ttodo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: boolean;
};

const TodoApp = () => {
  const [apiData, setApiData] = useState<Ttodo[]>([]);
  const [inputData, setInputData] = useState("");
  const [editIcon, setEditIcon] = useState(true);
  const [editClickedId, setEditClickedId] = useState<number>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const gettingData = async () => {
      const response = await axios.get("https://dummyjson.com/todos");
      const data = response.data;
      setApiData(data.todos);
      setLoading(false);
    };

    gettingData();
  }, []);

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const headers = {
    "Content-Type": "application/json",
  };
  const body = {
    id: Math.floor(Math.random() * 1000) + 31,
    todo: inputData,
    completed: false,
    userId: Math.floor(Math.random() * 100),
  };

  const onChecboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    checkId: number
  ) => {
    const updateCheck = apiData.map((item) =>
      item.id === checkId ? { ...item, completed: e.target.checked } : item
    );
    setApiData(updateCheck);
  };

  const onTodoAddBtn = async () => {
    if (inputData === "") {
      return alert("Task should not be empty field");
    }
    setInputData("");
    try {
      const response = await axios.post(
        "https://dummyjson.com/todos/add",
        body,
        { headers }
      );
      const data = response.data;
      setApiData([...apiData, data]);
      alert("New todo added successfully!");
    } catch (error) {
      alert(error);
    }
  };

  const onEditHandler = async (editId: number) => {
    apiData.map((item) => {
      if (item.id === editId) {
        setInputData(item.todo);
        setEditClickedId(item.id);
        setEditIcon(false);
      }
    });
  };

  const onEditTodoBtn = () => {
    const updateEdit = apiData.map((item) =>
      item.id === editClickedId
        ? {
            ...item,
            todo: inputData,
          }
        : item
    );
    setApiData(updateEdit);
    setInputData("");
    setEditIcon(true);
  };

  const onDeleteClick = (deleteId: number) => {
    const updateDelete = apiData.filter((item) => item.id !== deleteId);
    setApiData(updateDelete);
  };

  return (
    <>
      <div className="w-[100%] max-w-[400px] h-[100%] max-h-[400px] py-3 px-4 flex flex-col items-center justify-start gap-4">
        <div className="w-[100%] flex items-center gap-2">
          <input
            className="w-[100%] h-[100%] rounded outline-none text-black pl-2 text-lg"
            onChange={onInputHandler}
            value={inputData}
            type="text"
          />
          {editIcon ? (
            <button
              className="border-[1px] border-[#ffffff50] py-2 px-4 rounded bg-[#ffffff20]"
              onClick={onTodoAddBtn}
              title="add"
            >
              <PlusIcon className="w-[24px] h-[24px]" />
            </button>
          ) : (
            <button
              className="border-[1px] border-[#ffffff50] py-2 px-4 rounded bg-[#ffffff20]"
              onClick={onEditTodoBtn}
              title="add"
            >
              <CheckIcon className="w-[24px] h-[24px]" />
            </button>
          )}
        </div>
        <div className="w-[100%] h-[100%] flex flex-col gap-2 overflow-y-auto custom_scroll_list">
          {loading ? (
            <div className="w-[100%] text-center">Loading...</div>
          ) : (
            <>
              {apiData.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="w-[100%] py-3 px-4 rounded bg-[#ffffff20] flex items-center justify-between gap-2"
                  >
                    <div className="w-[70%] flex items-center gap-2">
                      <input
                        className="custom_checked mb-[2px] h-4 w-4 cursor-pointer rounded-[2px] checked:bg-[#ffffff20]"
                        type="checkbox"
                        checked={item.completed}
                        onChange={(e) => onChecboxChange(e, item.id)}
                      />
                      <div className="w-[100%] text-nowrap overflow-x-auto custom_scroll_text">
                        {item.todo}
                      </div>
                    </div>
                    <div className="w-14 flex items-center justify-evenly gap-2">
                      <div
                        className="w-6 h-6 flex items-center justify-center cursor-pointer"
                        onClick={() => onEditHandler(item.id)}
                        title="edit"
                      >
                        <FiEdit className="w-[18px] h-[18px]" />
                      </div>
                      <div
                        className="w-6 h-6 flex items-center justify-center cursor-pointer"
                        onClick={() => onDeleteClick(item.id)}
                        title="delete"
                      >
                        <MdDelete className="w-[20px] h-[20px]" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {apiData.length === 0 && !loading && (
            <div className="w-[100%] text-center">No todos available.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoApp;
