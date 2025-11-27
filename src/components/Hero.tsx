'use client'

import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const roles = useMemo(() => [
    {
      title: "Front-End Web Developer",
      description: "I create modern, responsive web applications with cutting-edge technologies. Passionate about clean code, user experience, and bringing ideas to life."
    },
    {
      title: "Graphics Designer",
      description: "Crafting visually stunning designs that communicate effectively. Specializing in UI/UX design, branding, and creating memorable visual experiences."
    },
    {
      title: "Data Analyst",
      description: "Transforming complex data into actionable insights. Expert in data visualization, statistical analysis, and driving data-informed decisions."
    }
  ], [])

  // Typewriter effect for title
  useEffect(() => {
    const currentTitle = roles[currentRole].title
    
    if (!isDeleting && currentIndex < currentTitle.length) {
      // Typing
      const timeout = setTimeout(() => {
        setDisplayedText(currentTitle.substring(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 100)
      return () => clearTimeout(timeout)
    } else if (isDeleting && currentIndex > 0) {
      // Deleting
      const timeout = setTimeout(() => {
        setDisplayedText(currentTitle.substring(0, currentIndex - 1))
        setCurrentIndex(currentIndex - 1)
      }, 50)
      return () => clearTimeout(timeout)
    } else if (!isDeleting && currentIndex === currentTitle.length) {
      // Finished typing, wait then start deleting
      const timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 2000)
      return () => clearTimeout(timeout)
    } else if (isDeleting && currentIndex === 0) {
      // Finished deleting, move to next role
      setIsDeleting(false)
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }
  }, [currentIndex, isDeleting, currentRole, roles])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hi, I&apos;m <span className="gradient-text">Joshua Ijemba</span>
          </h1>
          
          {/* Typewriter Role Title */}
          <div className="h-20 md:h-24 mb-2 flex items-center justify-center">
            <h2 className="text-2xl md:text-3xl text-gray-300">
              {displayedText}
              <span className="animate-pulse">|</span>
            </h2>
          </div>

          {/* Description with fade animation */}
          <div className="h-24 md:h-28 mb-8 flex items-center justify-center">
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {roles[currentRole].description}
            </p>
          </div>
          
          {/* Role Indicators */}
          <div className="flex justify-center items-start space-x-2 mb-8">
            {roles.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentRole(index)
                  setDisplayedText('')
                  setCurrentIndex(0)
                  setIsDeleting(false)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentRole 
                    ? 'bg-primary-500 scale-125' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Show ${roles[index].title} role`}
              />
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="#projects" className="btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn-secondary">
              Get In Touch
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-16">
            <a
              href="https://github.com/kingjay19"
              className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/joshua-ijemba-7555a4229?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:chidiebue95@gmail.com"
              className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>

          <div className="animate-bounce">
            <a href="#projects" className="text-gray-400 hover:text-primary-400 transition-colors">
              <ArrowDown size={32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}