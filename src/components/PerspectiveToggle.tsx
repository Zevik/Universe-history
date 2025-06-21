import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Globe, User, Zap } from 'lucide-react';
import type { TimelineEvent } from '../data/timelineData';

interface PerspectiveToggleProps {
  events: TimelineEvent[];
}

type PerspectiveType = 'human' | 'earth' | 'universe' | 'compressed';

const perspectives = {
  human: {
    title: 'פרספקטיבת חיי אדם',
    icon: User,
    description: 'איך נראית ההיסטוריה דרך משקפיים של חיי אדם (80 שנה)',
    scale: 'שנים',
    color: 'from-yellow-400 to-orange-500'
  },
  earth: {
    title: 'פרספקטיבת כדור הארץ',
    icon: Globe,
    description: 'התפתחות כדור הארץ במהלך 4.6 מיליארד שנים',
    scale: 'מיליוני שנים',
    color: 'from-blue-400 to-green-500'
  },
  universe: {
    title: 'פרספקטיבת היקום',
    icon: Clock,
    description: 'מהמפץ הגדול ועד היום - 13.7 מיליארד שנים',
    scale: 'מיליארדי שנים',
    color: 'from-purple-400 to-blue-500'
  },
  compressed: {
    title: 'שנה קוסמית',
    icon: Calendar,
    description: 'כל ההיסטוריה דחוסה לשנה אחת',
    scale: 'ימים ושעות',
    color: 'from-pink-400 to-purple-500'
  }
};

const PerspectiveToggle: React.FC<PerspectiveToggleProps> = ({ events }) => {
  const [currentPerspective, setCurrentPerspective] = useState<PerspectiveType>('universe');

  const getEventInPerspective = (event: TimelineEvent, perspective: PerspectiveType) => {
    // Extract years from timeAgo string
    const extractYears = (timeAgo: string): number => {
      const match = timeAgo.match(/(\d+(?:\.\d+)?)\s*(?:מיליארד|מיליון)?\s*שנ/);
      if (!match) return 0;
      const num = parseFloat(match[1]);
      if (timeAgo.includes('מיליארד')) return num * 1000000000;
      if (timeAgo.includes('מיליון')) return num * 1000000;
      return num;
    };

    const yearsAgo = extractYears(event.timeAgo);
    
    switch (perspective) {
      case 'human':
        // If event is within human timescale
        if (yearsAgo < 10000) {
          return `לפני ${yearsAgo.toLocaleString()} שנים`;
        } else {
          return `הרבה לפני תחילת ההיסטוריה האנושית`;
        }
        
      case 'earth':
        if (yearsAgo >= 1000000) {
          return `לפני ${Math.round(yearsAgo / 1000000)} מיליון שנים`;
        } else if (yearsAgo >= 1000) {
          return `לפני ${Math.round(yearsAgo / 1000)} אלף שנים`;
        } else {
          return `לפני ${yearsAgo} שנים`;
        }
        
      case 'universe':
        if (yearsAgo >= 1000000000) {
          return `לפני ${(yearsAgo / 1000000000).toFixed(1)} מיליארד שנים`;
        } else if (yearsAgo >= 1000000) {
          return `לפני ${Math.round(yearsAgo / 1000000)} מיליון שנים`;
        } else {
          return `לפני ${yearsAgo.toLocaleString()} שנים`;
        }
        
      case 'compressed':
        // Compress 13.7B years into 365 days
        const totalYears = 13700000000;
        const dayOfYear = Math.floor(((totalYears - yearsAgo) / totalYears) * 365);
        const month = Math.floor(dayOfYear / 30) + 1;
        const day = (dayOfYear % 30) + 1;
        
        if (dayOfYear < 1) {
          const hoursFromEnd = Math.floor(((totalYears - yearsAgo) / totalYears) * 365 * 24);
          return `${hoursFromEnd} שעות לפני סוף השנה`;
        }
        
        return `יום ${day} בחודש ${month}`;
        
      default:
        return event.timeAgo;
    }
  };

  const filteredEvents = events.filter(event => {
    if (currentPerspective === 'human') {
      return event.category === 'human' || event.category === 'civilization' || event.category === 'modern';
    }
    return true;
  });

  return (
    <div className="perspective-container p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">פרספקטיבות זמן שונות</h2>
        <p className="text-gray-600 text-lg">גלה איך נראית אותה היסטוריה מנקודות מבט שונות</p>
      </motion.div>

      {/* Perspective Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.entries(perspectives).map(([key, perspective]) => {
          const Icon = perspective.icon;
          const isActive = currentPerspective === key;
          
          return (
            <motion.button
              key={key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentPerspective(key as PerspectiveType)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                isActive 
                  ? 'border-blue-500 bg-blue-50 shadow-lg' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${perspective.color} flex items-center justify-center mx-auto mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{perspective.title}</h3>
              <p className="text-sm text-gray-600">{perspective.description}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Current Perspective Display */}
      <motion.div
        key={currentPerspective}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${perspectives[currentPerspective].color} flex items-center justify-center`}>
            {React.createElement(perspectives[currentPerspective].icon, { className: "w-4 h-4 text-white" })}
          </div>
          <h3 className="text-2xl font-semibold text-gray-800">
            {perspectives[currentPerspective].title}
          </h3>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-r-4 border-blue-400 bg-blue-50 p-4 rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{event.title}</h4>
                <span className="text-sm text-blue-600 font-medium">
                  {getEventInPerspective(event, currentPerspective)}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{event.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Perspective Insights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border-2 border-dashed border-gray-300"
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-gray-800">תובנה:</span>
          </div>
          <p className="text-gray-700">
            {getPerspectiveInsight(currentPerspective)}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

function getPerspectiveInsight(perspective: PerspectiveType): string {
  const insights = {
    human: 'מפרספקטיבה אנושית, כל הציוויליזציה המתועדת היא רק רגע קצר בהיסטוריה. אם חיי אדם הם שנייה אחת, אז כל ההיסטוריה המתועדת היא כ-100 שניות.',
    earth: 'אם כדור הארץ היה בן יום אחד, החיים היו מופיעים בשעה 6 בבוקר, הדינוזאורים בשעה 22:30, והאדם המודרני רק בשנייה האחרונה לפני חצות.',
    universe: 'ביקום בן 13.7 מיליארד שנים, כל ההיסטוריה האנושית מתרחשת ב-0.0007% האחרונים. זה כמו השניות האחרונות של שנה שלמה.',
    compressed: 'בשנה קוסמית, האדם המודרני מופיע רק בדקות האחרונות של 31 בדצמבר, וכל הציוויליזציה האנושית מתרחשת בשניות האחרונות לפני חצות.'
  };
  return insights[perspective];
}

export default PerspectiveToggle;
