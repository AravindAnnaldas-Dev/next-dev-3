"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

type Titem = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

const CrudWithForm = () => {
  const [jsonData, setJsonData] = useState<Titem[]>([]);
  const [myId, setMyId] = useState(jsonData.length + 1);
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  // data fetching
  const dataFetching = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/todos");
      const data = response.data;
      setJsonData(data.todos);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // use effect
  useEffect(() => {
    dataFetching();
  }, []);

  useEffect(() => {
    setMyId(jsonData.length + 1);
  }, [jsonData]);

  // common class
  const commonClass =
    "min-w-[160px] min-h-[50px] border-white px-6 py-2 flex items-center justify-center text-nowrap";
  const headerData = [
    "Id",
    "Todo",
    "Completed",
    "UserId",
    "Edit Todo",
    "Delete Todo",
  ];

  // form open
  const body = document.querySelector("body");
  const taskFormCtn = document.getElementById("task-form-ctn");
  const onAddTaskClick = () => {
    taskFormCtn?.classList.add("form-open");
    body?.classList.add("overflow-hidden");
  };
  const onCloseFormClick = () => {
    taskFormCtn?.classList.remove("form-open");
    body?.classList.remove("overflow-hidden");
  };

  // form input
  const onChangeHandlerTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // form checked
  const onChangeHandlerChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  // form sumbmit
  const onFormsubmitClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (inputValue === "") {
      alert("Please enter some task");
      return;
    }

    setJsonData([
      ...jsonData,
      { id: myId, todo: inputValue, completed: checked, userId: myId },
    ]);

    setInputValue("");
    setChecked(false);

    onCloseFormClick();
  };

  return (
    <>
      <div className="w-[100%] h-[fit-content] flex justify-center pt-16">
        <div className="h-[fit-content] border-[1px] border-white relative">
          <button
            style={{ bottom: "calc(100% + 8px)" }}
            className="absolute right-0 flex items-center justify-center py-2 px-6 rounded-md bg-green-600"
            onClick={onAddTaskClick}
          >
            Add Todo
          </button>
          <div className="w-[100%] flex items-center border-b-[1px] border-white">
            {headerData.map((item, index) => (
              <div
                key={index}
                className={`${commonClass} ${
                  index === 1 ? "min-w-[240px]" : ""
                } last:border-none`}
              >
                {item}
              </div>
            ))}
          </div>
          {loading ? (
            <div className="text-center py-6">Fetching data...</div>
          ) : (
            <>
              {jsonData.map((item, index) => (
                <div
                  key={index}
                  className="w-[100%] flex items-center border-b-[1px] border-white"
                >
                  <div className={commonClass}>{item.id}</div>
                  <div
                    style={{ justifyContent: "flex-start" }}
                    className={`custom_scroll_text ${commonClass} min-w-[240px] max-w-[240px] overflow-x-auto`}
                  >
                    {item.todo}
                  </div>
                  <div className={commonClass}>{item.completed.toString()}</div>
                  <div className={commonClass}>{item.userId}</div>
                  <div className={`${commonClass} px-4 py-1`}>
                    <button
                      type="button"
                      className="w-[100%] h-[100%] rounded-md bg-sky-600 border-none py-1"
                    >
                      Edit
                    </button>
                  </div>
                  <div className={`${commonClass} px-4 py-1`}>
                    <button
                      type="button"
                      className="w-[100%] h-[100%] rounded-md bg-red-600 border-none py-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div
        id="task-form-ctn"
        className="fixed top-0 left-0 w-full h-full bg-[#212121e0] items-center justify-center hidden"
      >
        <div
          className="absolute right-0 top-0 w-16 h-16 flex items-center justify-center cursor-pointer"
          onClick={onCloseFormClick}
        >
          <IoIosClose className="w-10 h-10" />
        </div>
        <div className="w-full h-full max-w-[460px] max-h-[380px] border-[1px] border-white rounded-lg overflow-hidden">
          <form className="h-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Id
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="id"
                type="number"
                name="id"
                placeholder="Id"
                value={myId}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Enter Task
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="task"
                type="text"
                name="todo"
                placeholder="Enter Task"
                value={inputValue}
                onChange={(e) => onChangeHandlerTodo(e)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                User Id
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userId"
                type="number"
                name="userId"
                placeholder="User Id"
                value={myId}
                required
              />
            </div>
            <div className="mb-4 flex items-center gap-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Is task completed ?
              </label>
              <input
                className="w-4 h-4 mb-2"
                id="completed"
                type="checkbox"
                name="completed"
                placeholder="Enter Task"
                checked={checked}
                onChange={(e) => onChangeHandlerChecked(e)}
                required
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={(e) => onFormsubmitClick(e)}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CrudWithForm;
