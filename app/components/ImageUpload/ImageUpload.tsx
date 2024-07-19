"use client";

import React, { useState } from 'react';
import FileInput from './FileInput';

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!image) {
      alert('Please select an image to upload.');
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        setResult(result.message);
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
      setError('Failed to analyze image.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data" data-testid="upload-form">
        <FileInput onChange={handleFileChange} />
        <button type="submit" data-testid="submit-button">Upload Image</button>
      </form>
      {loading && <p data-testid="loading">Analyzing image...</p>}
      {result && <p data-testid="result">Result: {result}</p>}
      {error && <p data-testid="error">Error: {error}</p>}
    </div>
  );
};

export default ImageUpload;
