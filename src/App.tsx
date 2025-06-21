import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineEvents, categories } from './data/timelineData';
import type { TimelineEvent } from './data/timelineData';
import StatisticsView from './components/StatisticsView';
import PerspectiveView from './components/PerspectiveView';
import './App.css';

type ViewMode = 'timeline' | 'statistics' | 'perspective';

function App() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  const [selectedCategories] = useState<string[]>(
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white py-8 px-4 relative overflow-hidden"
      >
        <div className="container mx-auto text-center relative z-10">
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4"
          >
            ההיסטוריה של היקום
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-blue-100 mb-4"
          >
            מסע מרתק מהמפץ הגדול ועד מהפכת הבינה המלאכותית
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex justify-center items-center gap-2 text-purple-200"
          >
            <span className="text-lg">13.7 מיליארד שנות התפתחות במבט אחד</span>
          </motion.div>
        </div>
      </motion.header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Navigation Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  viewMode === 'timeline' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                ציר זמן אינטראקטיבי
              </button>
              <button
                onClick={() => setViewMode('statistics')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  viewMode === 'statistics' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                סטטיסטיקות וגרפים
              </button>
              <button
                onClick={() => setViewMode('perspective')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  viewMode === 'perspective' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
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
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              />
            </div>
          </div>
        </motion.div>        {/* Main Content - Dynamic based on viewMode */}
        <AnimatePresence mode="wait">
          {viewMode === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="timeline-container py-8"
            >
              <div className="relative max-w-6xl mx-auto">
                <div className="space-y-8">
                  {filteredEvents.map((event, index) => {
                    const isLeft = index % 2 === 0;
                    
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className={`relative flex items-center ${isLeft ? 'flex-row-reverse lg:flex-row-reverse' : 'flex-row lg:flex-row'} ${isLeft ? '' : 'lg:flex-row-reverse'}`}
                        onClick={() => setSelectedEvent(event)}
                      >
                        {/* Timeline node */}
                        <div className="absolute right-1/2 lg:right-1/2 transform translate-x-1/2 z-10">
                          <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg cursor-pointer">
                            <span className="text-white font-bold text-xs lg:text-base">{index + 1}</span>
                          </div>
                        </div>

                        {/* Event card */}
                        <div className={`w-full lg:w-5/12 ${isLeft ? 'mr-auto pl-4 lg:pl-8' : 'ml-auto pr-4 lg:pr-8'} ${index % 2 === 0 ? 'lg:ml-auto lg:pr-8' : 'lg:mr-auto lg:pl-8'}`}>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 lg:p-6 cursor-pointer border border-white/20 hover:border-blue-300 transition-all duration-300"
                          >
                            <h3 className="text-lg lg:text-xl font-bold text-white mb-2">
                              {event.title}
                            </h3>
                            <p className="text-blue-200 font-semibold mb-3 text-sm lg:text-base">
                              {event.timeAgo}
                            </p>
                            <p className="text-gray-200 mb-4 text-sm lg:text-base">
                              {event.description}
                            </p>
                            
                            {/* Significance indicator */}
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xs lg:text-sm text-gray-300">חשיבות:</span>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${
                                      i < event.significance / 2 ? 'bg-yellow-400' : 'bg-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Category badge */}
                            <div className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-purple-500 to-blue-600">
                              {getCategoryName(event.category)}
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === 'statistics' && (
            <StatisticsView events={filteredEvents} categories={categories} />
          )}

          {viewMode === 'perspective' && (
            <PerspectiveView events={filteredEvents} />
          )}
        </AnimatePresence>

        {/* Event Detail Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
                      <p className="text-purple-100 text-lg">{selectedEvent.timeAgo}</p>
                    </div>
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">תיאור</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {selectedEvent.description}
                    </p>
                  </div>

                  {selectedEvent.insights && selectedEvent.insights.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">תובנות מעניינות</h3>
                      <div className="space-y-3">
                        {selectedEvent.insights.map((insight, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-r from-orange-50 to-yellow-50 border-r-4 border-orange-400 p-4 rounded-lg"
                          >
                            <p className="text-gray-700 leading-relaxed">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function getCategoryName(category: string): string {
  const names = {
    universe: 'יקום',
    earth: 'כדור הארץ',
    life: 'חיים',
    human: 'אדם',
    civilization: 'ציוויליזציה',
    modern: 'מודרני'
  };
  return names[category as keyof typeof names] || category;
}

export default App;
