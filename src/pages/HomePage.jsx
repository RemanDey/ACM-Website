import React from 'react'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ContactSection from '../components/ContactSection'
import EventsSection from '../components/EventsSection'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <ContactSection/>
      <Footer/>
    </>
  )
}

export default HomePage
