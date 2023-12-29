import React from 'react';
import Image from 'next/image';
import arrow from '@/assets/arrow.svg';

const TextBox: React.FC = () => {
  return (
    <div className='items-center justify-between'>
      <input
        type="text"
        placeholder='Write a review ...'
        className="w-full max-w-[720px] rounded-lg bg-white max-h-10 px-6 py-1 border-2 border-primary"
      />
    </div>
  );
};

export default TextBox;