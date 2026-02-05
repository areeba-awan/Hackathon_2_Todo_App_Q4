'use client';

import { useEffect, useState } from 'react';
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '../ui/Toast';
import { useToast } from '@/hooks/useToast';

export const ToastSystem = () => {
  const { toasts, removeToast } = useToast();
  
  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, type, duration }) => (
        <Toast 
          key={id} 
          onOpenChange={(open) => !open && removeToast(id)}
          className={`${
            type === 'error' 
              ? 'border-error-500 bg-error-50 text-error-700 dark:bg-error-900/30 dark:text-error-300' 
              : type === 'success' 
                ? 'border-success-500 bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-300' 
                : type === 'warning' 
                  ? 'border-warning-500 bg-warning-50 text-warning-700 dark:bg-warning-900/30 dark:text-warning-300' 
                  : 'border-neutral-200 bg-white text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300'
          }`}
        >
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
};

export default ToastSystem;