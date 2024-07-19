'use server'

import { revalidatePath } from 'next/cache'

export async function uploadImage(formData: FormData) {
  const file = formData.get('file') as File
  if (!file) {
    throw new Error('No file uploaded')
  }

  // Here you would typically upload the file to your storage service
  // For this example, we'll just simulate a successful upload
  const fileName = file.name
  const fileSize = file.size

  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000))

  // In a real scenario, you'd return the URL of the uploaded file
  const uploadedUrl = `/uploads/${fileName}`

  revalidatePath('/')

  return { success: true, fileName, fileSize, url: uploadedUrl }
}