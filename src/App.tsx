import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Timeline from './components/Timeline';
import EventDetail from './components/EventDetail';
import Statistics from './components/Statistics';
import PerspectiveToggle from './components/PerspectiveToggle';
import FilterPanel from './components/FilterPanel';
import { timelineEvents, categories } from './data/timelineData';
import type { TimelineEvent } from './data/timelineData';

type TimeScale = 'linear' | 'logarithmic';
type ViewMode = 'timeline' | 'statistics' | 'perspective';

function App() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [timeScale, setTimeScale] = useState<TimeScale>('logarithmic');
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categories.map(cat => cat.id)
  );
  const [searchTerm, setSearchTerm] = useState('');

  // Filter events based on selected categories and search term
  const filteredEvents = timelineEvents.filter(event => {
    const matchesCategory = selectedCategories.includes(event.category);
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Add cosmic background animation
  useEffect(() => {
    const cosmicBg = document.createElement('div');
    cosmicBg.className = 'cosmic-bg';
    document.body.appendChild(cosmicBg);

    return () => {
      document.body.removeChild(cosmicBg);
    };
  }, []);

  // Add scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [viewMode, filteredEvents]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Navigation and Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('timeline')}
                className={`btn ${viewMode === 'timeline' ? 'btn-primary' : 'btn-secondary'}`}
              >
                ציר זמן אינטראקטיבי
              </button>
              <button
                onClick={() => setViewMode('statistics')}
                className={`btn ${viewMode === 'statistics' ? 'btn-primary' : 'btn-secondary'}`}
              >
                סטטיסטיקות וגרפים
              </button>
              <button
                onClick={() => setViewMode('perspective')}
                className={`btn ${viewMode === 'perspective' ? 'btn-primary' : 'btn-secondary'}`}
              >
                פרספקטיבות זמן
              </button>
            </div>

            <div className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="חפש אירוע..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              {viewMode === 'timeline' && (
                <select
                  value={timeScale}
                  onChange={(e) => setTimeScale(e.target.value as TimeScale)}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="logarithmic">סקלה לוגריתמית</option>
                  <option value="linear">סקלה לינארית</option>
                </select>
              )}
            </div>
          </div>

          <FilterPanel
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
          />
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {viewMode === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Timeline
                events={filteredEvents}
                timeScale={timeScale}
                onEventClick={setSelectedEvent}
              />
            </motion.div>
          )}

          {viewMode === 'statistics' && (
            <motion.div
              key="statistics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Statistics
                events={filteredEvents}
                categories={categories}
              />
            </motion.div>
          )}

          {viewMode === 'perspective' && (
            <motion.div
              key="perspective"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <PerspectiveToggle events={filteredEvents} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Event Detail Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <EventDetail
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
