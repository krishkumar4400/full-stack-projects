import React from 'react'
import Banner from '../components/home/Banner.jsx'
import Header from '../components/home/Header.jsx'
import Footer from '../components/home/Footer.jsx'
import Features from '../components/home/Features.jsx'
import CallToAction from '../components/home/CallToAction.jsx'
import Testimonial from '../components/home/Testimonials.jsx'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Header/>
      <Features/>
      <CallToAction/>
      <Testimonial/>
      <Footer/>
    </div>
  )
}

export default Home
