import React from 'react'
import PageTopBanner from '../components/common/PageTopBanner'
import AboutSection from '../components/sections/AboutSection'
import HowitWorks from '../components/sections/HowitWorks'
import Testimonials from '../components/sections/Testimonials'
import BlogSection from '../components/sections/BlogSection'
import OurTeam from '../components/sections/OurTeam'
import WhyUs from '../components/sections/WhyUs'

const About = () => {
    return (
        <>
            <PageTopBanner
                title="About Us"
                path="/about"
            />

            <AboutSection />
            <WhyUs />
            <HowitWorks />
            <OurTeam />
            <Testimonials />
            <BlogSection />
        </>
    )
}

export default About
