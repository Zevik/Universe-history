<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# אתר ההיסטוריה של היקום - הנחיות למפתחים

## תיאור הפרויקט
אתר לימודי אינטראקטיבי המציג את ההיסטוריה המלאה של היקום מהמפץ הגדול ועד מהפכת הבינה המלאכותית.

## טכנולוגיות בשימוש
- **React 18** עם TypeScript
- **Vite** ככלי build
- **Framer Motion** לאנימציות
- **Recharts** לגרפים ותרשימים
- **Tailwind CSS** לעיצוב
- **Lucide React** לאייקונים

## מבנה הפרויקט
```
src/
├── components/          # קומפוננטים של React
├── data/               # נתונים של ציר הזמן
├── App.tsx             # קומפוננט ראשי
└── index.css           # סגנונות CSS

```

## עקרונות פיתוח
1. **כתיבה בעברית** - כל התוכן באתר בעברית מימין לשמאל (RTL)
2. **נגישות** - תמיכה מלאה בנגישות ובקוראי מסך
3. **רספונסיביות** - התאמה מלאה לכל גדלי מסך
4. **ביצועים** - אנימציות חלקות וטעינה מהירה
5. **חוויית משתמש** - אינטראקטיביות ומעבר חלק בין תוכן

## הנחיות קוד
- השתמש ב-TypeScript עם types מחמירים
- כל הקומפוננטים צריכים להיות functional components עם hooks
- השתמש ב-Framer Motion לכל האנימציות
- שמור על עקביות בשימוש ב-Tailwind classes
- כל הטקסטים צריכים להיות בעברית

## דוגמאות לקומפוננטים
```tsx
// דוגמה לקומפוננט עם אנימציה
import { motion } from 'framer-motion';

const ExampleComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">כותרת בעברית</h2>
    </motion.div>
  );
};
```

## תוכן האתר
האתר מכיל את הקטגוריות הבאות:
- **היקום** - מהמפץ הגדול ועד היווצרות כוכבים
- **כדור הארץ** - היווצרות כדור הארץ והירח
- **החיים** - התפתחות החיים על פני כדור הארץ
- **האדם** - התפתחות האדם מהקופים
- **הציוויליזציה** - פיתוח החקלאות והכתב
- **העידן המודרני** - ממהפכה תעשייתית ועד AI
