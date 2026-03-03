'use client'
import React, { useState } from 'react'
import QuoteModal from './components/QuoteModal'
import { quotes } from '../utils/quotes'

export default function Page() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(quotes[0])

  const openRandomQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setCurrentQuote(randomQuote)
    setIsOpen(true)
  }

  const today = new Date().toLocaleDateString('ru-RU', { 
    day: '2-digit', 
    month: '2-digit' 
  })

  return (
    <div style={{
      display: 'flex',
      width: '390px',
      height: '100vh',
      padding: '176px 25px',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '69px',
      background: 'linear-gradient(180deg, #131313 0%, #0D073A 100%)',
      margin: '0 auto',
      fontFamily: '"SF Pro", -apple-system, system-ui, sans-serif',
      overflow: 'hidden'
    }}>
      
      {/* 1. ФРАЗА ДНЯ */}
      <div style={{
        alignSelf: 'stretch',
        textAlign: 'center',
        fontSize: '70px',
        fontWeight: 590,
        lineHeight: '140%',
        letterSpacing: '-0.7px',
        opacity: 0.7,
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.80) 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Фраза дня
      </div>

      {/* 2. ДАТА (-20px от фразы) */}
      <div style={{
        alignSelf: 'stretch',
        textAlign: 'center',
        fontSize: '120px',
        fontWeight: 590,
        lineHeight: '140%',
        letterSpacing: '-1.2px',
        opacity: 0.7,
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.10) 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginTop: '-20px' // ← -20px отступ
      }}>
        {today}
      </div>

      {/* 3. КРУГЛАЯ КНОПКА */}
      <button
        onClick={openRandomQuote}
        style={{
          display: 'flex',
          width: '180px',
          height: '180px',
          padding: '40px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          border: 'none',
          borderRadius: '90px', // ← ИДЕАЛЬНО КРУГАЯ
          background: '#186DFF',
          boxShadow: '0 9px 30px 6px rgba(75, 140, 254, 0.30), 0 -6px 9px 0 rgba(255, 255, 255, 0.25) inset, 0 7px 7px 0 rgba(6, 73, 187, 0.50) inset, 0 16px 9px 0 rgba(255, 255, 255, 0.35) inset',
          cursor: 'pointer',
          fontSize: '20px',
          fontWeight: 590,
          color: 'white',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        Открыть
      </button>

      <QuoteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        quote={currentQuote}
      />
    </div>
  )
}
