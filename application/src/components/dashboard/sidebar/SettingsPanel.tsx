
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { 设置, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { settingsMenuItems } from "./navigationData";

interface 设置PanelProps {
  collapsed: boolean;
}

export const 设置Panel: React.FC<设置PanelProps> = ({ collapsed }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [active设置Item, setActive设置Item] = useState<string | null>("general");
  const [settingsPanelOpen, set设置PanelOpen] = useState(false);

  // Update active settings item based on URL
  useEffect(() => {
    if (location.pathname === '/settings') {
      const params = new URL搜索Params(location.search);
      const panel = params.get('panel');
      if (panel) {
        setActive设置Item(panel);
      }
    }
  }, [location]);

  const handle设置ItemClick = (item: string) => {
    setActive设置Item(item);
  };

  const handleMenuItemClick = (path: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    // Use navigate instead of window.location to prevent full page reload
    navigate(path, { replace: false });
  };

  const getMenuItemClasses = (isActive: boolean) => {
    return `p-2 ${isActive ? theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-sidebar-accent' : `hover:${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-sidebar-accent'}`} rounded-lg flex items-center`;
  };

  if (collapsed) {
    const mainIconSize = "h-6 w-6";
    return (
      <div class名称={`border-t ${theme === 'dark' ? 'border-[#1e1e1e] bg-[#121212]' : 'border-sidebar-border bg-sidebar'} p-4 flex justify-center`}>
        <div 
          onClick={(e) => handleMenuItemClick('/settings', e)} 
          class名称="cursor-pointer"
        >
          <设置 class名称={`${mainIconSize} text-purple-400`} />
        </div>
      </div>
    );
  }

  return (
    <div class名称={`flex-1 flex flex-col border-t ${theme === 'dark' ? 'border-[#1e1e1e] bg-[#121212]' : 'border-sidebar-border bg-sidebar'} p-4`}>
      <Collapsible open={settingsPanelOpen} onOpenChange={set设置PanelOpen} class名称="w-full flex flex-col flex-1">
        <CollapsibleTrigger class名称={`flex items-center justify-between w-full mb-4 px-2 py-2 rounded-lg ${theme === 'dark' ? 'hover:bg-[#1a1a1a]' : 'hover:bg-sidebar-accent'}`}>
          <div class名称="flex items-center">
            <span class名称="font-medium tracking-wide">{t("settingPanel")}</span>
          </div>
          <div class名称="flex items-center">
            <设置 class名称="h-4 w-4 mr-1" />
            <ChevronDown class名称={`h-4 w-4 transition-transform duration-200 ${settingsPanelOpen ? 'rotate-180' : ''}`} />
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent class名称={`${theme === 'dark' ? 'bg-[#121212]' : 'bg-sidebar'} flex-1 flex flex-col`}>
          <div class名称="max-h-[300px] overflow-y-auto custom-scrollbar relative pr-1">
            <ScrollArea class名称="h-full">
              <div class名称="space-y-2 pr-4">
                {settingsMenuItems.map((item) => (
                  <div 
                    key={item.id}
                    class名称={getMenuItemClasses(active设置Item === item.id)} 
                    onClick={(e) => {
                      handleMenuItemClick(`/settings?panel=${item.id}`, e);
                      handle设置ItemClick(item.id);
                    }}
                  >
                    <item.icon class名称="h-4 w-4 mr-2" />
                    <span class名称="text-sm">{t(item.translationKey)}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};