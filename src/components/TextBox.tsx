import React from 'react';

const TextBox: React.FC = () => {
  return (
    <input
      type="text"
      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default TextBox;
