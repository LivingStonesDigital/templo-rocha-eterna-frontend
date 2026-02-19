'use client'

import { useEffect, useState } from 'react'
import { usePWAInstall } from '@/hooks/usePWAInstall'

const DISMISS_DAYS = 7

export function PWAFitnessBanner() {
  const { install, isInstallable, isIos, isStandalone } =
    usePWAInstall()

  const [visible, setVisible] = useState(false)
  const [showIOSModal, setShowIOSModal] = useState(false)

  useEffect(() => {
    if (isStandalone) return

    // 1️⃣ Controle de visita
    const visits = Number(localStorage.getItem('app-visits') || 0) + 1
    localStorage.setItem('app-visits', String(visits))

    if (visits < 2) return

    // 2️⃣ Controle de dismiss por dias
    const dismissedAt = localStorage.getItem('pwa-dismissed-at')
    if (dismissedAt) {
      const diff =
        (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60 * 24)
      if (diff < DISMISS_DAYS) return
    }

    let hasScrolled = false

    const onScroll = () => {
      hasScrolled = true
    }

    window.addEventListener('scroll', onScroll)

    const timer = setTimeout(() => {
      if (hasScrolled) setVisible(true)
    }, 15000)

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [isStandalone])

  if (!visible || isStandalone) return null

  const handleInstall = () => {
    if (isInstallable) {
      install()
      setVisible(false)
    } else if (isIos) {
      setShowIOSModal(true)
    }
  }

  const handleClose = () => {
    localStorage.setItem('pwa-dismissed-at', String(Date.now()))
    setVisible(false)
  }

  return (
    <>
      {/* Banner Premium */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50">
        <div className="bg-gradient-to-r from-zinc-900 to-black text-white rounded-3xl p-5 shadow-2xl border border-white/10 backdrop-blur-xl animate-slideUp">
          
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm uppercase tracking-wider text-white/60">
                Performance Mode
              </p>
              <h3 className="text-lg font-bold mt-1">
                Instale o app e treine mais rápido
              </h3>
              <p className="text-sm text-white/70 mt-1">
                Acesso direto aos seus treinos, dieta e progresso.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="text-white/40 hover:text-white"
            >
              ✕
            </button>
          </div>

          <button
            onClick={handleInstall}
            className="mt-4 w-full bg-white text-black py-3 rounded-2xl font-semibold hover:scale-[1.02] transition"
          >
            Ativar agora
          </button>
        </div>
      </div>

      {/* Modal iOS Premium */}
      {showIOSModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 text-white p-6 rounded-3xl max-w-sm w-[90%] border border-white/10">
            <h2 className="text-xl font-bold mb-3">
              Ativar modo App 📲
            </h2>

            <p className="text-sm text-white/70 mb-4">
              1. Toque no botão de compartilhar 📤
              <br />
              2. Selecione “Adicionar à Tela de Início”
            </p>

            <button
              onClick={() => setShowIOSModal(false)}
              className="bg-white text-black w-full py-3 rounded-2xl font-semibold"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  )
}
