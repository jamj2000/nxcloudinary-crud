import Galeria from '@/components/Galeria';
import { imgRetrieveAll } from '@/lib/actions';


export const dynamic = 'force-dynamic'


export default async function Home() {
  const images = await imgRetrieveAll();

  return (
    <main>
      <Galeria images={images} />
    </main >
  )
}
