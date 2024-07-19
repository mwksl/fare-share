'use client'

import { useState } from 'react'

export default function FileInput() {
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setFileName(file ? file.name : null)
  }

  return (
    <>
      <input
        type="file"
        id="bill-image"
        name="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <label
        htmlFor="bill-image"
        className="cursor-pointer bg-white border border-gray-300 rounded-md py-2 px-4 inline-flex items-center"
      >
        {fileName ? fileName : 'Choose file'}
      </label>
    </>
  )
}