'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import QuoteModal from './components/QuoteModal'
import StarField from './components/StarField'
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
    month: '2-digit',
  })

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        maxWidth: '390px',
        height: '100dvh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0px',
        background: 'linear-gradient(180deg, #131313 0%, #0D073A 100%)',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      {/* ── Звёздный фон ── */}
      <StarField />

      {/* ── Контентная область (поверх звёзд) ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0px',
          width: '100%',
          padding: '0 25px',
        }}
      >
        {/* 1. ФРАЗА ДНЯ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            alignSelf: 'stretch',
            textAlign: 'center',
            fontSize: '40px',
            fontWeight: 590,
            lineHeight: '120%',
            letterSpacing: '-0.4px',
            whiteSpace: 'nowrap',
            opacity: 0.7,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.80) 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Мотивация дня
        </motion.div>

        {/* 2. ДАТА — вплотную к заголовку */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            alignSelf: 'stretch',
            textAlign: 'center',
            fontSize: '100px',
            fontWeight: 590,
            lineHeight: '105%',
            letterSpacing: '-1.2px',
            marginTop: '2px',
            opacity: 0.7,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.80) 0%, rgba(255,255,255,0.10) 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {today}
        </motion.div>

        {/* 3. КНОПКА */}
        <motion.button
          className="btn-open"
          onClick={openRandomQuote}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.91 }}
          style={{
            marginTop: '68px',
            display: 'flex',
            width: '180px',
            height: '180px',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            borderRadius: '90px',
            background: '#186DFF',
            cursor: 'pointer',
            fontSize: '20px',
            fontWeight: 590,
            color: 'white',
            letterSpacing: '-0.2px',
          }}
        >
          Открыть
        </motion.button>
      </div>

      <QuoteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        quote={currentQuote}
        onOpenNew={() => {
          const next = quotes[Math.floor(Math.random() * quotes.length)]
          setCurrentQuote(next)
        }}
      />
    </div>
  )
}
