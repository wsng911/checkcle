
import React from 'react';
import { AlertCircle, CheckCircle, Clock, AlertTriangle, Flag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 概览Card } from '../common/概览Card';
import { useTheme } from '@/contexts/ThemeContext';

interface 概览StatsProps {
  unresolved: number;
  resolved: number;
  critical: number;
  highPriority: number;
  avgResolutionTime: string;
}

interface 概览CardsProps {
  overviewStats: 概览StatsProps;
  loading: boolean;
  initialized: boolean;
}

export const 概览Cards: React.FC<概览CardsProps> = ({ 
  overviewStats, 
  loading, 
  initialized 
}) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <div class名称="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <概览Card
        title={t('activeIncidents')}
        value={overviewStats.unresolved.toString()}
        icon={<AlertCircle class名称="h-5 w-5 text-white" />}
        isLoading={loading && initialized}
        gradient={
          theme === "dark"
            ? "linear-gradient(135deg, #4b3b37 0%, rgba(239, 83, 80, 0.6) 100%)"
            : "linear-gradient(135deg, #4b3b37 0%, rgba(239, 83, 80, 0.6) 100%)"
        }
      />
      <概览Card
        title={t('criticalIssues')}
        value={overviewStats.critical.toString()}
        icon={<AlertTriangle class名称="h-5 w-5 text-white" />}
        isLoading={loading && initialized}
        gradient={
          theme === "dark"
            ? "linear-gradient(135deg, #4b3b37 0%, rgba(255, 183, 77, 0.6) 100%)"
            : "linear-gradient(135deg, #4b3b37 0%, rgba(255, 183, 77, 0.6) 100%)"
        }
      />
      <概览Card
        title={t('highPriority')}
        value={overviewStats.highPriority.toString()}
        icon={<Flag class名称="h-5 w-5 text-white" />}
        isLoading={loading && initialized}
        gradient={
          theme === "dark"
            ? "linear-gradient(135deg, #4b3b37 0%, rgba(255, 109, 0, 0.6) 100%)"
            : "linear-gradient(135deg, #4b3b37 0%, rgba(255, 109, 0, 0.6) 100%)"
        }
      />
      <概览Card
        title={t('resolvedIncidents')}
        value={overviewStats.resolved.toString()}
        icon={<CheckCircle class名称="h-5 w-5 text-white" />}
        isLoading={loading && initialized}
        gradient={
          theme === "dark"
            ? "linear-gradient(135deg, #4b3b37 0%, rgba(102, 187, 106, 0.6) 100%)"
            : "linear-gradient(135deg, #4b3b37 0%, rgba(102, 187, 106, 0.6) 100%)"
        }
      />
      <概览Card
        title={t('avgResolutionTime')}
        value={overviewStats.avgResolutionTime}
        icon={<Clock class名称="h-5 w-5 text-white" />}
        isLoading={loading && initialized}
        gradient={
          theme === "dark"
            ? "linear-gradient(135deg, #4b3b37 0%, rgba(66, 165, 245, 0.6) 100%)"
            : "linear-gradient(135deg, #4b3b37 0%, rgba(66, 165, 245, 0.6) 100%)"
        }
      />
    </div>
  );
};
