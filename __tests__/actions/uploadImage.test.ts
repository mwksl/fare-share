import { uploadImage } from '../../app/actions/uploadImage'

// Mock Next.js cache revalidation
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}))

describe('uploadImage', () => {
  it('handles file upload correctly', async () => {
    const mockFile = new File([''], 'test.png', { type: 'image/png' })
    const formData = new FormData()
    formData.append('file', mockFile)

    const result = await uploadImage(formData)

    expect(result).toEqual({
      success: true,
      fileName: 'test.png',
      fileSize: 0,
      url: '/uploads/test.png',
    })
  })

  it('throws an error when no file is provided', async () => {
    const formData = new FormData()

    await expect(uploadImage(formData)).rejects.toThrow('No file uploaded')
  })
})