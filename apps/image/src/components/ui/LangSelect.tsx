import { useTranslation } from 'react-i18next';
import { setLanguage } from '../../i18n';

export function LangSelect() {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={(e) => setLanguage(e.target.value as 'en' | 'vi')}
      className="text-xs bg-background border border-border rounded-md px-2 py-1 text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors"
    >
      <option value="vi">🇻🇳 Tiếng Việt</option>
      <option value="en">🇬🇧 English</option>
    </select>
  );
}
