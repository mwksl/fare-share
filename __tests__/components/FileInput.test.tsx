import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FileInput from '@/app/components/ImageUpload/FileInput'

describe('FileInput', () => {
  it('renders with default text', () => {
    render(<FileInput />)
    expect(screen.getByText('Choose file')).toBeInTheDocument()
  })

  it('updates label text when file is selected', () => {
    render(<FileInput />)
    const input = screen.getByLabelText('Choose file')
    const file = new File([''], 'test.png', { type: 'image/png' })
    fireEvent.change(input, { target: { files: [file] } })
    expect(screen.getByText('test.png')).toBeInTheDocument()
  })
})