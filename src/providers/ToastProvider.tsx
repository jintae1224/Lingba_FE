"use client";

import { createContext, useCallback, useContext, useState } from "react";

import { ToastData } from "@/app/_components/Toast/Toast";
import ToastContainer from "@/app/_components/Toast/ToastContainer";

interface ToastOptions {
  title?: string;
  duration?: number;
  closable?: boolean;
}

interface ToastContextValue {
  toasts: ToastData[];
  toast: (toast: Omit<ToastData, "id">) => void;
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children: React.ReactNode;
  position?: "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left";
  maxToasts?: number;
}

export function ToastProvider({ 
  children, 
  position = "top-right",
  maxToasts = 5 
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const generateId = useCallback(() => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const addToast = useCallback((toast: Omit<ToastData, "id">) => {
    const id = generateId();
    const newToast: ToastData = { ...toast, id };

    setToasts((prevToasts) => {
      const updatedToasts = [newToast, ...prevToasts];
      // maxToasts 제한
      return updatedToasts.slice(0, maxToasts);
    });
  }, [generateId, maxToasts]);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const success = useCallback((message: string, options: ToastOptions = {}) => {
    addToast({
      type: "success",
      message,
      ...options,
    });
  }, [addToast]);

  const error = useCallback((message: string, options: ToastOptions = {}) => {
    addToast({
      type: "error",
      message,
      duration: 6000, // 에러는 조금 더 오래 표시
      ...options,
    });
  }, [addToast]);

  const warning = useCallback((message: string, options: ToastOptions = {}) => {
    addToast({
      type: "warning",
      message,
      ...options,
    });
  }, [addToast]);

  const info = useCallback((message: string, options: ToastOptions = {}) => {
    addToast({
      type: "info",
      message,
      ...options,
    });
  }, [addToast]);

  const contextValue: ToastContextValue = {
    toasts,
    toast: addToast,
    success,
    error,
    warning,
    info,
    dismiss: removeToast,
    dismissAll,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer 
        toasts={toasts} 
        onClose={removeToast} 
        position={position}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}