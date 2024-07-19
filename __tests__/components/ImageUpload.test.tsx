import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageUpload from '@/app/components/ImageUpload/ImageUpload';

describe('ImageUpload', () => {
  it('renders the upload form with all expected elements', () => {
    render(<ImageUpload />);

    // Check for the file input
    const fileInput = screen.getByTestId('file-input');
    expect(fileInput).toBeInTheDocument();

    // Check for the submit button
    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
  });

  it('calls onChange when a file is selected', () => {
    render(<ImageUpload />);
    const fileInput = screen.getByTestId('file-input');
    const file = new File([''], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(fileInput.files[0]).toStrictEqual(file);
    expect(fileInput.files).toHaveLength(1);
  });

  it('shows loading state and results after submitting the form', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'yes' }),
      })
    );

    render(<ImageUpload />);

    const fileInput = screen.getByTestId('file-input');
    const file = new File([''], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    expect(screen.getByTestId('loading')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByTestId('result')).toBeInTheDocument());
    expect(screen.getByTestId('result')).toHaveTextContent('Result: yes');
  });
});
