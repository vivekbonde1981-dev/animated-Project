import React from 'react'
import VideoScrubbingSlider from './VideoSlider'
import HeroSection from './heroSection'
import ScrollAnimation from './scrollAnimation'
import Carousel from './cardCarousel'
import Latestfooter from './Footer'
import BookForm from './form'

function HomePage() {


    return (
        <>
         <VideoScrubbingSlider></VideoScrubbingSlider>
      <HeroSection></HeroSection>
      <ScrollAnimation></ScrollAnimation>
      <Carousel></Carousel>
      <BookForm></BookForm>
      </>
        
    )
}

export default HomePage
