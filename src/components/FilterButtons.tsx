import React from "react";

const FilterButtons = () => {
  return (
    <div>
      <h2 className="text-3xl pt-5 text-center">TodoList</h2>
      <div className="flex justify-between items-center mt-5">
        <button className="bg-green-500 border-[1px] text-white w-full py-1 mr-5 hover:bg-white hover:text-green-500 hover:border-green-500 hover:border-[1px]">
          All
        </button>
        <button className="bg-green-500 border-[1px] text-white w-full py-1 mr-5 hover:bg-white hover:text-green-500 hover:border-green-500 hover:border-[1px]">
          Done
        </button>
        <button className="bg-green-500 border-[1px] text-white w-full py-1  hover:bg-white hover:text-green-500 hover:border-green-500 hover:border-[1px]">
          Remaining
        </button>
      </div>
    </div>
  );
};

export default FilterButtons;
