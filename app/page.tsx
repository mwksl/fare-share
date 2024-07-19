import ImageUpload from '@/app/components/ImageUpload/ImageUpload'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Equitable Bill Splitter</h1>
      <ImageUpload />
    </main>
  )
}