import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { FaCheck } from "react-icons/fa";

const SelectTextField = ({
  label,
  select,
  setSelect,
  lists,
  placeholder = "-- Select Item --",
  error,       // new prop
  required,    // optional
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold text-sm text-slate-800">
        {label} {required && <span className="text-red-600">*</span>}
      </label>

      <Listbox value={select ?? null} onChange={setSelect} by="categoryId">
        <div className="relative">
          <ListboxButton
            className={`relative text-sm py-2 rounded-md border w-full text-left ${
              error ? "border-red-500" : "border-slate-700"
            } bg-white text-gray-600`}
          >
            <span className={`block truncate ps-2 ${select === null ? "text-gray-400" : "text-gray-700"}`}>
              {select === null ? placeholder : select.categoryName}
            </span>
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
            {lists?.map((category) => (
              <ListboxOption
                key={category.categoryId}
                value={category}
                className="group relative cursor-default py-2 pl-3 pr-9 text-gray-900 data-focus:bg-indigo-600 data-focus:text-white"
              >
                <span className="block truncate font-semibold">{category.categoryName}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-focus:text-white [.group:not([data-selected])_&]:hidden">
                  <FaCheck className="text-xl" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default SelectTextField;
