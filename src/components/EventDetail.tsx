import React from 'react';
import { motion } from 'framer-motion';
import { X, Lightbulb, Star } from 'lucide-react';
import type { TimelineEvent } from '../data/timelineData';

interface EventDetailProps {
  event: TimelineEvent;
  onClose: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
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
              <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
              <p className="text-purple-100 text-lg">{event.timeAgo}</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">תיאור</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {event.description}
            </p>
          </div>

          {/* Significance */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-xl font-semibold text-gray-800">רמת חשיבות</h3>
            </div>
            <div className="flex items-center gap-2">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < event.significance ? 'bg-yellow-400' : 'bg-gray-200'
                  }`}
                />
              ))}
              <span className="mr-2 text-gray-600">({event.significance}/10)</span>
            </div>
          </div>

          {/* Insights */}
          {event.insights && event.insights.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-5 h-5 text-orange-500" />
                <h3 className="text-xl font-semibold text-gray-800">תובנות מעניינות</h3>
              </div>
              <div className="space-y-3">
                {event.insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-orange-50 to-yellow-50 border-r-4 border-orange-400 p-4 rounded-lg"
                  >
                    <p className="text-gray-700 leading-relaxed">{insight}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Category badge */}
          <div className="flex justify-center">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium text-white ${getCategoryColor(event.category)}`}>
              קטגוריה: {getCategoryName(event.category)}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

function getCategoryColor(category: string): string {
  const colors = {
    universe: 'bg-gradient-to-r from-purple-500 to-blue-600',
    earth: 'bg-gradient-to-r from-blue-500 to-green-600',
    life: 'bg-gradient-to-r from-green-500 to-yellow-600',
    human: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    civilization: 'bg-gradient-to-r from-orange-500 to-red-600',
    modern: 'bg-gradient-to-r from-red-500 to-pink-600'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-500';
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

export default EventDetail;
