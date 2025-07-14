import React from 'react';
import { useTasks } from '@/context/taskContext';
import { FaCheckCircle } from 'react-icons/fa'; // optional: install with `npm i react-icons`

function Filters() {
  const { priority, setPriority } = useTasks();
  const priorities = ["All", "Low", "Medium", "High"];

  return (
    <div className="flex gap-4 bg-[#F9F9F9] border-2 border-white rounded-md px-4 py-2">
      {priorities.map((item, index) => {
        const isActive = priority === item.toLowerCase();
        return (
          <button
            key={index}
            className={`flex items-center gap-1 text-sm font-medium ${
              isActive ? 'text-[#3aafae]' : 'text-gray-500'
            }`}
            onClick={() => setPriority(item.toLowerCase())}
          >
            {isActive && <FaCheckCircle className="text-[#3aafae]" />}
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default Filters;
