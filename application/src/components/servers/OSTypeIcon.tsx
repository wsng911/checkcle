
import { 监控, Server, Smartphone, Laptop } from "lucide-react";

interface OSTypeIconProps {
  osType: string;
  class名称?: string;
}

export const OSTypeIcon = ({ osType, class名称 = "h-4 w-4" }: OSTypeIconProps) => {
  const getOSIcon = (os: string) => {
    const osLower = os.toLowerCase();
    
    if (osLower.includes('linux') || osLower.includes('ubuntu') || osLower.includes('centos') || osLower.includes('debian')) {
      return <Server class名称={class名称} />;
    } else if (osLower.includes('windows')) {
      return <监控 class名称={class名称} />;
    } else if (osLower.includes('mac') || osLower.includes('darwin')) {
      return <Laptop class名称={class名称} />;
    } else if (osLower.includes('android') || osLower.includes('ios')) {
      return <Smartphone class名称={class名称} />;
    } else {
      return <Server class名称={class名称} />;
    }
  };

  return getOSIcon(osType);
};