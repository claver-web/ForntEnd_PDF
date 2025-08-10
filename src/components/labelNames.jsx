import React from "react";

export function TextInput({
  id,
  label,
  type = "text",
  placeholder = "",
  value,
  name,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
      />
    </div>
  );
}
