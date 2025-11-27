/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client'

import { projects } from '@/data/project'
import { ExternalLink, Github, Palette, BarChart3, Image } from 'lucide-react'
import { useState, useMemo, JSX } from 'react'
import ImageModal from './ImageModal'

type ProjectCategory = 'all' | 'web' | 'design' | 'data'

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [currentImages, setCurrentImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') {
      return projects.filter(project => project.featured)
    }
    return projects.filter(project => 
      project.category === activeCategory && project.featured
    )
  }, [activeCategory])

  const categories: { id: ProjectCategory; name: string; icon: JSX.Element; count: number }[] = [
    {
      id: 'all',
      name: 'All Projects',
      icon: <div className="w-5 h-5 bg-gradient-to-r from-primary-400 to-primary-600 rounded" />,
      count: projects.filter(p => p.featured).length
    },
    {
      id: 'web',
      name: 'Web Development',
      icon: <ExternalLink size={20} />,
      count: projects.filter(p => p.category === 'web' && p.featured).length
    },
    {
      id: 'design',
      name: 'Graphics Design',
      icon: <Palette size={20} />,
      count: projects.filter(p => p.category === 'design' && p.featured).length
    },
    {
      id: 'data',
      name: 'Data Analysis',
      icon: <BarChart3 size={20} />,
      count: projects.filter(p => p.category === 'data' && p.featured).length
    }
  ]

  const getCategoryColor = (category: ProjectCategory) => {
    switch (category) {
      case 'web':
        return 'from-blue-500 to-cyan-500'
      case 'design':
        return 'from-purple-500 to-pink-500'
      case 'data':
        return 'from-green-500 to-emerald-500'
      default:
        return 'from-primary-500 to-primary-600'
    }
  }

  const getCategoryIcon = (project: typeof projects[0]) => {
    switch (project.category) {
      case 'web':
        return <ExternalLink size={16} />
      case 'design':
        return <Palette size={16} />
      case 'data':
        return <BarChart3 size={16} />
      default:
        return <ExternalLink size={16} />
    }
  }

  const openImageGallery = (images: string[], startIndex: number = 0) => {
    setCurrentImages(images)
    setCurrentImageIndex(startIndex)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setCurrentImages([])
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)
  }

  return (
    <>
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore some of my work across web development, graphics design, and data analysis
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                    : 'glass-effect text-gray-300 hover:text-white hover:bg-dark-300/70'
                }`}
              >
                <span className={activeCategory === category.id ? 'text-white' : 'text-primary-400'}>
                  {category.icon}
                </span>
                <span>{category.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-dark-200 text-gray-400'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="glass-effect rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 animate-slide-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Header with Category Badge */}
                <div 
                  className="relative h-48 bg-gradient-to-br from-dark-300 to-dark-400 cursor-pointer overflow-hidden"
                  onClick={() => {
                    if (project.category === 'design' && project.images) {
                      openImageGallery(project.images)
                    }
                  }}
                >
                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(project.category)} text-white z-10`}>
                    {getCategoryIcon(project)}
                    <span className="capitalize">{project.category}</span>
                  </div>
                  
                  {/* Image Gallery Indicator for Design Projects */}
                  {project.category === 'design' && project.images && project.images.length > 1 && (
                    <div className="absolute top-4 right-4 flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-black/50 text-white z-10">
                      <Image size={14} />
                      <span>{project.images.length}</span>
                    </div>
                  )}
                  
                  {/* ACTUAL PROJECT IMAGE */}
                  <div className="absolute inset-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-400/80 to-transparent opacity-60" />
                  </div>

                  {/* Fallback Image (only shows if actual image fails to load) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="text-6xl">
                      {project.category === 'web' && '🚀'}
                      {project.category === 'design' && '🎨'}
                      {project.category === 'data' && '📊'}
                    </div>
                  </div>

                  {/* Hover Overlay for Design Projects */}
                  {project.category === 'design' && project.images && (
                    <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center bg-black/50 rounded-lg p-4">
                        <Image size={32} className="mx-auto mb-2" />
                        <span className="text-sm font-medium">View Gallery ({project.images.length} images)</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-dark-200 text-gray-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-dark-200 text-gray-500 rounded-full text-sm">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-4 pt-4 border-t border-dark-200/50">
                    {/* For Design Projects - View Gallery Button */}
                    {project.category === 'design' && project.images ? (
                      <button
                        onClick={() => openImageGallery(project.images!)}
                        className="flex items-center text-gray-400 hover:text-primary-400 transition-colors"
                      >
                        <Image size={18} className="mr-1" />
                        View Gallery
                      </button>
                    ) : (
                      // For Web and Data Projects - Live Demo Link
                      <a
                        href={project.liveUrl}
                        className="flex items-center text-gray-400 hover:text-primary-400 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={18} className="mr-1" />
                        Preview Live
                      </a>
                    )}
                    
                    {/* GitHub Link for Web and Data Projects */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        className="flex items-center text-gray-400 hover:text-primary-400 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={18} className="mr-1" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">No projects found</h3>
              <p className="text-gray-400">There are no featured projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        images={currentImages}
        currentIndex={currentImageIndex}
        isOpen={modalOpen}
        onClose={closeModal}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  )
}