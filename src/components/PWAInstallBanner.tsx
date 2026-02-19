'use client'

import { useEffect, useState } from 'react'
import { usePWAInstall } from '@/hooks/usePWAInstall'

export function PWAInstallBanner({ delay = 5000 }) {
  const { install, isInstallable, isIos, isStandalone } =
    usePWAInstall()

  const [visible, setVisible] = useState(false)
  const [showIOSModal, setShowIOSModal] = useState(false)

  useEffect(() => {
    if (isStandalone) return

    const dismissed = localStorage.getItem('pwa-banner-dismissed')
    if (dismissed) return

    const timer = setTimeout(() => {
      setVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, isStandalone])

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
    localStorage.setItem('pwa-banner-dismissed', 'true')
    setVisible(false)
  }

  return (
    <>
      {/* Banner */}
      <div className="fixed bottom-4 left-4 right-4 z-50">
        <div className="bg-black text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4 animate-slideUp">
          <div>
            <p className="font-semibold">Instale nosso app</p>
            <p className="text-sm opacity-80">
              Acesse mais rápido direto da sua tela inicial.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleInstall}
              className="bg-white text-black px-3 py-2 rounded-xl text-sm font-semibold"
            >
              Instalar
            </button>

            <button
              onClick={handleClose}
              className="text-white/60 text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Modal iOS */}
      {showIOSModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl max-w-sm">
            <h2 className="text-lg font-bold mb-3">
              Instalar no iPhone
            </h2>
            <p className="text-sm mb-4">
              1. Toque no botão de compartilhar 📤
              <br />
              2. Escolha “Adicionar à Tela de Início”
            </p>

            <button
              onClick={() => setShowIOSModal(false)}
              className="bg-black text-white px-4 py-2 rounded-xl w-full"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  )
}
