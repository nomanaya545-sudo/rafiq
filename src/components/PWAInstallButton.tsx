import { Download, Share, Smartphone, X } from 'lucide-react';
import { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'banner' | 'compact';
}

export function PWAInstallButton({ variant = 'banner' }: PWAInstallButtonProps) {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Suppress when already running as an installed standalone PWA
  if (isInstalled) {
    return null;
  }

  // Nothing to show if neither Chromium prompt nor iOS Safari is detected
  if (!isInstallable && !isIOS) {
    return null;
  }

  if (variant === 'banner' && dismissed) {
    return null;
  }

  const iosModal = showIOSGuide && (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ios-install-title"
    >
      <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 id="ios-install-title" className="font-display text-lg font-bold text-slate-900">
            تثبيت «رفيق» على iPhone أو iPad
          </h3>
          <button
            type="button"
            onClick={() => setShowIOSGuide(false)}
            aria-label="إغلاق نافذة التثبيت"
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <ol className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <li className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
            <Share className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              ١. افتح الموقع في متصفح <strong>Safari</strong> ثم اضغط على زر{' '}
              <strong>المشاركة (Share)</strong> في شريط المتصفح.
            </span>
          </li>
          <li className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
            <Smartphone className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              ٢. مرّر للأسفل واختر <strong>إضافة إلى الشاشة الرئيسية (Add to Home Screen)</strong>{' '}
              ثم اضغط <strong>إضافة</strong>.
            </span>
          </li>
        </ol>

        <button
          type="button"
          onClick={() => setShowIOSGuide(false)}
          className="w-full min-h-[46px] rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm transition-colors cursor-pointer"
        >
          حسناً، فهمت
        </button>
      </div>
    </div>
  );

  if (variant === 'compact') {
    return (
      <>
        <button
          type="button"
          onClick={isInstallable ? install : () => setShowIOSGuide(true)}
          className="inline-flex items-center gap-2 min-h-[40px] px-3.5 py-1.5 rounded-xl border border-teal-200 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
        >
          <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{isInstallable ? 'تثبيت التطبيق' : 'إضافة للشاشة الرئيسية'}</span>
        </button>
        {iosModal}
      </>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-white border border-teal-200 rounded-2xl px-4 py-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-sm text-slate-900">
                ثبّت تطبيق «رفيق» على هاتفك
              </p>
              <p className="text-xs text-slate-600">
                لتجربته بملء الشاشة كتطبيق مستقل على الجوال
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={isInstallable ? install : () => setShowIOSGuide(true)}
              className="min-h-[42px] inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{isInstallable ? 'تثبيت الآن' : 'خطوات التثبيت'}</span>
            </button>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="إخفاء شريط التثبيت"
              className="w-10 h-10 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      {iosModal}
    </>
  );
}
