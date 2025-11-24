"use client"

// components/SpinningCaseOpener.js yoki pages/index.js

import React, { useState, useRef, useEffect } from 'react';

// Bir buyumning o'lchami (CSSda ham o'zgartirilishi kerak)
const ITEM_WIDTH = 100; // Buyumning eni (px)
const TRANSITION_DURATION = 3.5; // Sekund (qancha vaqt aylanadi)

// --- 1. Randomizatsiya Mantig'i (Oldingi Javobdagi Kabi) ---
const openCase = (items) => {
  const itemNames = Object.keys(items);
  const weights = Object.values(items);
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let randomNum = Math.random() * totalWeight;

  for (let i = 0; i < itemNames.length; i++) {
    const itemName = itemNames[i];
    const weight = weights[i];

    if (randomNum < weight) {
      return { 
          item: itemName,
          index: i // Yutgan buyumning indeksini ham qaytaramiz
      };
    }
    randomNum -= weight;
  }
  return { item: "Xatolik", index: 0 };
};

// --- Komponentning O'zi ---
const SpinningCaseOpener = () => {
  const [currentDrops, setCurrentDrops] = useState({

    "qurilisk ibo": 25,
    "prafesser abu": 10,
    "jesco muslima": 25,
    "alone girl": 50,
    "semiz abdurauf": 21,
    "tarvuz abduraxmon": 5,
    "malika karates": 5,
    "nozila 15 pro": 5,
    "durbek prakuror": 1,

    
  });
  
  const [result, setResult] = useState("Keysni ochishni boshlang...");
  const [isSpinning, setIsSpinning] = useState(false);
  const [translateX, setTranslateX] = useState(0); // CSS transform uchun
  
  // Animatsiya to'xtagandan keyin to'g'ri yutuqni ko'rsatish uchun ishlatiladi
  const [winningItem, setWinningItem] = useState(null); 
  
  // Bizda kamida 5 marta to'liq aylanish bo'lishi kerak.
  const REVOLUTIONS = 5; 
  
  // Barcha buyumlarning ro'yxatini yutish ehtimoli bo'yicha tartiblab, 
  // lentani hosil qilish uchun 2 marta takrorlaymiz (silliq aylanish uchun)
  const sortedItems = Object.keys(currentDrops).sort((a, b) => currentDrops[a] - currentDrops[b]);
  const displayItems = [...sortedItems, ...sortedItems, ...sortedItems]; // 3 marta takrorlash

  // --- Keysni Ochish Funksiyasi ---
  const handleOpenCase = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult("🎰 Aylanmoqda...");
    
    // 1. Yutgan buyumni aniqlash
    const { item, index: winningIndexInSorted } = openCase(currentDrops);
    setWinningItem(item);
    
    // 2. Yutgan buyumning lentadagi joylashuvi (index)
    // Lentaning 2-qismida to'xtatish maqsadga muvofiq, bu silliq ko'rinish beradi.
    const finalIndex = winningIndexInSorted + sortedItems.length; 
    
    // 3. Qaysi nuqtada to'xtash kerakligini hisoblash
    // REVOLUTIONS * displayItems.length * ITEM_WIDTH - bu aylanishning minimal masofasi
    const baseOffset = (REVOLUTIONS * displayItems.length) * ITEM_WIDTH;
    
    // Final Offset: bazaviy aylanish + yutgan buyumga to'xtash joyi
    // ITEM_WIDTH / 2 qismi esa markazga to'g'irlash uchun
    const finalStopPosition = baseOffset + (finalIndex * ITEM_WIDTH) + (ITEM_WIDTH / 2);
    
    // Katta bir manfiy sonni o'rnatamiz (chapga siljitish)
    setTranslateX(-finalStopPosition);

    // 4. Animatsiya tugashini kutish
    setTimeout(() => {
      setIsSpinning(false);
      setResult(`🎉 YUTUQ! Sizga tushdi: **${item}**`);
      
      // Animatsiya tugagandan so'ng, tasmani 1-qismga qaytarish, 
      // yutgan buyum markazda turishi uchun. 
      // Bu next spin'ga tayyorgarlik.
      setTranslateX(-(finalIndex * ITEM_WIDTH + ITEM_WIDTH / 2)); 
    }, TRANSITION_DURATION * 1000);
  };
  
  // --- CSS Uslublari (Inline va style tag orqali) ---
  const spinnerStyle = {
    display: 'flex',
    transition: isSpinning ? `transform ${TRANSITION_DURATION}s cubic-bezier(0.25, 0.1, 0.25, 1)` : 'none', // Silliq sekinlashish
    transform: `translateX(${translateX}px)`,
    width: `${displayItems.length * ITEM_WIDTH}px`,
  };

  const itemStyle = {
    width: `${ITEM_WIDTH}px`,
    minWidth: `${ITEM_WIDTH}px`,
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
    margin: '0 2px',
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '14px',
  };

  const containerStyle = {
    overflow: 'hidden',
    width: '600px', // Ko'rinadigan maydon
    border: '3px solid #34495e',
    borderRadius: '10px',
    position: 'relative',
    margin: '20px auto',
  };
  
  const markerStyle = {
    position: 'absolute',
    left: '50%',
    top: 0,
    width: '2px',
    height: '100%',
    backgroundColor: 'red',
    zIndex: 10,
    transform: 'translateX(-50%)',
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1>🎰 Aylanadigan Keys (JSX + CSS)</h1>
      <p>Buyumlar ehtimollik bo'yicha tanlanadi, keyin animatsiya yutuqqa to'xtaydi.</p>

      {/* Aylanadigan Konteyner */}
      <div style={containerStyle}>
        <div style={markerStyle}></div> {/* Markazni belgilash */}
        <div style={spinnerStyle}>
          {displayItems.map((item, index) => (
            <div 
              key={index} 
              style={{
                ...itemStyle,
                // Eng kamyob buyumlar uchun alohida rang berish
                backgroundColor: currentDrops[item] < 2 ? '#f1c40f' : '#f9f9f9',
                fontWeight: currentDrops[item] < 2 ? 'bold' : 'normal',
                color: currentDrops[item] < 2 ? '#c0392b' : '#333'
              }}
              title={`Vazn: ${currentDrops[item] || 'N/A'}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      
      {/* Boshqarish va Natija */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{result}</p>
        <button 
          onClick={handleOpenCase} 
          disabled={isSpinning}
          style={{ 
            padding: '12px 30px', 
            fontSize: '18px', 
            cursor: isSpinning ? 'not-allowed' : 'pointer', 
            backgroundColor: isSpinning ? '#bdc3c7' : '#e74c3c', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px' 
          }}
        >
          {isSpinning ? "Aylanmoqda..." : "KEYSNI OCHISH"}
        </button>
      </div>

      <hr style={{ marginTop: '30px' }}/>

      {/* Ehtimollik Ro'yxati (Boshqaruv) */}
      <h3>Joriy Buyumlar ({Object.keys(currentDrops).length} ta)</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {Object.entries(currentDrops).map(([item, weight]) => (
          <li key={item} style={{ padding: '4px 0' }}>
            **{item}**: Vazn - {weight} {weight < 2 && "(Kamyob)"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpinningCaseOpener;