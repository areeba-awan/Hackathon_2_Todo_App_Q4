'use client';

import { useState } from 'react';
import { Input, InputProps } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

type PasswordInputProps = Omit<InputProps, 'type'>;

const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        className={className}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? (
          <EyeOffIcon className="h-4 w-4 text-gray-500" />
        ) : (
          <EyeIcon className="h-4 w-4 text-gray-500" />
        )}
      </Button>
    </div>
  );
};

export { PasswordInput };