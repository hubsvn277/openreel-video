import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { setLanguage } from '../../i18n';
import { useState, useRef, useEffect } from 'react';

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        title={t('language.switch')}
      >
        <Globe size={16} />
        {i18n.language === 'vi' ? '🇻🇳' : '🇬🇧'}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 min-w-[140px] rounded-lg border border-border bg-popover shadow-lg py-1">
          <button
            onClick={() => { setLanguage('vi'); setOpen(false); }}
            className={`w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-2 ${i18n.language === 'vi' ? 'text-primary font-medium' : ''}`}
          >
            🇻🇳 {t('language.vi')}
          </button>
          <button
            onClick={() => { setLanguage('en'); setOpen(false); }}
            className={`w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-2 ${i18n.language === 'en' ? 'text-primary font-medium' : ''}`}
          >
            🇬🇧 {t('language.en')}
          </button>
        </div>
      )}
    </div>
  );
}
