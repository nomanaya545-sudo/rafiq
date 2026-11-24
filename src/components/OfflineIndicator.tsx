import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-center"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-amber-950">
        <WifiOff className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
        <span>
          أنت في وضع عدم الاتصال — يتم استخدام الدروس والأنشطة المحلية المخزّنة فقط، والخدمات
          السحابية المستقبلية غير متاحة دون إنترنت.
        </span>
      </div>
    </div>
  );
}
