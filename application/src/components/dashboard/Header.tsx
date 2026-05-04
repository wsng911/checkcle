import { Button } from "@/components/ui/button";
import { AuthUser } from "@/services/authService";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  Moon, PanelLeft, PanelLeft关闭, Sun, Globe, FileText, 
  Github, Twitter, MessageSquare, Bell, User, 设置, 
  LogOut, Menu, X 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger, DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useSystem设置 } from "@/hooks/useSystem设置";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

interface HeaderProps {
  currentUser: AuthUser | null;
  onLogout: () => void;
}

export const Header = ({
  currentUser,
  onLogout,
}: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { sidebarCollapsed, toggleSidebar, isMobileOpen, toggleMobileMenu } = useSidebar();
  const [greeting, setGreeting] = useState<string>("");
  const { system名称 } = useSystem设置();
  const navigate = useNavigate();

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setGreeting(t("goodMorning"));
      else if (hour >= 12 && hour < 18) setGreeting(t("goodAfternoon"));
      else setGreeting(t("goodEvening"));
    };
    updateGreeting();
  }, [language, t]);

  const avatarUrl = currentUser?.avatar || '';

  const openExternalLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <header class名称="relative bg-background border-b border-border px-4 lg:px-6 flex justify-between items-center h-16 shrink-0 z-30 overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div class名称="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div 
          class名称="w-full h-full"
          style={{ 
            backgroundImage: `linear-gradient(${theme === 'dark' ? '#ffffff10' : '#00000010'} 1px, transparent 1px), 
                              linear-gradient(90deg, ${theme === 'dark' ? '#ffffff10' : '#00000010'} 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        >
          <div class名称="w-full h-full backdrop-blur-[1px]"></div>
        </div>
      </div>
      
      <div class名称="flex items-center gap-2 lg:gap-4 z-10">
        {/* Mobile Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleMobileMenu} class名称="lg:hidden h-9 w-9">
          {isMobileOpen ? <X class名称="h-5 w-5" /> : <Menu class名称="h-5 w-5" />}
        </Button>

        {/* Desktop Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} class名称="hidden lg:flex h-9 w-9">
          {sidebarCollapsed ? <PanelLeft class名称="h-5 w-5" /> : <PanelLeft关闭 class名称="h-5 w-5" />}
        </Button>
        
        <div class名称="flex items-center">
          <h1 class名称="text-sm lg:text-lg font-medium truncate max-w-[150px] lg:max-w-none">
            {greeting}, {currentUser?.name || currentUser?.email?.split('@')[0] || 'User'} 👋 ✨
          </h1>
        </div>
      </div>
      
      <div class名称="flex items-center space-x-1 lg:space-x-3 z-10">
        {/* External Links - Hidden on small screens */}
        <div class名称="hidden md:flex items-center space-x-1 mr-2">
          <Button 
            variant="outline" 
            size="icon" 
            class名称="rounded-full w-8 h-8 border-border"
            onClick={() => openExternalLink('https://docs.checkcle.io')}
            title={t("documentation")}
          >
            <FileText class名称="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            class名称="rounded-full w-8 h-8 border-border"
            onClick={() => openExternalLink('https://github.com/operacle/checkcle')}
            title="GitHub"
          >
            <Github class名称="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            class名称="rounded-full w-8 h-8 border-border"
            onClick={() => openExternalLink('https://x.com/checkcle_oss')}
            title="X (Twitter)"
          >
            <Twitter class名称="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            class名称="rounded-full w-8 h-8 border-border"
            onClick={() => openExternalLink('https://discord.gg/xs9gbubGwX')}
            title="Discord"
          >
            <MessageSquare class名称="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            class名称="rounded-full w-8 h-8 border-border"
            title={t("notifications")}
          >
            <Bell class名称="w-4 h-4" />
          </Button>
        </div>

        <Button variant="outline" size="icon" class名称="rounded-full w-8 h-8 border-border hidden sm:flex" onClick={toggleTheme}>
          <span class名称="sr-only">Toggle theme</span>
          {theme === 'dark' ? <Sun class名称="w-4 h-4" /> : <Moon class名称="w-4 h-4" />}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" class名称="rounded-full w-8 h-8 border-border">
              <span class名称="sr-only">{t("language")}</span>
              <Globe class名称="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class名称="w-40">
            <DropdownMenuItem onClick={() => setLanguage("en")} class名称={language === "en" ? "bg-accent" : ""}>
              {t("english")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("km")} class名称={language === "km" ? "bg-accent" : ""}>
              {t("khmer")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("de")} class名称={language === "de" ? "bg-accent" : ""}>
              {t("german")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("ko")} class名称={language === "ko" ? "bg-accent" : ""}>
              {t("korean")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("ja")} class名称={language === "ja" ? "bg-accent" : ""}>
              {t("japanese")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("zhcn")} class名称={language === "zhcn" ? "bg-accent" : ""}>
              {t("simplifiedChinese")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div class名称="h-8 w-px bg-border mx-1 hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar class名称="h-8 w-8 cursor-pointer border hover:ring-2 hover:ring-primary/20 transition-all">
              {avatarUrl ? <AvatarImage src={avatarUrl} alt="User" /> : <AvatarFallback class名称="bg-primary/20 text-primary">{currentUser?.name?.[0] || 'U'}</AvatarFallback>}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class名称="w-56">
            <div class名称="flex items-center gap-3 p-2">
              <Avatar class名称="h-10 w-10">
                {avatarUrl ? <AvatarImage src={avatarUrl} alt="User" /> : <AvatarFallback class名称="bg-primary/20 text-primary">{currentUser?.name?.[0] || 'U'}</AvatarFallback>}
              </Avatar>
              <div class名称="flex flex-col space-y-0.5">
                <span class名称="text-sm font-medium truncate">{currentUser?.name || 'User'}</span>
                <span class名称="text-xs text-muted-foreground truncate">{currentUser?.email}</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User class名称="mr-2 h-4 w-4" />
              <span>{t("profile")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <设置 class名称="mr-2 h-4 w-4" />
              <span>{t("settings")}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} class名称="text-red-500 focus:text-red-500">
              <LogOut class名称="mr-2 h-4 w-4" />
              <span>{t("logout")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};