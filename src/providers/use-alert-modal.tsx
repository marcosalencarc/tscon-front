import { createContext, useContext, useState } from 'react';

type AlertType = 'success' | 'info' | 'warning' | 'error';

interface AlertModalContextType {
  showAlert: (type: AlertType, title: string, message: string) => void;
}

const AlertModalContext = createContext<AlertModalContextType | null>(null);

export const AlertModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState<{
    type: AlertType;
    title: string;
    message: string;
  } | null>(null);

  const showAlert = (type: AlertType, title: string, message: string) => {
    setAlert({ type, title, message });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setAlert(null), 300); // Espera a animação terminar
  };

  const getIconAndColor = () => {
    switch (alert?.type) {
      case 'success':
        return {
          icon: (
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ),
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
        };
      case 'error':
        return {
          icon: (
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
        };
      case 'warning':
        return {
          icon: (
            <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
        };
      default: // info
        return {
          icon: (
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
        };
    }
  };

  const { icon, bgColor, textColor } = getIconAndColor();

  return (
    <AlertModalContext.Provider value={{ showAlert }}>
      {children}
      
      {/* Modal */}
      <div className={`fixed inset-0 z-[10000] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal} />
        
        <div className={`relative w-full max-w-md rounded-lg shadow-xl transform transition-all duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}>
          <div className={`${bgColor} rounded-t-lg p-4 flex items-start`}>
            <div className="mr-3 mt-1">{icon}</div>
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${textColor}`}>{alert?.title}</h3>
            </div>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-b-lg">
            <p className="text-gray-700">{alert?.message}</p>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className={`px-4 py-2 rounded-md ${textColor} font-medium hover:opacity-80 transition`}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </AlertModalContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertModalContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertModalProvider');
  }
  return context;
};