'use client';

import { Locale, t } from '@/lib/i18n';

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="bg-void-black border-t-2 border-gray-800 py-8">
      <div className="px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs font-mono text-gray-500">
          {t(locale, 'footer.copyright')}
        </span>
        <span className="text-xs font-mono text-gray-600">
          {t(locale, 'footer.location')}
        </span>
      </div>
    </footer>
  );
}
