import React from 'react';

interface FileInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  return (
    <input type="file" name="image" accept="image/*" onChange={onChange} />
  );
};

export default FileInput;
