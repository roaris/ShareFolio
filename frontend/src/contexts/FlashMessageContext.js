import React, { createContext, useState } from 'react';

export const FlashMessageContext = createContext();

export const FlashMessageContextProvider = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState({ success: '', error: '' });
  const [isOpen, setOpen] = useState(false);

  const updateFlashMessage = ({ successMessage, errorMessage }) => {
    setFlashMessage({
      success: successMessage ? successMessage : '',
      error: errorMessage ? errorMessage : '',
    });
    setOpen(true);
    setTimeout(() => setOpen(false), 1500);
  };

  return (
    <FlashMessageContext.Provider
      value={{ flashMessage, updateFlashMessage, isOpen }}
    >
      {children}
    </FlashMessageContext.Provider>
  );
};

export default FlashMessageContextProvider;
