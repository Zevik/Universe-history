import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Globe, Leaf, User, Building, Cpu } from 'lucide-react';
import type { TimelineEvent } from '../data/timelineData';

interface TimelineProps {
  events: TimelineEvent[];
  timeScale: 'linear' | 'logarithmic';
  onEventClick: (event: TimelineEvent) => void;
}

const categoryIcons = {
  universe: Star,
  earth: Globe,
  life: Leaf,
  human: User,
  civilization: Building,
  modern: Cpu
};

const categoryColors = {
  universe: 'from-purple-500 to-blue-600',
  earth: 'from-blue-500 to-green-600',
  life: 'from-green-500 to-yellow-600',
  human: 'from-yellow-500 to-orange-600',
  civilization: 'from-orange-500 to-red-600',
  modern: 'from-red-500 to-pink-600'
};

const Timeline: React.FC<TimelineProps> = ({ events, onEventClick }) => {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      // Extract years from timeAgo strings and sort chronologically
      const extractYears = (timeAgo: string): number => {
        const match = timeAgo.match(/(\d+(?:\.\d+)?)\s*(?:מיליארד|מיליון)?\s*שנ/);
        if (!match) return 0;
        const num = parseFloat(match[1]);
        if (timeAgo.includes('מיליארד')) return num * 1000000000;
        if (timeAgo.includes('מיליון')) return num * 1000000;
        return num;
      };
      
      return extractYears(b.timeAgo) - extractYears(a.timeAgo);
    });
  }, [events]);

  return (
    <div className="timeline-container py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        {/* Timeline line */}
        <div className="absolute right-1/2 transform translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 rounded-full" />
        
        {/* Events */}
        <div className="space-y-8">
          {sortedEvents.map((event, index) => {
            const Icon = categoryIcons[event.category];
            const isLeft = index % 2 === 0;
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`relative flex items-center ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {/* Timeline node */}
                <motion.div
                  className="absolute right-1/2 transform translate-x-1/2 z-10"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${categoryColors[event.category]} flex items-center justify-center shadow-lg cursor-pointer`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </motion.div>

                {/* Event card */}
                <motion.div
                  className={`w-5/12 ${isLeft ? 'mr-auto pl-8' : 'ml-auto pr-8'}`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => onEventClick(event)}
                >
                  <motion.div
                    className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer border-2 border-transparent hover:border-blue-300 transition-all duration-300 ${
                      hoveredEvent === event.id ? 'shadow-2xl' : ''
                    }`}
                    layoutId={event.id}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {event.title}
                        </h3>
                        <p className="text-purple-600 font-semibold mb-3">
                          {event.timeAgo}
                        </p>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {event.description}
                        </p>
                        
                        {/* Significance indicator */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm text-gray-500">חשיבות:</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < event.significance / 2 ? 'bg-yellow-400' : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <ChevronRight className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    </div>

                    {/* Category badge */}
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${categoryColors[event.category]}`}>
                      {getCategoryName(event.category)}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

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

export default Timeline;
