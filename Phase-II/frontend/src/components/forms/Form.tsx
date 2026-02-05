import { ReactNode } from 'react';
import { Label } from '@/components/ui/Label';

interface FormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

export const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {children}
    </form>
  );
};

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}

export const FormField = ({ label, htmlFor, required, children }: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
    </div>
  );
};