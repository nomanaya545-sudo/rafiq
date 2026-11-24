import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  BookMarked,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Dumbbell,
  FlaskConical,
  Microscope,
  Play,
  RotateCcw,
  Star,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  SUBJECT_COLOR_STYLES,
  getTierVisualStyle,
  type GradeInfo,
  type SampleExercise,
  type SubjectDefinition,
} from '../data/curriculum';
import { MascotAvatar } from './MascotCard';
import { SubjectIcon } from './SubjectIcon';

type SubjectSectionTab = 'lessons' | 'textbook' | 'activities' | 'assessment' | 'lab';

interface SubjectDashboardScreenProps {
  studentName: string;
  selectedGrade: GradeInfo;
  subject: SubjectDefinition;
  mathStarsEarned: number | null;
  onBackToSubjects: () => void;
  onStartLesson: (lessonId: string) => void;
  onStartMathQuestion: () => void;
}

export function SubjectDashboardScreen({
  studentName,
  selectedGrade,
  subject,
  mathStarsEarned,
  onBackToSubjects,
  onStartLesson,
  onStartMathQuestion,
}: SubjectDashboardScreenProps) {
  const [activeTab, setActiveTab] = useState<SubjectSectionTab>('lessons');

  // Local interactive state for sample activity exercise inside this subject
  const [activitySelectedId, setActivitySelectedId] = useState<string | null>(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<number, string>>({});

  const palette = SUBJECT_COLOR_STYLES[subject.color];
  const tierStyle = getTierVisualStyle(selectedGrade.tier);
  const isEarly = selectedGrade.tier === 'early';

  const tabs: { id: SubjectSectionTab; label: string; icon: typeof BookOpen }[] = [
    { id: 'lessons', label: 'الشرح التفاعلي', icon: BookOpen },
    { id: 'textbook', label: 'الكتاب الدراسي', icon: BookMarked },
    { id: 'activities', label: 'الأنشطة والتدريبات', icon: Dumbbell },
    { id: 'assessment', label: 'تقييم الفهم', icon: ClipboardCheck },
    ...(subject.isScience
      ? [{ id: 'lab' as const, label: 'المختبر الافتراضي', icon: FlaskConical }]
      : []),
  ];

  const activityChoice =
    subject.activityExercise.choices.find((c) => c.id === activitySelectedId) ?? null;

  const renderExerciseCard = (
    exercise: SampleExercise,
    selectedId: string | undefined,
    onSelect: (choiceId: string) => void,
    onReset?: () => void,
  ) => {
    const picked = exercise.choices.find((c) => c.id === selectedId) ?? null;
    return (
      <div className="space-y-4">
        <p className="font-display font-bold text-base sm:text-lg text-slate-900 leading-relaxed">
          {exercise.prompt}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {exercise.choices.map((choice) => {
            const isPicked = selectedId === choice.id;
            let style =
              'bg-slate-50 border-slate-200 text-slate-900 hover:bg-white hover:border-teal-500';
            if (isPicked && choice.isCorrect) {
              style = 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600';
            } else if (isPicked && !choice.isCorrect) {
              style = 'bg-amber-50 border-amber-500 text-slate-900 ring-1 ring-amber-500';
            }
            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => onSelect(choice.id)}
                aria-pressed={isPicked}
                className={`min-h-[54px] p-4 rounded-xl border text-right font-semibold text-sm sm:text-base transition-all cursor-pointer ${style}`}
              >
                {choice.text}
              </button>
            );
          })}
        </div>

        {picked && (
          <div
            role="status"
            className={`rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              picked.isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-slate-900'
            }`}
          >
            <div className="flex items-start gap-2.5 text-sm leading-relaxed">
              {picked.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold">
                  {picked.isCorrect
                    ? `أحسنت يا ${studentName}!`
                    : `محاولة جيدة يا ${studentName} — جرّب اختياراً آخر`}
                </p>
                <p className="text-slate-700 mt-0.5">{picked.feedback}</p>
              </div>
            </div>
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 bg-white border border-slate-200 rounded-lg cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>إعادة المحاولة</span>
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  // Assessment summary calculation
  const assessmentCount = subject.assessmentQuestions.length;
  const answeredCount = Object.keys(assessmentAnswers).length;
  const correctAssessmentCount = subject.assessmentQuestions.filter((q, idx) => {
    const pickedId = assessmentAnswers[idx];
    return q.choices.find((c) => c.id === pickedId)?.isCorrect;
  }).length;
  const allAssessmentAnswered = answeredCount === assessmentCount;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6"
    >
      {/* Colorful Subject Hero Banner */}
      <div
        className={`bg-white border border-slate-200 ${tierStyle.cardRadius} overflow-hidden shadow-xs`}
      >
        <div className={`bg-gradient-to-l ${palette.headerGradient} px-6 sm:px-8 py-6 text-white`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex items-center justify-center shrink-0">
                <SubjectIcon icon={subject.icon} className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-xs sm:text-sm text-white/90 flex flex-wrap items-center gap-2">
                  <span>{selectedGrade.label}</span>
                  <span aria-hidden="true">·</span>
                  <span>مرحباً يا {studentName}</span>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold mt-0.5">
                  مادة {subject.name}
                </h1>
              </div>
            </div>

            <button
              type="button"
              onClick={onBackToSubjects}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/25 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
              <span>جميع المواد</span>
            </button>
          </div>
        </div>

        {/* Interactive Section Tabs */}
        <div className="px-4 sm:px-6 py-3 bg-slate-50/70 border-b border-slate-200">
          <div
            className="flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label={`أقسام مادة ${subject.name}`}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-h-[44px] inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? `${palette.buttonBg} text-white shadow-xs`
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{tab.label}</span>
                  {tab.id === 'lab' && (
                    <span
                      className={`text-xs ${isActive ? 'text-white/85' : 'text-slate-400'}`}
                    >
                      · قريباً
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Body */}
        <div className="p-4 sm:p-8">
          {/* 1. LESSONS TAB */}
          {activeTab === 'lessons' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-slate-900">
                    الدروس والشرح التفاعلي
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    اختر الدرس يدوياً لبدء التعلّم مع رفيق.
                  </p>
                </div>

                <div className="space-y-3.5">
                  {subject.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        lesson.isInteractiveAvailable
                          ? `${palette.cardBg} border-teal-300 shadow-xs`
                          : 'bg-slate-50/70 border-slate-200'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                          {lesson.isInteractiveAvailable ? (
                            <span className="text-teal-700">متاح للتجربة التفاعلية</span>
                          ) : (
                            <span className="text-slate-500">محتوى قادم</span>
                          )}
                          <span aria-hidden="true" className="text-slate-300">
                            ·
                          </span>
                          <span className="text-slate-500">{lesson.duration}</span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-slate-900">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{lesson.summary}</p>
                      </div>

                      {lesson.isInteractiveAvailable ? (
                        <button
                          type="button"
                          onClick={() => onStartLesson(lesson.id)}
                          className={`min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white ${palette.buttonBg} rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-xs`}
                        >
                          <Play className="w-4 h-4" aria-hidden="true" />
                          <span>ابدأ الدرس</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          aria-disabled="true"
                          className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200 rounded-xl cursor-not-allowed whitespace-nowrap shrink-0"
                        >
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>قريباً</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <aside className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-3.5">
                  <MascotAvatar mood="teaching" size="sm" interactive studentName={studentName} />
                  <div>
                    <p className="text-xs font-semibold text-teal-700">ملاحظة رفيق</p>
                    <p className="font-bold text-sm text-slate-900">أهلاً يا {studentName}!</p>
                  </div>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {subject.hasFullSampleLesson
                    ? 'اختر درس «مفهوم الكسور والأجزاء المتساوية» لتجربة الشرح البصري التفاعلي والأسئلة الذكية!'
                    : `في هذا النموذج الأولي نعرض خطة دروس ${subject.name}، ويمكنك أيضاً تجربة قسم الأنشطة وتقييم الفهم مباشرة من التبويبات بالأعلى.`}
                </p>
                {!subject.hasFullSampleLesson && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('activities')}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white ${palette.buttonBg} rounded-xl transition-colors cursor-pointer`}
                  >
                    <span>جرّب النشاط التفاعلي للمادة</span>
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </aside>
            </div>
          )}

          {/* 2. TEXTBOOK TAB */}
          {activeTab === 'textbook' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Styled Book Cover Mockup */}
              <div className="md:col-span-4 flex justify-center">
                <div
                  className={`w-56 h-72 rounded-2xl bg-gradient-to-br ${palette.headerGradient} text-white p-6 flex flex-col justify-between shadow-md border border-white/20`}
                >
                  <div className="flex items-center justify-between text-xs text-white/85">
                    <span>المنهج الدراسي</span>
                    <BookMarked className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-white/85">{selectedGrade.label}</p>
                    <h3 className="font-display text-2xl font-extrabold">{subject.name}</h3>
                  </div>
                  <div className="pt-3 border-t border-white/25 text-xs text-white/90">
                    منصة رفيق التعليمية
                  </div>
                </div>
              </div>

              {/* Textbook Info & Planned Upload Placeholder */}
              <div className="md:col-span-8 space-y-5">
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    الكتاب الدراسي · {selectedGrade.label}
                  </p>
                  <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
                    كتاب {subject.name} المنهجي
                  </h2>
                </div>

                <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-5 space-y-2">
                  <p className="font-bold text-sm text-slate-900">
                    مساحة الكتاب الرقمي · قريباً
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    سيتم رفع الكتب المدرسية المعتمدة وربطها مباشرة بالدروس والأسئلة في المرحلة
                    القادمة من تطوير المنصة. لا يتطلب هذا النموذج الأولي رفع أي ملفات حالياً.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <h3 className="font-display text-base font-bold text-slate-900">
                    الفصول المخطط تضمينها في الكتاب:
                  </h3>
                  <ul className="space-y-2">
                    {subject.textbookChapters.map((chapter) => (
                      <li
                        key={chapter}
                        className="flex items-center gap-2.5 text-sm text-slate-700 bg-white border border-slate-200 rounded-xl px-4 py-2.5"
                      >
                        <BookOpen
                          className={`w-4 h-4 ${palette.iconText} shrink-0`}
                          aria-hidden="true"
                        />
                        <span>{chapter}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 3. ACTIVITIES & EXERCISES TAB */}
          {activeTab === 'activities' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    الأنشطة والتدريبات · {subject.name}
                  </p>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                    نشاط تفاعلي سريع يا {studentName}
                  </h2>
                </div>
                {subject.id === 'math' && (
                  <button
                    type="button"
                    onClick={() => onStartLesson('fractions')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>افتح نشاط الكسور البصري الكامل</span>
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6">
                {renderExerciseCard(
                  subject.activityExercise,
                  activitySelectedId ?? undefined,
                  (choiceId) => setActivitySelectedId(choiceId),
                  activityChoice ? () => setActivitySelectedId(null) : undefined,
                )}
              </div>
            </div>
          )}

          {/* 4. UNDERSTANDING ASSESSMENT TAB */}
          {activeTab === 'assessment' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    تقييم الفهم · {subject.name}
                  </p>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                    تحقق من فهمك للمفهوم
                  </h2>
                </div>

                {subject.id === 'math' && (
                  <button
                    type="button"
                    onClick={onStartMathQuestion}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>بدء تقييم الكسور التفاعلي الكامل</span>
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              {subject.id === 'math' && mathStarsEarned !== null && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-amber-600 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-bold text-sm text-slate-900">
                        أحسنت يا {studentName}! تم اجتياز تقييم الكسور الأساسي
                      </p>
                      <p className="text-xs text-slate-600">
                        حصلت على {mathStarsEarned} من ٣ نجوم في درس الكسور.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((n) => (
                      <Star
                        key={n}
                        className={`w-5 h-5 ${
                          n <= mathStarsEarned
                            ? 'fill-amber-400 text-amber-500'
                            : 'fill-slate-100 text-slate-300'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {subject.assessmentQuestions.map((question, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6"
                  >
                    {renderExerciseCard(
                      question,
                      assessmentAnswers[idx],
                      (choiceId) =>
                        setAssessmentAnswers((prev) => ({ ...prev, [idx]: choiceId })),
                    )}
                  </div>
                ))}
              </div>

              {allAssessmentAnswered && (
                <div className="bg-white border-2 border-teal-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <MascotAvatar
                      mood={correctAssessmentCount === assessmentCount ? 'celebrating' : 'teaching'}
                      size="sm"
                    />
                    <div>
                      <p className="font-display font-bold text-lg text-slate-900">
                        {correctAssessmentCount === assessmentCount
                          ? `نتيجة التقييم: ممتاز يا ${studentName}! فهمت الفكرة الأساسية.`
                          : `نتيجة التقييم: بداية طيبة يا ${studentName}، يمكنك مراجعة الإجابة والمحاولة مجدداً.`}
                      </p>
                      <p className="text-sm text-slate-600 mt-0.5 tabular-nums">
                        الإجابات الصحيحة: {correctAssessmentCount} من {assessmentCount}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAssessmentAnswers({})}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer shrink-0"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    <span>إعادة التقييم</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 5. VIRTUAL LABORATORY TAB (SCIENCE SUBJECTS ONLY) */}
          {activeTab === 'lab' && subject.isScience && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-50 via-cyan-50/70 to-teal-50 border border-indigo-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Microscope className="w-10 h-10" aria-hidden="true" />
                </div>
                <div className="space-y-2 text-center md:text-right">
                  <div className="text-xs font-bold text-indigo-700">
                    المختبر الافتراضي لمادة {subject.name} · قريباً
                  </div>
                  <h2 className="font-display text-2xl font-extrabold text-slate-900">
                    تجارب علمية تفاعلية آمنة في انتظارك يا {studentName}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl">
                    سيتم إطلاق المختبر الافتراضي في مرحلة التطوير القادمة ليتيح لك إجراء التجارب
                    والمحاكاة العلمية التفاعلية خطوة بخطوة وملاحظة النتائج مباشرة.
                  </p>
                </div>
              </div>

              {subject.virtualLabExperiments && (
                <div className="space-y-3">
                  <h3 className="font-display text-base font-bold text-slate-900">
                    لمحة عن التجارب المخطط إتاحتها في مختبر {subject.name}:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {subject.virtualLabExperiments.map((exp) => (
                      <div
                        key={exp.title}
                        className="p-5 rounded-2xl bg-slate-50 border border-dashed border-slate-300 space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-display font-bold text-slate-900">
                            {exp.title}
                          </span>
                          <span className="text-xs font-semibold text-indigo-700 shrink-0">
                            قريباً
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isEarly && (
                <p className="text-xs text-slate-500">
                  مصمّم بأمان كامل لتجربة ممتعة وسهلة لطلاب المرحلة الابتدائية.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
