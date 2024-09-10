import React from 'react';

const CrudWithForm = () => {
  const bodyData = [
    {
      id: 1,
      todo: 'Todo-1',
      completed: true,
      userId: 54,
    },
    {
      id: 2,
      todo: 'Todo-2',
      completed: false,
      userId: 87,
    },
  ];

  const commonClass =
    'min-w-[160px] min-h-[50px] border-r-[1px] border-white px-6 py-3 text-center';
  const headerData = ['Id', 'Todo', 'Completed', 'UserId', 'Edit', 'Delete'];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="border-t-[1px] border-l-[1px] border-white">
        <div className="w-full flex items-center border-b-[1px] border-white">
          {headerData.map((item, index) => (
            <div
              key={index}
              className={`${commonClass} ${index === 1 ? 'min-w-[240px]' : ''}`}
            >
              {item}
            </div>
          ))}
        </div>
        {bodyData.map((item, index) => (
          <div
            key={index}
            className="w-full flex items-center border-b-[1px] border-white"
          >
            <div className={commonClass}>{item.id}</div>
            <div className={`${commonClass} min-w-[240px]`}>{item.todo}</div>
            <div className={commonClass}>{item.completed.toString()}</div>
            <div className={commonClass}>{item.userId}</div>
            <div className={`${commonClass} px-4 py-1`}>
              <button
                type="button"
                className="w-[100%] h-[100%] rounded-lg bg-sky-600 border-none py-2"
              >
                Edit
              </button>
            </div>
            <div className={`${commonClass} px-4 py-1`}>
              <button
                type="button"
                className="w-[100%] h-[100%] rounded-lg bg-red-600 border-none py-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrudWithForm;
