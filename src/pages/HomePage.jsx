import React from 'react'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import EventsSection from '../components/EventsSection'
import ContactSection from '../components/ContactSection'
import NewsSection from '../components/NewsSection'
import Footer from '../components/Footer'
import Terminal from '../components/Terminal'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <EventsSection />
      <NewsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <Terminal />
    </>
  )
}

export default HomePage
