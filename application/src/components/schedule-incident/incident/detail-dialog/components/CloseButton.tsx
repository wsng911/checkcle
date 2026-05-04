
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface 关闭ButtonProps {
  on关闭: () => void;
  class名称?: string;
}

export const 关闭Button: React.FC<关闭ButtonProps> = ({ 
  on关闭,
  class名称 
}) => {
  const { t } = useLanguage();
  
  return (
    <Button 
      variant="secondary" 
      onClick={on关闭} 
      class名称={class名称}
    >
      {t('close', 'common')}
    </Button>
  );
};
