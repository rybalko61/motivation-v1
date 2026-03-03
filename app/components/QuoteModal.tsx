'use client'
import React, { useEffect, useState } from 'react'
import { Quote } from '../../types/quote'

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
  quote: Quote
}

export default function QuoteModal({ isOpen, onClose, quote }: QuoteModalProps) {
  const [showQuote, setShowQuote] = useState(false)
  const [showButtons, setShowButtons] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowQuote(true), 200)
      setTimeout(() => setShowButtons(true), 1200)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* BLUR БЭКГРАУНД */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.05)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          zIndex: 999,
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onClick={onClose}
      />

      {/* МОДАЛКА — ФИКСИРОВАННЫЙ ЛЕЙАУТ 60px */}
      <div 
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${isOpen ? 1 : 0.8})`,
          width: '390px',
          height: '844px',
          background: 'linear-gradient(180deg, #131313 0%, #0D073A 100%)',
          borderRadius: '24px',
          zIndex: 1000,
          opacity: isOpen ? 1 : 0,
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // ← ЦЕНТРИРОВАНИЕ
          padding: '60px 25px', // ← 60px сверху/снизу
          gap: '60px', // ← 60px МЕЖДУ ЦИТАТОЙ И КНОПКАМИ
          justifyContent: 'center' // ← ПО ЦЕНТРУ
        }}
      >
        {/* ЦИТАТА */}
        <div 
          style={{
            color: '#FFF',
            fontSize: '20px',
            fontWeight: 590,
            lineHeight: '170%',
            letterSpacing: '-0.2px',
            textAlign: 'center',
            opacity: showQuote ? 1 : 0,
            transform: showQuote ? 'translateY(0)' : 'translateY(-30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
            flex: 1, // ← Занимает доступное место
            display: 'flex',
            alignItems: 'center'
          }}
        >
          "{quote.text}"
        </div>

        {/* КНОПКИ */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
            opacity: showButtons ? 1 : 0,
            transform: showButtons ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1.2s'
          }}
        >
          <button
            onClick={() => {
              onClose()
              setTimeout(() => window.location.reload(), 300)
            }}
            style={{
              display: 'flex',
              padding: '20px 0',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              alignSelf: 'stretch',
              border: 'none',
              borderRadius: '200px',
              background: '#186DFF',
              boxShadow: '0 9px 30px 6px rgba(75, 140, 254, 0.30), 0 -6px 9px 0 rgba(255, 255, 255, 0.25) inset, 0 7px 7px 0 rgba(6, 73, 187, 0.50) inset, 0 16px 9px 0 rgba(255, 255, 255, 0.35) inset',
              color: 'white',
              fontWeight: 590,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Открыть еще одну
          </button>

          <button
            onClick={() => {
              window.open(`https://t.me/share/url?url=${window.location.href}&text="${quote.text}"`, '_blank')
            }}
            style={{
              display: 'flex',
              padding: '20px 0',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '4px',
              alignSelf: 'stretch',
              border: 'none',
              borderRadius: '48px',
              background: '#FFF',
              color: '#186DFF',
              fontWeight: 590,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Поделиться в Telegram
          </button>
        </div>
      </div>
    </>
  )
}
