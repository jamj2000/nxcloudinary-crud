import { CloudUpload, RotateCw } from 'lucide-react';
import { Suspense } from 'react';
import Galeria from '@/components/Galeria';
import ImageNew from '@/components/ImageNew';


export const dynamic = 'force-dynamic'


export default function Home() {
  return (
    <main className='p-5'>
      <h1 className='text-3xl font-bold text-blue-600'>Galería de imágenes</h1>
      <div>
        <b>Arrastra y suelta</b> una nueva imagen sobre la anterior, <b>o haz doble click</b>, y luego pulsa
        <ul>
          <li><CloudUpload className='ml-4 inline' /> para SUBIR</li>
          <li><RotateCw className='ml-4 inline' /> para ACTUALIZAR</li>
        </ul>

      </div>
      <br />

      <ImageNew />

      <Suspense fallback={
        <p className='text-2xl font-bold text-blue-300 animate-pulse'>Obteniendo imágenes...</p>
      }>
        <Galeria />
      </Suspense>
    </main>
  )
}
