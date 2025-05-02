import StationsGrid from '@/components/stations/Stations'
import React, { Suspense } from 'react'

function page() {
  return (
<Suspense>
<div>
      <StationsGrid/>
    </div>
</Suspense>
  )
}

export default page
