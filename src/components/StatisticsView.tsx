import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';
import { TimelineEvent } from '../data/timelineData';

interface Category {
  id: string;
  name: string;
  color: string;
}

interface StatisticsViewProps {
  events: TimelineEvent[];
  categories: Category[];
}

const StatisticsView: React.FC<StatisticsViewProps> = ({ events, categories }) => {
  // Process data for category distribution
  const categoryData = categories.map(category => ({
    name: category.name,
    value: events.filter(event => event.category === category.id).length,
    color: category.color
  }));

  // Process data for significance distribution
  const significanceData = [
    { name: '1-2', value: events.filter(e => e.significance <= 2).length },
    { name: '3-4', value: events.filter(e => e.significance > 2 && e.significance <= 4).length },
    { name: '5-6', value: events.filter(e => e.significance > 4 && e.significance <= 6).length },
    { name: '7-8', value: events.filter(e => e.significance > 6 && e.significance <= 8).length },
    { name: '9-10', value: events.filter(e => e.significance > 8).length }
  ];

  // Process data for timeline evolution (events per era)
  const timelineData = [
    { era: 'היקום הקדום', events: events.filter(e => e.category === 'universe').length },
    { era: 'כדור הארץ', events: events.filter(e => e.category === 'earth').length },
    { era: 'החיים', events: events.filter(e => e.category === 'life').length },
    { era: 'האדם', events: events.filter(e => e.category === 'human').length },
    { era: 'ציוויליזציה', events: events.filter(e => e.category === 'civilization').length },
    { era: 'עידן מודרני', events: events.filter(e => e.category === 'modern').length }
  ];

  const insights = [
    {
      title: 'תובנה 1: זמן האירועים',
      content: 'רוב האירועים המשמעותיים בהיסטוריית היקום התרחשו במהלך 4.5 מיליארד השנים האחרונות'
    },
    {
      title: 'תובנה 2: קצב ההתפתחות',
      content: 'קצב השינוי באדמה מואץ באופן דרמטי - מדעת אנושית תוך אלפי שנים בלבד'
    },
    {
      title: 'תובנה 3: חשיבות האירועים',
      content: 'האירועים החשובים ביותר קשורים להופעת החיים ופיתוח הבינה'
    }
  ];

  return (
    <motion.div
      key="statistics"
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
          סטטיסטיקות וגרפים
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 lg:p-6 border border-white/20"
          >
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 text-center">
              התפלגות אירועים לפי קטגוריה
            </h3>
            <div className="h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={window.innerWidth < 768 ? 80 : 120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Significance Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 lg:p-6 border border-white/20"
          >
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 text-center">
              התפלגות לפי רמת חשיבות
            </h3>
            <div className="h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={significanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="white" 
                    tick={{ fill: 'white', fontSize: window.innerWidth < 768 ? 12 : 14 }}
                  />
                  <YAxis 
                    stroke="white" 
                    tick={{ fill: 'white', fontSize: window.innerWidth < 768 ? 12 : 14 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="url(#barGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Timeline Evolution */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-4 lg:p-6 border border-white/20 mb-8"
        >
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 text-center">
            התפתחות האירועים לאורך ציר הזמן
          </h3>
          <div className="h-64 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="era" 
                  stroke="white" 
                  tick={{ fill: 'white', fontSize: window.innerWidth < 768 ? 10 : 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={window.innerWidth < 768 ? 80 : 60}
                />
                <YAxis 
                  stroke="white" 
                  tick={{ fill: 'white', fontSize: window.innerWidth < 768 ? 12 : 14 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="events" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#F59E0B' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        >
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-md rounded-xl p-4 lg:p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300"
            >
              <h4 className="text-lg lg:text-xl font-bold text-white mb-3">
                {insight.title}
              </h4>
              <p className="text-gray-200 text-sm lg:text-base leading-relaxed">
                {insight.content}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-4 lg:p-6 border border-white/20"
        >
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 text-center">
            סיכום סטטיסטי
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-blue-400">{events.length}</div>
              <div className="text-gray-300 text-sm lg:text-base">סך אירועים</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-green-400">{categories.length}</div>
              <div className="text-gray-300 text-sm lg:text-base">קטגוריות</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-yellow-400">
                {Math.round(events.reduce((sum, e) => sum + e.significance, 0) / events.length)}
              </div>
              <div className="text-gray-300 text-sm lg:text-base">חשיבות ממוצעת</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-purple-400">
                {events.filter(e => e.significance >= 9).length}
              </div>
              <div className="text-gray-300 text-sm lg:text-base">אירועים קריטיים</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatisticsView;
