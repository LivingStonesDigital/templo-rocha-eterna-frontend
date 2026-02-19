'use client'

import { useState } from 'react'
import { usePWAInstall } from '@/hooks/usePWAInstall'

export function InstallButton() {
  const { install, isInstallable, isIos, isStandalone } =
    usePWAInstall()
  const [showIOSModal, setShowIOSModal] = useState(false)

  if (isStandalone) return null

  const handleClick = () => {
    if (isInstallable) {
      install()
    } else if (isIos) {
      setShowIOSModal(true)
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-black text-white rounded-xl"
      >
        📲 Instalar App
      </button>

      {showIOSModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-sm">
            <h2 className="text-lg font-bold mb-2">
              Instalar no iPhone
            </h2>
            <p className="text-sm">
              1. Toque no botão de compartilhar 📤
              <br />
              2. Selecione “Adicionar à Tela de Início”
            </p>
            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-4 text-blue-600"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  )
}
