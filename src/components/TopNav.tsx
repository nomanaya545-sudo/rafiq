import type { GradeInfo, ScreenId, SubjectDefinition } from '../data/curriculum';

interface TopNavProps {
  currentScreen: ScreenId;
  unlockedScreens: ScreenId[];
  studentName: string;
  selectedGrade: GradeInfo | null;
  selectedSubject: SubjectDefinition | null;
  onNavigate: (screen: ScreenId) => void;
}

const NAV_ITEMS: { id: ScreenId; label: string }[] = [
  { id: 'welcome', label: 'الترحيب' },
  { id: 'setup', label: 'بيانات الطالب' },
  { id: 'subjects', label: 'المواد' },
  { id: 'subject', label: 'لوحة المادة' },
  { id: 'lesson', label: 'الدرس' },
];

export function TopNav({
  currentScreen,
  unlockedScreens,
  studentName,
  selectedGrade,
  selectedSubject,
  onNavigate,
}: TopNavProps) {
  const canJumpToSubjects = Boolean(studentName.trim() && selectedGrade);
  const canJumpToSubject = Boolean(canJumpToSubjects && selectedSubject);

  const getIsUnlocked = (id: ScreenId) => {
    if (id === 'subjects') return canJumpToSubjects && unlockedScreens.includes('subjects');
    if (id === 'subject') return canJumpToSubject && unlockedScreens.includes('subject');
    if (id === 'lesson') {
      return (
        canJumpToSubject &&
        selectedSubject?.id === 'math' &&
        unlockedScreens.includes('lesson')
      );
    }
    return unlockedScreens.includes(id);
  };

  const ctaConfig =
    currentScreen === 'welcome'
      ? { label: 'ابدأ رحلتك', target: 'setup' as ScreenId }
      : currentScreen === 'setup'
        ? { label: 'العودة للترحيب', target: 'welcome' as ScreenId }
        : currentScreen === 'subjects'
          ? { label: 'تعديل بياناتي', target: 'setup' as ScreenId }
          : { label: 'كل المواد', target: 'subjects' as ScreenId };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Title (single text element) */}
        <button
          type="button"
          onClick={() => onNavigate('welcome')}
          className="font-display text-2xl font-extrabold tracking-tight text-teal-700 hover:text-teal-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 rounded min-h-[40px] flex items-center"
        >
          رفيق
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="مسار التعلم"
          className="hidden md:flex items-center gap-6 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              currentScreen === item.id ||
              (item.id === 'lesson' &&
                (currentScreen === 'question' || currentScreen === 'results'));
            const isUnlocked = getIsUnlocked(item.id);
            return (
              <button
                key={item.id}
                type="button"
                disabled={!isUnlocked}
                onClick={() => isUnlocked && onNavigate(item.id)}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 ${
                  isActive
                    ? 'border-teal-600 text-teal-800 font-bold'
                    : isUnlocked
                      ? 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300 cursor-pointer'
                      : 'border-transparent text-slate-300 cursor-not-allowed'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => onNavigate(ctaConfig.target)}
            className="min-h-[40px] px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-l from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            {ctaConfig.label}
          </button>
        </div>
      </div>
    </header>
  );
}
