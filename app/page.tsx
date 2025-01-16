import dynamic from 'next/dynamic'

const TourismPlatform = dynamic(() => import('../components/TourismPlatform'), {
  ssr: false
})

export default function Home() {
  return (
    <main>
      <TourismPlatform />
    </main>
  )
}
