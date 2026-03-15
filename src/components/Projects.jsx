import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Star, ExternalLink, Code2 } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassCard from './GlassCard';

gsap.registerPlugin(ScrollTrigger);

const LANG_COLORS = {
  Python: '#e5e7eb',
  Java: '#9ca3af',
  JavaScript: '#ffffff',
  TypeScript: '#d1d5db',
  Dart: '#6b7280',
  'C++': '#f3f4f6',
  Go: '#e5e7eb',
  Rust: '#808080',
};

const CATEGORIES = ['All', 'AI / ML', 'Backend', 'Web development', 'Experiments'];

function categorize(repo) {
  const name = repo.name.toLowerCase();
  const desc = (repo.description || '').toLowerCase();
  if (name.includes('ai') || desc.includes('ai') || desc.includes('model') || desc.includes('vision') || name.includes('drowsiness')) return 'AI / ML';
  if (name.includes('backend') || name.includes('api') || desc.includes('fastapi') || desc.includes('spring')) return 'Backend';
  if (name.includes('web') || name.includes('portfolio') || desc.includes('react') || desc.includes('frontend')) return 'Web development';
  return 'Experiments';
}

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const sectionRef = useRef(null);

  useEffect(() => {
    fetch('https://api.github.com/users/Mpradeep-dev/repos?sort=updated')
      .then(r => r.json())
      .then(data => {
        const enhanced = data
          .filter(r => !r.fork)
          .map(r => ({ ...r, category: categorize(r) }))
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(enhanced);
      })
      .catch(err => console.error('GitHub fetch failed', err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'All' ? repos : repos.filter(r => r.category === filter);

  useGSAP(() => {
    if (loading) return;

    // Refresh ScrollTrigger to ensure correct positions after layout changes
    ScrollTrigger.refresh();

    gsap.utils.toArray('.project-card-wrapper').forEach((wrapper, index) => {
      // Alternating slide in: even index from left, odd from right
      const isEven = index % 2 === 0;

      gsap.from(wrapper, {
        x: isEven ? -80 : 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });
    });
  }, { scope: sectionRef, dependencies: [filtered, loading] });

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 w-full flex justify-center">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Syne'] text-gradient inline-block pb-2">Featured Projects</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-pure-white)] to-[var(--color-silver-gray)] mx-auto rounded-full box-glow mb-8" />

          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 font-['DM_Sans'] ${filter === cat
                  ? 'bg-gradient-to-r from-[var(--color-pure-white)] to-[var(--color-silver-gray)] text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                  : 'glass text-gray-300 hover:text-white hover:border-[var(--color-pure-white)]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--color-pure-white)] shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filtered.map((repo, idx) => (
                <motion.div
                  key={repo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="project-card-wrapper h-full">
                    <GlassCard className="h-full flex flex-col items-start hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] hover:border-white/30 transition-all duration-300 group">
                      <div className="flex justify-between items-start w-full mb-4">
                        <div className="p-3 rounded-lg glass bg-[var(--color-pure-white)]/10 text-[var(--color-pure-white)] group-hover:bg-[var(--color-pure-white)]/20 transition-colors">
                          <Code2 size={24} />
                        </div>
                        <div className="flex gap-3 items-center">
                          {repo.stargazers_count > 0 && (
                            <div className="flex items-center gap-1 text-gray-400 text-sm">
                              <Star size={16} className="text-yellow-400 group-hover:text-yellow-300" />
                              <span>{repo.stargazers_count}</span>
                            </div>
                          )}
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors z-10 relative">
                            <Github size={20} />
                          </a>
                          {repo.homepage && (
                            <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-pure-white)] transition-colors z-10 relative">
                              <ExternalLink size={20} />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 font-['Syne']">{repo.name.replace(/-/g, ' ')}</h3>
                      <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3 font-['DM_Sans'] group-hover:text-gray-300 transition-colors">
                        {repo.description || 'No description provided.'}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-auto w-full">
                        {repo.language && (
                          <span
                            className="text-xs font-semibold px-3 py-1 rounded-full border font-['DM_Sans']"
                            style={{
                              borderColor: (LANG_COLORS[repo.language] || '#888') + '60',
                              color: LANG_COLORS[repo.language] || '#ccc',
                              background: (LANG_COLORS[repo.language] || '#888') + '15',
                            }}
                          >
                            {repo.language}
                          </span>
                        )}
                        <span className="text-xs font-semibold px-3 py-1 rounded-full border border-gray-600/50 text-gray-300 bg-gray-800/30 font-['DM_Sans']">
                          {repo.category}
                        </span>
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
