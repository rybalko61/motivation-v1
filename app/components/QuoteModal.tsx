'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Quote } from '../../utils/quotes'

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
  quote: Quote
  onOpenNew?: () => void
}

// ── Easing ───────────────────────────────────────────────────────
const ease = [0.25, 0.46, 0.45, 0.94] as const

export default function QuoteModal({ isOpen, onClose, quote, onOpenNew }: QuoteModalProps) {

  const handleOpenNew = () => {
    onOpenNew?.()
    // quote уже обновлён в parent через onOpenNew — модалка остаётся открытой
  }

  const handleShare = () => {
    const text = encodeURIComponent(`"${quote.text}" — ${quote.author}`)
    const url = encodeURIComponent('https://t.me/motivation_of_day_bot')
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Blur-overlay (фон из скрина — размытый основной экран) ── */}
          <motion.div
            key="backdrop"
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 4, 30, 0.55)',
              zIndex: 998,
            }}
          />

          {/* ── Модальное окно — fullscreen ── */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.88, x: '-50%' }}
            animate={{ opacity: 1, scale: 1,  x: '-50%' }}
            exit={{ opacity: 0, scale: 0.88,  x: '-50%' }}
            transition={{ duration: 0.4, ease }}
            style={{
              position: 'fixed',
              top: 0,
              left: '50%',
              width: '100%',
              maxWidth: '390px',
              height: '100dvh',
              background: 'linear-gradient(180deg, rgba(19,19,19,0.97) 0%, rgba(13,7,58,0.97) 100%)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              padding: '0 25px',
              paddingTop: 'calc(52px + env(safe-area-inset-top))',
              paddingBottom: 'calc(40px + env(safe-area-inset-bottom))',
            }}
          >
            {/* ── Кнопка закрытия (X) ── */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3, ease }}
              onClick={onClose}
              whileHover={{ scale: 1.12, opacity: 0.8 }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: 'absolute',
                top: 'calc(20px + env(safe-area-inset-top))',
                right: '20px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.10)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              <X size={18} strokeWidth={2.2} />
            </motion.button>

            {/* ── Текст цитаты — занимает свободное место ── */}
            <motion.div
              key={quote.text}
              initial={{ opacity: 0, y: -28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.55, ease }}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <p
                style={{
                  color: '#FFFFFF',
                  fontSize: '20px',
                  fontWeight: 590,
                  lineHeight: '170%',
                  letterSpacing: '-0.2px',
                  textAlign: 'left',
                }}
              >
                {quote.text}
              </p>
            </motion.div>

            {/* ── Кнопки ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.45, ease }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '100%',
              }}
            >
              {/* Кнопка «Открыть ещё одну» */}
              <motion.button
                whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOpenNew}
                style={{
                  display: 'flex',
                  padding: '20px 0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: 'none',
                  borderRadius: '200px',
                  background: '#186DFF',
                  boxShadow:
                    '0 9px 30px 6px rgba(75,140,254,0.30), 0 -6px 9px 0 rgba(255,255,255,0.25) inset, 0 7px 7px 0 rgba(6,73,187,0.50) inset, 0 16px 9px 0 rgba(255,255,255,0.35) inset',
                  color: 'white',
                  fontSize: '17px',
                  fontWeight: 590,
                  letterSpacing: '-0.2px',
                  cursor: 'pointer',
                  transition: 'filter 0.25s ease',
                }}
              >
                Открыть еще одну
              </motion.button>

              {/* Кнопка «Поделиться в Telegram» */}
              <motion.button
                whileHover={{ scale: 1.02, filter: 'brightness(0.96)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleShare}
                style={{
                  display: 'flex',
                  padding: '20px 0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: 'none',
                  borderRadius: '200px',
                  background: '#FFFFFF',
                  color: '#186DFF',
                  fontSize: '17px',
                  fontWeight: 590,
                  letterSpacing: '-0.2px',
                  cursor: 'pointer',
                  transition: 'filter 0.25s ease',
                }}
              >
                Поделиться в Telegram
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
