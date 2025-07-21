import React from 'react';
import { useTasks } from '@/context/taskContext';
import { FaCheckCircle } from 'react-icons/fa'; // optional: install with `npm i react-icons`

function Filters() {
  const { priority, setPriority } = useTasks();
  const priorities = ["All", "Low", "Medium", "High"];

  return (
    <div className="flex gap-4 bg-gray-500 border-2 border-gray-400 rounded-md px-4 py-2">
      {priorities.map((item, index) => {
        const isActive = priority === item.toLowerCase();
        return (
          <button
            key={index}
            className={`flex items-center gap-1 text-sm font-medium ${
              isActive ? 'text-[#0bf9f5]' : 'text-gray-100'
            }`}
            onClick={() => setPriority(item.toLowerCase())}
          >
            {isActive && <FaCheckCircle className="text-[#0bf9f5]" />}
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default Filters;
