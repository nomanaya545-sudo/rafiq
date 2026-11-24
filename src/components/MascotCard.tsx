import { motion } from 'motion/react';
import { useState } from 'react';

export type MascotMood = 'welcome' | 'teaching' | 'celebrating';

const MASCOT_IMAGES: Record<MascotMood, string> = {
  welcome: '/src/assets/images/rafiq_welcome_1795092011280.jpg',
  teaching: '/src/assets/images/rafiq_teaching_1795092009768.jpg',
  celebrating: '/src/assets/images/rafiq_celebrating_1795092011008.jpg',
};

const INTERACTIVE_TIPS = [
  'اضغط عليّ في أي وقت للحصول على تشجيع سريع!',
  'تذكّر: كل فكرة كبيرة تبدأ بخطوة صغيرة واضحة.',
  'الخطأ جزء جميل من التعلّم، المهم أن نحاول من جديد.',
  'أنا فخور بفضولك وحبك للاستكشاف!',
];

interface MascotAvatarProps {
  mood: MascotMood;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  studentName?: string;
  onTipChange?: (tip: string) => void;
  className?: string;
}

export function MascotAvatar({
  mood,
  size = 'md',
  interactive = false,
  studentName,
  onTipChange,
  className = '',
}: MascotAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32 sm:w-36 sm:h-36',
    lg: 'w-56 h-56 sm:w-72 sm:h-72',
  }[size];

  const handleTap = () => {
    if (!interactive) return;
    const nextCount = tapCount + 1;
    setTapCount(nextCount);
    const rawTip = INTERACTIVE_TIPS[nextCount % INTERACTIVE_TIPS.length];
    const cleanName = studentName?.trim();
    const personalized =
      cleanName && nextCount % 2 === 1
        ? `أنت رائع يا ${cleanName}! ${rawTip}`
        : rawTip;
    onTipChange?.(personalized);
  };

  const content = imgError ? (
    <div
      className="w-full h-full bg-gradient-to-br from-teal-50 to-amber-50 flex items-center justify-center p-4"
      role="img"
      aria-label="رفيق المعلم المساعد"
    >
      <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" aria-hidden="true">
        <circle cx="60" cy="64" r="40" fill="#B47B48" />
        <ellipse cx="60" cy="74" rx="26" ry="26" fill="#FDE68A" opacity="0.55" />
        <circle cx="44" cy="52" r="14" fill="#FFFFFF" stroke="#0F766E" strokeWidth="4" />
        <circle cx="76" cy="52" r="14" fill="#FFFFFF" stroke="#0F766E" strokeWidth="4" />
        <line x1="58" y1="52" x2="62" y2="52" stroke="#0F766E" strokeWidth="4" />
        <circle cx="44" cy="52" r="5" fill="#0F172A" />
        <circle cx="76" cy="52" r="5" fill="#0F172A" />
        <polygon points="60,57 54,67 66,67" fill="#F59E0B" />
        <path d="M32 32 L45 40 L37 46 Z" fill="#0D9488" />
        <path d="M88 32 L75 40 L83 46 Z" fill="#0D9488" />
      </svg>
    </div>
  ) : (
    <img
      src={MASCOT_IMAGES[mood]}
      alt="رفيق — الرفيق التعليمي الذكي"
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
      className="w-full h-full object-cover"
    />
  );

  if (interactive) {
    return (
      <motion.button
        type="button"
        onClick={handleTap}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96, rotate: tapCount % 2 === 0 ? -2 : 2 }}
        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
        title="اضغط على رفيق للتفاعل"
        className={`${sizeClasses} ${className} rounded-2xl overflow-hidden bg-gradient-to-br from-teal-50 via-white to-amber-50 border-2 border-teal-200 hover:border-teal-400 shadow-sm shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600`}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <div
      className={`${sizeClasses} ${className} rounded-2xl overflow-hidden bg-gradient-to-br from-teal-50 via-white to-amber-50 border border-teal-200/80 shrink-0 shadow-xs`}
    >
      {content}
    </div>
  );
}
