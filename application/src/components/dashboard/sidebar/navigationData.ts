
import { Globe, Boxes, Layers, Calendar, BarChart2, LineChart, MapPin, 设置, User, Bell, Database, Info, BookOpen } from "lucide-react";

export const mainMenuItems = [
  {
    id: 'uptime-monitoring',
    path: '/dashboard',
    icon: Globe,
    translationKey: 'uptime监控ing',
    color: 'text-purple-400',
    hasNavigation: true
  },
  {
    id: 'instance-monitoring',
    path: '/instance-monitoring',
    icon: Boxes,
    translationKey: 'instance监控ing',
    color: 'text-blue-400',
    hasNavigation: true
  },
  {
    id: 'ssl-domain',
    path: '/ssl-domain',
    icon: Layers,
    translationKey: 'sslDomain',
    color: 'text-cyan-400',
    hasNavigation: true
  },
  {
    id: 'schedule-incident',
    path: '/schedule-incident',
    icon: Calendar,
    translationKey: 'scheduleIncident',
    color: 'text-emerald-400',
    hasNavigation: true
  },
  {
    id: 'operational-page',
    path: '/operational-page',
    icon: BarChart2,
    translationKey: 'operationalPage',
    color: 'text-amber-400',
    hasNavigation: true
  },
  {
    id: 'regional-monitoring',
    path: '/regional-monitoring',
    icon: MapPin,
    translationKey: 'regional监控ing',
    color: 'text-indigo-400',
    hasNavigation: true
  },
  {
    id: 'reports',
    path: null,
    icon: LineChart,
    translationKey: 'reports',
    color: 'text-rose-400',
    hasNavigation: false
  }
];

export const settingsMenuItems = [
  {
    id: 'general',
    icon: 设置,
    translationKey: 'general设置'
  },
  {
    id: 'users',
    icon: User,
    translationKey: 'userManagement'
  },
  {
    id: 'notifications',
    icon: Bell,
    translationKey: 'notification设置'
  },
  {
    id: 'templates',
    icon: BookOpen,
    translationKey: 'alertsTemplates'
  },
  {
    id: 'data-retention',
    icon: Database,
    translationKey: 'dataRetention'
  },
  {
    id: 'about',
    icon: Info,
    translationKey: 'aboutSystem'
  }
];