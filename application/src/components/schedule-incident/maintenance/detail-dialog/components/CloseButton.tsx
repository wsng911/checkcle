
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface 关闭ButtonProps {
  on关闭: () => void;
}

export const 关闭Button: React.FC<关闭ButtonProps> = ({ on关闭 }) => {
  const { t } = useLanguage();
  
  return (
    <Button variant="secondary" onClick={on关闭}>
      {t('close')}
    </Button>
  );
};
