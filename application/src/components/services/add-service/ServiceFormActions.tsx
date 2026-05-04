
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { MouseEvent } from "react";
import {useLanguage} from "@/contexts/LanguageContext.tsx";

interface ServiceForm操作Props {
  is提交ting: boolean;
  on取消: () => void;
  submitLabel?: string;
}

export function ServiceForm操作({ 
  is提交ting, 
  on取消,
  submitLabel = "创建 Service"
}: ServiceForm操作Props) {

	const {t} = useLanguage();
  const handle取消 = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!is提交ting) {
      on取消();
    }
  };

  return (
    <div class名称="flex justify-end gap-3 pt-2">
      <Button 
        type="button" 
        onClick={handle取消}
        variant="outline"
        disabled={is提交ting}
      >
	      {t("cancel")}
      </Button>
      <Button 
        type="submit" 
        disabled={is提交ting}
      >
        {is提交ting ? (
          <>
            <Loader2 class名称="mr-2 h-4 w-4 animate-spin" />
	          {t("processing")}...
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </div>
  );
}