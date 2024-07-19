import { NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST(req: Request) {
  if (!req.headers.get('content-type')?.includes('multipart/form-data')) {
    return NextResponse.json({ error: 'Content-Type must be multipart/form-data' }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const image = formData.get('image') as Blob;

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const imageArrayBuffer = await image.arrayBuffer();
    const imageBase64 = Buffer.from(imageArrayBuffer).toString('base64');

    const model = openai('gpt-4o');
    const prompt = `You are analyzing an image. Please determine if this image is a bill or receipt. Respond with 'yes' if it is a bill or receipt, and 'no' if it is not. Here is the image data: data:image/jpeg;base64,${imageBase64}`;
    const { text } = await generateText({
      model,
      prompt,
    });

    return NextResponse.json({ message: text });

  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json({ error: 'Failed to analyze image' }, { status: 500 });
  }
}
