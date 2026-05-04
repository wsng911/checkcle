import {useLanguage} from "@/contexts/LanguageContext.tsx";

export function LoadingState() {
	const { t } = useLanguage();
  return (
    <div class名称="flex items-center justify-center h-screen bg-background text-foreground">
      <div class名称="flex flex-col items-center text-center py-8 px-4 rounded-lg shadow-lg bg-card animate-fade-in">
        <div class名称="relative flex items-center justify-center mb-4">
          <div class名称="absolute w-12 h-12 rounded-full border-4 border-primary/20"></div>
          <div class名称="w-12 h-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <h3 class名称="text-xl font-medium mb-1">{t("loadingServerData")}</h3>
        <p class名称="text-muted-foreground">{t("retrievingYourInformation")}</p>
      </div>
    </div>
  );
}
