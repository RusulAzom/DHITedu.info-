# AI Agent Specification & Implementation Guide (Web Portal)
> **Project**: DHIT e-Care Web Platform & Admin Panel  
> **Architecture**: Serverless / Decoupled (React.js + Firebase Firestore)  
> **Target Audience**: Web Users & Branch Administrators in Bangladesh  

---

## 🎯 Directives for AI Coding Agents

You are tasked with generating, modifying, and maintaining code **exclusively for the Web Application and Admin Portal (React.js)**. 

All implementations must strictly follow a **Mobile-First Responsive Design** and a **Zero-Backend / Firebase Firestore** architecture. Do not introduce custom Node.js, Express, or SQL server dependencies. All web content, notices, doctor lists, and system settings must sync directly via Cloud Firestore.

---

## 📐 System Context & Data Flow

+-----------------------------------------------------+
|  React.js Web Application / Admin Portal            |
|  (Mobile-First Web UI Hosted on Vercel - $0 Tier)   |
+-----------------------------------------------------+
|                           ^
| Writes / Updates          |
| JSON Documents            |
| Reads via                 |
| onSnapshot()              |
v
+-----------------------------------------------------+
|  Firebase Cloud Firestore                           |
|  (Real-Time NoSQL Database Engine)                  |
+-----------------------------------------------------+

---

## 📱 Mobile-First Web Design Guidelines

All UI styling must be built **Mobile-First** (designed for standard mobile screen widths of `320px` to `480px` first) and progressively enhanced for tablet and desktop viewports using CSS media queries.

* **Mobile (Default)**: `320px – 767px` (Single column layout, bottom or sticky navigation bar)
* **Tablet**: `768px – 1023px` (Two-column layout)
* **Desktop**: `1024px+` (Centered viewport, max-width `1280px`, multi-column cards)

---

## 🎨 Branding Tokens & Style Constants

All web components must use these core visual parameters:

```javascript
export const ThemeTokens = {
  colors: {
    primaryGreen: "#0A7F2E", // CTA buttons, wallet badge, active states
    secondaryBlue: "#005F9E", // Category banners, course badges
    alertRed: "#D9383A",      // Ticker notices, critical alerts
    bgLight: "#F7F9FC",       // App-wide light background
    cardWhite: "#FFFFFF",     // Card containers
    textDark: "#1A1A1A",      // Main headings and primary text
    textMuted: "#777777",     // Subtitles, dates, disabled states
    borderGray: "#ECECEC"     // Light borders
  },
  borderRadius: {
    card: "12px",
    badge: "20px",
    button: "8px"
  },
  typography: {
    fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif"
  }
};
```

---

## 📂 Firestore Database Schema Reference

AI agents must query and write web data using these specific collection structures:

### 1. Collection: `app_config` | Document ID: `home_page`

```json
{
  "ticker_message": "জ্বর হলেই এন্টিবায়োটিক নয় - ডা. রাসেল • গর্ভবতী মায়েদের যত্ন নিন",
  "ambulance_enabled": false,
  "live_tv_url": "https://youtube.com/live/dhit-stream",
  "earning_coins": 1250
}
```

### 2. Collection: `news`

```json
{
  "id": "news_001",
  "title": "জ্বর হলেই এন্টিবায়োটিক নয় - সচেতন হোন",
  "content": "পল্লী চিকিৎসায় সাধারণ জ্বর, সর্দি ও কাশির জন্য প্রথমেই এন্টিবায়োটিক ব্যবহার করা অনুচিত...",
  "date": "2026-08-10"
}
```

### 3. Collection: `doctors`

```json
{
  "id": "doc_001",
  "name": "ডা. মাহফুজুর রহমান (MBBS)",
  "specialty": "মা ও শিশু রোগ বিশেষজ্ঞ",
  "fee": "৳৫০০",
  "available": true
}
```

---

## 🛠️ Canonical Web Code Implementation

### Step 1: Web Firebase Initializer (`src/config/firebase.js`)

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0f7pSonnjVhIAbx5LbBCarFXQ51vxXOg",
  authDomain: "dhit-platform.firebaseapp.com",
  projectId: "dhit-platform",
  storageBucket: "dhit-platform.firebasestorage.app",
  messagingSenderId: "446126800106",
  appId: "1:446126800106:web:d1732f3d9b1657ed29eb93",
  measurementId: "G-QM266JV4X6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
```

---

### Step 2: Web Real-time News Ticker (`src/components/NewsTicker.jsx`)

```javascript
import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function NewsTicker() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "news"), (snapshot) => {
      const articles = snapshot.docs.map(doc => doc.data());
      setNewsList(articles);
    });
    return () => unsubscribe();
  }, []);

  if (newsList.length === 0) return null;

  const fullTickerText = newsList.map(item => item.title).join('  •  ');

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#FFF',
      padding: '8px 12px',
      borderRadius: '8px',
      border: '1px solid #ECECEC',
      overflow: 'hidden',
      margin: '12px'
    }}>
      <span style={{
        backgroundColor: '#D9383A',
        color: '#FFF',
        fontSize: '11px',
        fontWeight: 'bold',
        padding: '4px 8px',
        borderRadius: '4px',
        whiteSpace: 'nowrap',
        marginRight: '10px'
      }}>
        🚨 নোটিশ
      </span>
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <marquee style={{ fontSize: '13px', color: '#555', fontWeight: '500' }}>
          {fullTickerText}
        </marquee>
      </div>
    </div>
  );
}
```

---

### Step 3: Admin Live Control Component (`src/components/AdminNoticeUpdater.jsx`)

```jsx
import React, { useState } from 'react';
import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function AdminNoticeUpdater() {
  const [noticeText, setNoticeText] = useState('');

  const handleUpdateNotice = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "app_config", "home_page"), {
        ticker_message: noticeText
      }, { merge: true });
      alert("Notice updated live on Web Portal!");
      setNoticeText('');
    } catch (err) {
      console.error("Write error: ", err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '480px', margin: '0 auto', backgroundColor: '#FFF', borderRadius: '12px' }}>
      <h3 style={{ color: '#0A7F2E', marginBottom: '12px' }}>Web Notice Manager</h3>
      <form onSubmit={handleUpdateNotice}>
        <input 
          type="text" 
          value={noticeText}
          onChange={(e) => setNoticeText(e.target.value)}
          placeholder="Enter new notice message..."
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '12px',
            borderRadius: '6px',
            border: '1px solid #ECECEC',
            boxSizing: 'border-box'
          }}
        />
        <button 
          type="submit" 
          style={{
            width: '100%',
            backgroundColor: '#0A7F2E',
            color: '#FFF',
            padding: '12px',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Publish to Web
        </button>
      </form>
    </div>
  );
}
```

---

## 🚫 Web Guardrails & Technical Constraints

* No Node/Express Backend Queries: Do not generate REST endpoints like `axios.get('/api/v1/news')`. Perform all database reads/writes via Cloud Firestore methods (`onSnapshot`, `setDoc`, `getDocs`).
* Mobile Touch Target Mandate: Interactive inputs, links, and buttons must have a minimum tap target height of `44px` for mobile web viewports.
* Optimized CSS Constraints: Ensure layout components use fluid widths (`max-width: 1200px; width: 100%`) so the website scales gracefully from mobile browsers to desktop screens.

## 🚫 Web Guardrails & Technical Constraints

* No Node/Express Backend Queries: Do not generate REST endpoints like `axios.get('/api/v1/news')`. Perform all database reads/writes via Cloud Firestore methods (`onSnapshot`, `setDoc`, `getDocs`).
* Mobile Touch Target Mandate: Interactive inputs, links, and buttons must have a minimum tap target height of `44px` for mobile web viewports.
* Optimized CSS Constraints: Ensure layout components use fluid widths (`max-width: 1200px; width: 100%`) so the website scales gracefully from mobile browsers to desktop screens.
