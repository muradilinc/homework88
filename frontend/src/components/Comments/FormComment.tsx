import React, { useRef, useState } from 'react';

const FormComment = () => {
  const textArea = useRef<HTMLTextAreaElement>(null);
  const [showPanel, setShowPanel] = useState(false);

  const handleClick = () => {
    if (textArea.current) {
      textArea.current.click();
    }
    setShowPanel(true);
  };

  const handleCancel = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowPanel(false);
  };

  return (
    <form
      onClick={handleClick}
      className="flex flex-col rounded-md border border-gray-200 outline-none disabled:bg-gray-50 dark:bg-blue-50 dark:text-gray-800"
    >
      <textarea
        ref={textArea}
        className="w-full pl-4 outline-0"
        placeholder="Add to comment"
      />
      {showPanel ? (
        <div className="flex justify-end gap-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 p-[5px] px-[10px] capitalize rounded-[30px] hover:bg-gray-400"
          >
            cancel
          </button>
          <button
            type="submit"
            className="bg-[#0045AC] p-[5px] px-[10px] capitalize text-white rounded-[30px] hover:bg-[#003584]"
          >
            comment
          </button>
        </div>
      ) : null}
    </form>
  );
};

export default FormComment;
