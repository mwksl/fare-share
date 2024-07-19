import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileInput from '@/app/components/ImageUpload/FileInput';

describe('FileInput', () => {
  it('renders without crashing', () => {
    render(<FileInput onChange={() => {}} />);
    const input = screen.getByTestId('file-input');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange when a file is selected', () => {
    const handleChange = jest.fn();
    render(<FileInput onChange={handleChange} />);
    const input = screen.getByTestId('file-input');
    const file = new File([''], 'test.png', { type: 'image/png' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
