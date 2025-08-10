import React, { useRef, useState } from "react";


export default function FileUpload({ label = "Upload File", onUpload }) {

  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      onUpload(e.target.files[0])
    } else {
      setFileName("");
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm">
      <label
        htmlFor="file-upload"
        className="text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleClick}
          className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          Choose File
        </button>

        <span className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
          {fileName || "No file selected"}
        </span>
      </div>

      {/* Hidden file input */}
      <input
        id="file-upload"
        type="file"
        name="imag_file"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
