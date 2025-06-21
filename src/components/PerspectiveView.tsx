import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Globe, Calendar, Zap } from 'lucide-react';
import { TimelineEvent } from '../data/timelineData';

interface PerspectiveViewProps {
  events: TimelineEvent[];
}

const PerspectiveView: React.FC<PerspectiveViewProps> = ({ events }) => {
  const [selectedPerspective, setSelectedPerspective] = useState<'human' | 'cosmic' | 'relative' | 'logarithmic'>('human');

  // Helper function to convert time ago to years
  const timeToYears = (timeAgo: string): number => {
    if (timeAgo.includes('מיליארד שנה')) {
      return parseFloat(timeAgo) * 1_000_000_000;
    } else if (timeAgo.includes('מיליון שנה')) {
      return parseFloat(timeAgo) * 1_000_000;
    } else if (timeAgo.includes('אלף שנה')) {
      return parseFloat(timeAgo) * 1_000;
    } else if (timeAgo.includes('שנה')) {
      return parseFloat(timeAgo);
    }
    return 0;
  };

  // Sort events by time
  const sortedEvents = [...events].sort((a, b) => timeToYears(b.timeAgo) - timeToYears(a.timeAgo));

  const perspectives = [
    {
      id: 'human' as const,
      name: 'פרספקטיבה אנושית',
      icon: <Clock className="w-5 h-5 lg:w-6 lg:h-6" />,
      description: 'מבט מנקודת מבט של חיי האדם (80 שנה)',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'cosmic' as const,
      name: 'פרספקטיבה קוסמית',
      icon: <Globe className="w-5 h-5 lg:w-6 lg:h-6" />,
      description: 'מבט מנקודת מבט של גיל היקום (13.8 מיליארד שנה)',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'relative' as const,
      name: 'זמן יחסי',
      icon: <Calendar className="w-5 h-5 lg:w-6 lg:h-6" />,
      description: 'השוואה בין משכי זמן שונים',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'logarithmic' as const,
      name: 'סקלה לוגריתמית',
      icon: <Zap className="w-5 h-5 lg:w-6 lg:h-6" />,
      description: 'הצגה לוגריתמית של זמן',
      color: 'from-orange-500 to-red-600'
    }
  ];
  const renderHumanPerspective = () => {
    const significantEvents = sortedEvents.filter(event => timeToYears(event.timeAgo) <= 100000);

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            בפרספקטיבה אנושית
          </h3>
          <p className="text-gray-300 text-sm lg:text-base max-w-3xl mx-auto">
            אם נדמיין שחיי האדם הם 80 שנה, כיצד נראה ציר הזמן?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {significantEvents.slice(0, 9).map((event, index) => {
            const yearsAgo = timeToYears(event.timeAgo);
            const humanEquivalent = yearsAgo < 1000 ? 'כמה שניות' : 
                                   yearsAgo < 10000 ? 'כמה דקות' :
                                   yearsAgo < 100000 ? 'כמה שעות' : 'כמה ימים';

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 lg:p-6 border border-white/20"
              >
                <h4 className="text-lg font-bold text-white mb-2">
                  {event.title}
                </h4>
                <p className="text-blue-200 text-sm mb-2">
                  {event.timeAgo}
                </p>
                <p className="text-green-300 text-sm font-medium">
                  בחיי אדם: {humanEquivalent}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCosmicPerspective = () => {
    const universeAge = 13.8e9; // years

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            בפרספקטיבה קוסמית
          </h3>
          <p className="text-gray-300 text-sm lg:text-base max-w-3xl mx-auto">
            אם נדמיין שההיסטוריה כולה של היקום היא שנה אחת...
          </p>
        </div>

        <div className="space-y-4">
          {sortedEvents.slice(0, 12).map((event, index) => {
            const yearsAgo = timeToYears(event.timeAgo);
            const cosmicDate = new Date();
            cosmicDate.setMonth(11); // December
            cosmicDate.setDate(31);
            
            const dayOfYear = Math.max(1, Math.floor(365 * (1 - yearsAgo / universeAge)));
            const cosmicMonth = Math.floor((dayOfYear - 1) / 30.44);
            const cosmicDay = Math.floor((dayOfYear - 1) % 30.44) + 1;

            const months = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
                          'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 lg:p-6 border border-white/20 flex flex-col lg:flex-row lg:items-center gap-4"
              >
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white mb-2">
                    {event.title}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {event.description}
                  </p>
                </div>
                <div className="text-left lg:text-right lg:min-w-32">
                  <p className="text-blue-200 text-sm mb-1">
                    {event.timeAgo}
                  </p>
                  <p className="text-purple-300 text-sm font-medium">
                    {cosmicDay} {months[cosmicMonth]}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderRelativePerspective = () => {
    const referenceEvents = [
      { name: 'גיל היקום', years: 13.8e9 },
      { name: 'היווצרות כדור הארץ', years: 4.54e9 },
      { name: 'הופעת החיים', years: 3.8e9 },
      { name: 'הכחדת הדינוזאורים', years: 66e6 },
      { name: 'הופעת ההומו סאפיינס', years: 300000 },
      { name: 'מהפכה חקלאית', years: 10000 },
      { name: 'מהפכה תעשייתית', years: 250 }
    ];

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            השוואת זמנים
          </h3>
          <p className="text-gray-300 text-sm lg:text-base max-w-3xl mx-auto">
            השוואה ויזואלית בין משכי זמן שונים
          </p>
        </div>

        <div className="space-y-4">
          {referenceEvents.map((ref, index) => {
            const widthPercent = Math.log10(ref.years) / Math.log10(13.8e9) * 100;
            
            return (
              <motion.div
                key={ref.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 lg:p-6 border border-white/20"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-2">
                      {ref.name}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {ref.years >= 1e9 ? `${(ref.years / 1e9).toFixed(1)} מיליארד שנה` :
                       ref.years >= 1e6 ? `${(ref.years / 1e6).toFixed(1)} מיליון שנה` :
                       ref.years >= 1e3 ? `${(ref.years / 1e3).toFixed(0)} אלף שנה` :
                       `${ref.years} שנה`}
                    </p>
                  </div>
                  <div className="w-full lg:w-96 bg-gray-700 rounded-full h-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${widthPercent}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderLogarithmicPerspective = () => {
    const logEvents = sortedEvents.map(event => ({
      ...event,
      logYears: Math.log10(Math.max(1, timeToYears(event.timeAgo)))
    }));

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            סקלה לוגריתמית
          </h3>
          <p className="text-gray-300 text-sm lg:text-base max-w-3xl mx-auto">
            הצגת האירועים בסקלה לוגריתמית לטיפול בטווחי זמן עצומים
          </p>
        </div>        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {logEvents.slice(0, 10).map((event, index) => {
            const logValue = event.logYears;
            const intensity = Math.min(100, (logValue / 10) * 100);

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 lg:p-6 border border-white/20 relative overflow-hidden"
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-500/20"
                  style={{ width: `${intensity}%` }}
                />
                <div className="relative z-10">
                  <h4 className="text-lg font-bold text-white mb-2">
                    {event.title}
                  </h4>
                  <p className="text-blue-200 text-sm mb-2">
                    {event.timeAgo}
                  </p>
                  <p className="text-yellow-300 text-sm font-medium">
                    לוג: {logValue.toFixed(1)} (10^{logValue.toFixed(1)} שנים)
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (selectedPerspective) {
      case 'human':
        return renderHumanPerspective();
      case 'cosmic':
        return renderCosmicPerspective();
      case 'relative':
        return renderRelativePerspective();
      case 'logarithmic':
        return renderLogarithmicPerspective();
      default:
        return renderHumanPerspective();
    }
  };

  return (
    <motion.div
      key="perspective"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4 lg:p-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl lg:text-4xl font-bold text-center text-white mb-8 lg:mb-12"
        >
          פרספקטיבות זמן
        </motion.h2>

        {/* Perspective Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 lg:mb-12">
          {perspectives.map((perspective, index) => (
            <motion.button
              key={perspective.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedPerspective(perspective.id)}
              className={`p-4 lg:p-6 rounded-xl border-2 transition-all duration-300 ${
                selectedPerspective === perspective.id
                  ? 'border-white bg-white/20'
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r ${perspective.color} mb-4`}>
                {perspective.icon}
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-2">
                {perspective.name}
              </h3>
              <p className="text-gray-300 text-xs lg:text-sm">
                {perspective.description}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPerspective}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PerspectiveView;
