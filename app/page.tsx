import React from 'react'
import Hero from '@/app/components/Hero'
import Services from '@/app/components/Services'
import About from '@/app/components/About'
import Process from '@/app/components/Process'
import Record from '@/app/components/Record'
import Testimonials from '@/app/components/Testimonials'

const page = () => {
  return (
    <div>
      <Hero />
      <Services />
      <About/>
      <Process />
      <Record/>
      <Testimonials />
    </div>
  )
}

export default page