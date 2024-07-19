import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageUpload from '../../app/components/ImageUpload/ImageUpload';

describe('ImageUpload', () => {
  it('renders the upload form with all expected elements', () => {
    render(<ImageUpload />);

    // Check for the form
    const form = screen.getByTestId('upload-form');
    expect(form).toBeInTheDocument();

    // Check for the file input
    const fileInput = screen.getByLabelText(/upload bill image/i);
    expect(fileInput).toBeInTheDocument();

    // Check for the submit button
    const submitButton = screen.getByRole('button', { name: /upload bill/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
});