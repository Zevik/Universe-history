import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { TimelineEvent } from '../data/timelineData';

interface StatisticsProps {
  events: TimelineEvent[];
  categories: Array<{ id: string; name: string; color: string }>;
}

const Statistics: React.FC<StatisticsProps> = ({ events, categories }) => {
  // Prepare data for category distribution
  const categoryData = categories.map(category => ({
    name: category.name,
    count: events.filter(event => event.category === category.id).length,
    color: category.color
  }));

  // Prepare data for significance distribution
  const significanceData = Array.from({ length: 10 }, (_, i) => ({
    significance: i + 1,
    count: events.filter(event => event.significance === i + 1).length
  }));

  // Prepare timeline data (simplified for demonstration)
  const timelineData = [
    { period: 'היקום הקדום', events: events.filter(e => e.category === 'universe').length },
    { period: 'כדור הארץ', events: events.filter(e => e.category === 'earth').length },
    { period: 'החיים', events: events.filter(e => e.category === 'life').length },
    { period: 'האדם', events: events.filter(e => e.category === 'human').length },
    { period: 'הציוויליזציה', events: events.filter(e => e.category === 'civilization').length },
    { period: 'העידן המודרני', events: events.filter(e => e.category === 'modern').length }
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c', '#8dd1e1'];

  return (
    <div className="statistics-container space-y-8 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">סטטיסטיקות ומידע כמותי</h2>
        <p className="text-gray-600 text-lg">גרפים ונתונים המציגים את התפלגות האירועים בהיסטוריה של היקום</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution - Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">התפלגות לפי קטגוריות</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Significance Distribution - Bar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">התפלגות רמת החשיבות</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={significanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="significance" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Timeline Events - Line Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">התפלגות אירועים לפי תקופות</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="period" 
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="events" fill="#82ca9d" name="מספר אירועים" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Summary Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">סיכום נתונים</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{events.length}</div>
            <div className="text-gray-600">סך האירועים</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {Math.round(events.reduce((sum, event) => sum + event.significance, 0) / events.length * 10) / 10}
            </div>
            <div className="text-gray-600">חשיבות ממוצעת</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{categories.length}</div>
            <div className="text-gray-600">קטגוריות</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">13.7B</div>
            <div className="text-gray-600">שנים מכוסות</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Statistics;
