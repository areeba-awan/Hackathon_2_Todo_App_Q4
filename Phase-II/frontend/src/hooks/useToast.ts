import { useState, useCallback, useEffect } from 'react';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // in ms, default is 5000ms
}

const TOAST_LIMIT = 5; // Maximum number of toasts to show at once

// Create a global state for toasts
let toastState: {
  toasts: Toast[];
  listeners: Array<(toasts: Toast[]) => void>;
} = {
  toasts: [],
  listeners: [],
};

const notifyListeners = () => {
  toastState.listeners.forEach(listener => listener(toastState.toasts));
};

export const useToast = () => {
  const [localToasts, setLocalToasts] = useState<Toast[]>(toastState.toasts);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    const newToast = { ...toast, id };

    // Limit the number of toasts
    toastState.toasts = toastState.toasts.slice(-TOAST_LIMIT + 1);
    toastState.toasts = [...toastState.toasts, newToast];
    notifyListeners();
  }, []);

  const removeToast = useCallback((id: string) => {
    toastState.toasts = toastState.toasts.filter(t => t.id !== id);
    notifyListeners();
  }, []);

  const clearToasts = useCallback(() => {
    toastState.toasts = [];
    notifyListeners();
  }, []);

  // Subscribe to toast state changes
  const subscribe = useCallback((listener: (toasts: Toast[]) => void) => {
    toastState.listeners = [...toastState.listeners, listener];

    return () => {
      toastState.listeners = toastState.listeners.filter(l => l !== listener);
    };
  }, []);

  // Subscribe to changes when component mounts
  useEffect(() => {
    return subscribe(setLocalToasts);
  }, [subscribe]);

  return {
    toasts: localToasts,
    addToast,
    removeToast,
    clearToasts,
  };
};

// Convenience functions for different toast types
export const showToast = (title: string, description?: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration?: number) => {
  // We need to import this function wherever we want to show toasts
  // Since hooks can't be called outside components, we'll need to implement this differently
  // For now, we'll just export the useToast hook
};

// Helper functions for common toast types
export const showSuccessToast = (title: string, description?: string, duration?: number) => {
  // This would be called inside a component using the useToast hook
};

export const showErrorToast = (title: string, description?: string, duration?: number) => {
  // This would be called inside a component using the useToast hook
};

export const showWarningToast = (title: string, description?: string, duration?: number) => {
  // This would be called inside a component using the useToast hook
};