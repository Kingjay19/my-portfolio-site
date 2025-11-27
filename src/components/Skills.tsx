import { skills } from '@/data/project'

export default function Skills() {
  const skillCategories = {
    frontend: skills.filter(skill => skill.category === 'frontend'),
    design: skills.filter(skill => skill.category === 'design'),
    data: skills.filter(skill => skill.category === 'data'),
    tools: skills.filter(skill => skill.category === 'tools'),
  }

  const categoryTitles = {
    frontend: 'Frontend Development',
    design: 'Graphics Design',
    data: 'Data Analysis',
    tools: 'Tools & Technologies'
  }

  return (
    <section id="skills" className="py-20 bg-dark-300/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Technologies and tools across web development, design, and data analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {Object.entries(skillCategories).map(([category, categorySkills]) => (
            categorySkills.length > 0 && (
              <div key={category} className="glass-effect rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-white">
                  {categoryTitles[category as keyof typeof categoryTitles] || category}
                </h3>
                <div className="space-y-3">
                  {categorySkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300 text-sm">{skill.name}</span>
                        <span className="text-primary-400 text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-dark-200 rounded-full h-1.5">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-1.5 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  )
}