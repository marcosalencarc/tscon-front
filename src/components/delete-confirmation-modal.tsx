import { useState } from 'react'
import { FullScreenLoader } from './full-screen-loader'

export const DeleteConfirmationModal = ({
  visible,
  setVisible,
  onConfirm,
}: {
  visible: boolean
  setVisible: (value: boolean) => void
  onConfirm: () => Promise<void> | void
}) => {
  const handleClose = () => {
    setVisible(false)
  }
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${!visible && 'hidden'}`}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">Confirmar exclusão</h3>
        </div>

        <p className="text-gray-600 mb-6">
          Tem certeza que deseja excluir esta associação? Esta ação não pode ser
          desfeita.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
