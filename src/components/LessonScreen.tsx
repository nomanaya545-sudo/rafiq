import { ArrowLeft, ArrowRight, Mic, Minus, Plus, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import {
  LESSON_CONTENT,
  describeFractionInArabic,
  getTierVisualStyle,
  type GradeInfo,
} from '../data/curriculum';
import { FractionVisual, type FractionShape } from './FractionVisual';
import { MascotAvatar } from './MascotCard';

interface LessonScreenProps {
  studentName: string;
  selectedGrade: GradeInfo;
  onBackToSubject: () => void;
  onGoToQuestion: () => void;
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function buildShadedArray(total: number, shadedCount: number): boolean[] {
  return Array.from({ length: total }, (_, idx) => idx < shadedCount);
}

export function LessonScreen({
  studentName,
  selectedGrade,
  onBackToSubject,
  onGoToQuestion,
}: LessonScreenProps) {
  const lesson = LESSON_CONTENT[selectedGrade.tier];
  const tierStyle = getTierVisualStyle(selectedGrade.tier);
  const isEarly = selectedGrade.tier === 'early';
  const isSenior = selectedGrade.tier === 'senior';

  const [shape, setShape] = useState<FractionShape>(isSenior ? 'grid' : 'circle');
  const [totalParts, setTotalParts] = useState<number>(lesson.defaultDenominator);
  const [shadedSet, setShadedSet] = useState<boolean[]>(() =>
    buildShadedArray(lesson.defaultDenominator, lesson.defaultNumerator),
  );

  useEffect(() => {
    setShape(selectedGrade.tier === 'senior' ? 'grid' : 'circle');
    setTotalParts(lesson.defaultDenominator);
    setShadedSet(buildShadedArray(lesson.defaultDenominator, lesson.defaultNumerator));
  }, [selectedGrade.tier, lesson.defaultDenominator, lesson.defaultNumerator]);

  const shadedCount = shadedSet.filter(Boolean).length;
  const percentage = Math.round((shadedCount / totalParts) * 100);
  const decimalValue = (shadedCount / totalParts).toFixed(2).replace(/\.?0+$/, '');
  const divisor = gcd(shadedCount, totalParts);
  const simplifiedNum = shadedCount / divisor;
  const simplifiedDen = totalParts / divisor;
  const canSimplify = shadedCount > 0 && shadedCount < totalParts && divisor > 1;

  const handleTogglePart = (index: number) => {
    setShadedSet((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  const handleDenominatorChange = (nextTotal: number) => {
    const clamped = Math.max(2, Math.min(lesson.maxDenominator, nextTotal));
    const currentShaded = Math.min(shadedCount, clamped);
    setTotalParts(clamped);
    setShadedSet(buildShadedArray(clamped, currentShaded === 0 ? 1 : currentShaded));
  };

  const handleApplyPreset = (num: number, den: number) => {
    const safeDen = Math.min(den, lesson.maxDenominator);
    const safeNum = Math.min(num, safeDen);
    setTotalParts(safeDen);
    setShadedSet(buildShadedArray(safeDen, safeNum));
  };

  const handleReset = () => {
    setTotalParts(lesson.defaultDenominator);
    setShadedSet(buildShadedArray(lesson.defaultDenominator, lesson.defaultNumerator));
  };

  const availableShapes: { id: FractionShape; label: string }[] = isEarly
    ? [
        { id: 'circle', label: 'دائرة' },
        { id: 'bar', label: 'شريط' },
      ]
    : [
        { id: 'circle', label: 'دائرة' },
        { id: 'bar', label: 'شريط' },
        { id: 'grid', label: 'شبكة مربعات' },
      ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10"
    >
      {/* Lesson Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs sm:text-sm font-semibold text-slate-500 flex flex-wrap items-center gap-2">
            <span>{selectedGrade.label}</span>
            <span aria-hidden="true">·</span>
            <span>الرياضيات</span>
            <span aria-hidden="true">·</span>
            <span className="text-teal-700">{selectedGrade.tierName}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 text-balance">
            {lesson.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">{lesson.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={onBackToSubject}
          className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
          <span>العودة إلى لوحة الرياضيات</span>
        </button>
      </div>

      {/* Two-Zone Educational Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Main Interactive Visual Stage */}
        <div
          className={`lg:col-span-7 bg-white border border-slate-200 ${tierStyle.cardRadius} p-4 sm:p-8 shadow-xs space-y-6`}
        >
          {/* Shape Selector + Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl"
              role="group"
              aria-label="اختيار شكل الكسر"
            >
              {availableShapes.map((item) => {
                const active = shape === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setShape(item.id)}
                    aria-pressed={active}
                    className={`min-h-[40px] px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-white text-teal-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>إعادة ضبط</span>
            </button>
          </div>

          {/* Interactive SVG Canvas & Live Fraction Readout */}
          <div className="bg-gradient-to-br from-teal-50/60 via-white to-amber-50/40 border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-around gap-8">
            <div className="w-full sm:w-auto flex-1 flex flex-col items-center">
              <FractionVisual
                shape={shape}
                totalParts={totalParts}
                shadedSet={shadedSet}
                interactive
                onTogglePart={handleTogglePart}
                size="lg"
              />
              <p className="text-xs sm:text-sm text-slate-500 mt-4 text-center">
                اضغط على أي جزء في الشكل لتلوينه أو إزالة التلوين
              </p>
            </div>

            {/* Live Fraction Readout */}
            <div className="flex flex-col items-center text-center min-w-[160px] space-y-3">
              <div
                className="flex flex-col items-center justify-center px-6 py-4 bg-white border-2 border-teal-200 rounded-2xl shadow-xs"
                dir="ltr"
              >
                <span className="font-mono text-4xl sm:text-5xl font-bold text-teal-700 tabular-nums leading-none">
                  {shadedCount}
                </span>
                <span className="w-16 h-1 bg-slate-900 rounded-full my-2.5" aria-hidden="true" />
                <span className="font-mono text-4xl sm:text-5xl font-bold text-slate-900 tabular-nums leading-none">
                  {totalParts}
                </span>
              </div>

              <div>
                <p className="font-display text-lg font-bold text-slate-900">
                  {describeFractionInArabic(shadedCount, totalParts)}
                </p>
                {isEarly ? (
                  <p className="text-sm text-slate-600 mt-0.5 tabular-nums">
                    {shadedCount} قطعة ملوّنة من أصل {totalParts}
                  </p>
                ) : (
                  <p className="text-xs text-slate-500 mt-1 tabular-nums">
                    البسط: {shadedCount} · المقام: {totalParts}
                  </p>
                )}
              </div>

              {lesson.showDecimalsAndPercent && (
                <div className="pt-2 border-t border-slate-200 w-full text-xs sm:text-sm text-slate-700 space-y-1 tabular-nums">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-500">النسبة المئوية:</span>
                    <span className="font-mono font-semibold text-slate-900" dir="ltr">
                      {percentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-500">التمثيل العشري:</span>
                    <span className="font-mono font-semibold text-slate-900" dir="ltr">
                      {decimalValue}
                    </span>
                  </div>
                  {isSenior && canSimplify && (
                    <div className="flex items-center justify-between gap-4 text-teal-800 font-semibold">
                      <span>أبسط صورة:</span>
                      <span className="font-mono" dir="ltr">
                        {simplifiedNum}/{simplifiedDen}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Controls: Total Parts (Denominator) + Quick Presets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-900">عدد الأجزاء الكلي (المقام)</p>
                <p className="text-xs text-slate-500 tabular-nums">
                  من ٢ إلى {lesson.maxDenominator} أجزاء متساوية
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleDenominatorChange(totalParts - 1)}
                  disabled={totalParts <= 2}
                  aria-label="تقليل عدد الأجزاء"
                  className="w-11 h-11 rounded-lg bg-white border border-slate-200 hover:border-teal-500 text-slate-800 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  <Minus className="w-4 h-4" aria-hidden="true" />
                </button>
                <span className="font-mono text-lg font-bold text-slate-900 w-7 text-center tabular-nums">
                  {totalParts}
                </span>
                <button
                  type="button"
                  onClick={() => handleDenominatorChange(totalParts + 1)}
                  disabled={totalParts >= lesson.maxDenominator}
                  aria-label="زيادة عدد الأجزاء"
                  className="w-11 h-11 rounded-lg bg-white border border-slate-200 hover:border-teal-500 text-slate-800 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-sm font-bold text-slate-900 mb-2">أمثلة سريعة للتجربة</p>
              <div className="flex flex-wrap gap-2">
                {lesson.presets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleApplyPreset(preset.numerator, preset.denominator)}
                    className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 hover:border-teal-500 hover:text-teal-800 text-slate-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Companion, Concept Notes, Voice Placeholder & CTA */}
        <div className="lg:col-span-5 space-y-5">
          {/* Rafiq Friendly Message */}
          <div
            className={`bg-white border border-slate-200 ${tierStyle.cardRadius} p-5 sm:p-6 shadow-xs`}
          >
            <div className="flex items-start gap-4">
              <MascotAvatar mood="teaching" size="sm" interactive studentName={studentName} />
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-teal-700">
                  رسالة من رفيق إلى {studentName}
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  أهلاً يا {studentName}! {lesson.rafiqMessage}
                </p>
              </div>
            </div>

            <hr className="border-slate-100 my-5" />

            {/* Bite-sized Grade-Adapted Concepts */}
            <div className="space-y-4">
              <h2 className="font-display text-base font-bold text-slate-900">أهم ما في الدرس</h2>
              <ul className="space-y-3">
                {lesson.concepts.map((concept) => (
                  <li key={concept.term} className="text-sm leading-relaxed">
                    <p className="font-bold text-slate-900">{concept.term}</p>
                    <p className="text-slate-600 mt-0.5">{concept.explanation}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Prepared Voice Interaction Placeholder Area */}
          <div
            className={`bg-gradient-to-br from-slate-100 via-white to-sky-50/50 border border-dashed border-slate-300 ${tierStyle.cardRadius} p-5 space-y-3`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 text-slate-800">
                <Mic className="w-5 h-5 text-slate-500 shrink-0" aria-hidden="true" />
                <h3 className="font-display text-sm sm:text-base font-bold">
                  التفاعل الصوتي مع رفيق
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500">قريباً</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              تُعدّ هذه المساحة لاستقبال الأسئلة الصوتية والتحدّث المباشر مع رفيق في المرحلة القادمة
              من التطوير.
            </p>

            <button
              type="button"
              disabled
              aria-disabled="true"
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-500 bg-white/80 border border-slate-200 rounded-xl cursor-not-allowed opacity-75"
            >
              <Mic className="w-4 h-4" aria-hidden="true" />
              <span>تحدّث مع رفيق (سيتاح قريباً)</span>
            </button>
          </div>

          {/* Primary Next Step CTA */}
          <button
            type="button"
            onClick={onGoToQuestion}
            className={`w-full min-h-[54px] inline-flex items-center justify-center gap-3 px-6 py-4 text-base font-bold text-white bg-gradient-to-l from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 active:scale-[0.99] ${tierStyle.buttonRadius} transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 shadow-sm`}
          >
            <span>اختبر فهمك في السؤال التفاعلي</span>
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
