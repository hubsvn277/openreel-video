import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { setLanguage } from "../../i18n";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@openreel/ui";

export const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <Tooltip>
      <DropdownMenu>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-lg hover:bg-background-elevated text-text-secondary hover:text-text-primary transition-colors">
              <Globe size={16} />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{t("language.switch")}</TooltipContent>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem
            onClick={() => setLanguage("vi")}
            className={i18n.language === "vi" ? "text-primary font-medium" : ""}
          >
            🇻🇳 {t("language.vi")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLanguage("en")}
            className={i18n.language === "en" ? "text-primary font-medium" : ""}
          >
            🇬🇧 {t("language.en")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Tooltip>
  );
};
