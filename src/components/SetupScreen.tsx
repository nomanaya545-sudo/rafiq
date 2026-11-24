import { ArrowLeft, ArrowRight, GraduationCap, User } from 'lucide-react';
import { motion } from 'motion/react';
import { GRADES, type GradeInfo } from '../data/curriculum';
import { MascotAvatar } from './MascotCard';

interface SetupScreenProps {
  studentName: string;
  selectedGradeId: number | null;
  onChangeName: (name: string) => void;
  onSelectGrade: (gradeId: number) => void;
  onBack: () => void;
  onContinueToSubjects: () => void;
}

const STAGES: {
  name: GradeInfo['stage'];
  badgeColor: string;
  activeBtn: string;
}[] = [
  {
    name: 'المرحلة الابتدائية',
    badgeColor: 'text-amber-700',
    activeBtn: 'bg-gradient-to-l from-amber-500 to-orange-500 border-amber-500 text-white',
  },
  {
    name: 'المرحلة المتوسطة',
    badgeColor: 'text-teal-700',
    activeBtn: 'bg-gradient-to-l from-teal-600 to-cyan-600 border-teal-600 text-white',
  },
  {
    name: 'المرحلة الثانوية',
    badgeColor: 'text-indigo-700',
    activeBtn: 'bg-gradient-to-l from-indigo-600 to-blue-600 border-indigo-600 text-white',
  },
];

export function SetupScreen({
  studentName,
  selectedGradeId,
  onChangeName,
  onSelectGrade,
  onBack,
  onContinueToSubjects,
}: SetupScreenProps) {
  const trimmedName = studentName.trim();
  const currentGrade =
    selectedGradeId !== null ? GRADES.find((g) => g.id === selectedGradeId) ?? null : null;
  const canProceed = trimmedName.length > 0 && currentGrade !== null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs sm:text-sm font-semibold text-teal-700">
            الخطوة ١ من ٣ · تخصيص تجربتك الشخصية
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            أدخل اسمك واختر صفك الدراسي
          </h1>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
          <span>العودة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Form Area */}
        <div className="lg:col-span-8 space-y-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          {/* Step 1: Student Name (No account/email/password) */}
          <div className="space-y-3">
            <label
              htmlFor="student-name-input"
              className="font-display text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5"
            >
              <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                <User className="w-4 h-4" aria-hidden="true" />
              </span>
              <span>١. ما اسمك؟</span>
            </label>
            <p className="text-sm text-slate-600">
              أدخل اسمك الأول فقط ليناديك رفيق به طوال الرحلة — لا يتطلب بريد إلكتروني أو كلمة
              مرور.
            </p>
            <input
              id="student-name-input"
              type="text"
              value={studentName}
              onChange={(e) => onChangeName(e.target.value)}
              placeholder="اكتب اسمك هنا (مثال: ليان أو عمر)"
              maxLength={40}
              className="w-full min-h-[52px] px-4 py-3 text-base sm:text-lg font-medium text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-teal-600 focus:outline-none transition-colors placeholder:text-slate-400"
            />
          </div>

          <hr className="border-slate-100" />

          {/* Step 2: Manual Grade Selection (1-12) */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" aria-hidden="true" />
                </span>
                <span>٢. اختر صفك الدراسي (من الأول إلى الثاني عشر)</span>
              </h2>
              <span className="text-sm font-semibold text-teal-700">
                {currentGrade ? currentGrade.label : 'لم يتم الاختيار بعد'}
              </span>
            </div>

            <div className="space-y-6">
              {STAGES.map((stageObj) => {
                const stageGrades = GRADES.filter((g) => g.stage === stageObj.name);
                return (
                  <div key={stageObj.name}>
                    <p className={`text-xs font-bold mb-2.5 ${stageObj.badgeColor}`}>
                      {stageObj.name}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                      {stageGrades.map((grade) => {
                        const isSelected = grade.id === selectedGradeId;
                        return (
                          <button
                            key={grade.id}
                            type="button"
                            onClick={() => onSelectGrade(grade.id)}
                            aria-pressed={isSelected}
                            className={`min-h-[50px] px-2.5 sm:px-3.5 py-2.5 rounded-xl border text-right transition-all duration-150 cursor-pointer flex items-center justify-between gap-1.5 sm:gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 ${
                              isSelected
                                ? `${stageObj.activeBtn} font-bold shadow-sm`
                                : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white hover:border-teal-400 font-medium'
                            }`}
                          >
                            <span className="text-xs sm:text-sm leading-snug">
                              الصف {grade.shortLabel}
                            </span>
                            <span
                              className={`text-xs font-mono tabular-nums ${
                                isSelected ? 'text-white/90' : 'text-slate-400'
                              }`}
                            >
                              {grade.id}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Preview & Proceed Sidebar */}
        <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-4">
            <MascotAvatar mood="teaching" size="sm" interactive studentName={trimmedName} />
            <div>
              <p className="text-xs font-semibold text-teal-700">ترحيب رفيق</p>
              <h3 className="font-display text-lg font-bold text-slate-900 mt-0.5">
                {trimmedName ? `أهلاً يا ${trimmedName}!` : 'بانتظار اسمك وصفك'}
              </h3>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-50/70 via-slate-50 to-amber-50/60 border border-slate-200 rounded-2xl p-4 space-y-2.5">
            {currentGrade ? (
              <>
                <div className="text-xs font-semibold text-slate-500 flex flex-wrap items-center gap-2">
                  <span>{currentGrade.label}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-teal-700">{currentGrade.tierName}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {currentGrade.adaptationNote}
                </p>
              </>
            ) : (
              <p className="text-sm text-slate-600 leading-relaxed">
                اختر صفك الدراسي من القائمة لتشاهد كيف يكيّف رفيق الألوان والمواد الدراسية وشرح
                الدروس ليناسب مستواك.
              </p>
            )}
          </div>

          {!canProceed && (
            <div className="text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 leading-relaxed">
              {!trimmedName && !currentGrade
                ? 'يرجى كتابة اسمك واختيار صفك الدراسي للمتابعة إلى المواد.'
                : !trimmedName
                  ? 'يرجى كتابة اسمك في الحقل الأول للمتابعة.'
                  : 'يرجى اختيار صفك الدراسي من الصف الأول حتى الثاني عشر.'}
            </div>
          )}

          <button
            type="button"
            disabled={!canProceed}
            onClick={onContinueToSubjects}
            className={`w-full min-h-[54px] inline-flex items-center justify-center gap-3 px-6 py-4 text-base font-bold rounded-2xl transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 ${
              canProceed
                ? 'text-white bg-gradient-to-l from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 active:scale-[0.99] cursor-pointer shadow-sm'
                : 'text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed'
            }`}
          >
            <span>استعراض المواد الدراسية</span>
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>
        </aside>
      </div>
    </motion.section>
  );
}
