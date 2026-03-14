import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Star, ExternalLink, Code2 } from 'lucide-react';
import GlassCard from './GlassCard';

const LANG_COLORS = {
  Python: '#3572A5',
  Java: '#b07219',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Dart: '#00B4AB',
  'C++': '#f34b7d',
  Go: '#00ADD8',
  Rust: '#dea584',
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

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Syne'] text-gradient inline-block pb-2">Featured Projects</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] mx-auto rounded-full box-glow mb-8" />

          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 font-['DM_Sans'] ${
                  filter === cat
                    ? 'bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] text-white shadow-[0_0_15px_rgba(0,243,255,0.4)]'
                    : 'glass text-gray-300 hover:text-white hover:border-[var(--color-neon-blue)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--color-neon-blue)] shadow-[0_0_15px_rgba(0,243,255,0.4)]" />
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filtered.map((repo) => (
                <motion.div
                  key={repo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard className="h-full flex flex-col items-start">
                    <div className="flex justify-between items-start w-full mb-4">
                      <div className="p-3 rounded-lg glass bg-[var(--color-neon-blue)]/10 text-[var(--color-neon-blue)]">
                        <Code2 size={24} />
                      </div>
                      <div className="flex gap-3 items-center">
                        {repo.stargazers_count > 0 && (
                          <div className="flex items-center gap-1 text-gray-400 text-sm">
                            <Star size={16} className="text-yellow-400" />
                            <span>{repo.stargazers_count}</span>
                          </div>
                        )}
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                          <Github size={20} />
                        </a>
                        {repo.homepage && (
                          <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-neon-blue)] transition-colors">
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 font-['Syne']">{repo.name.replace(/-/g, ' ')}</h3>
                    <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3 font-['DM_Sans']">
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
