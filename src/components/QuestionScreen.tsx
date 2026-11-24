import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  QUESTION_CONTENT,
  getTierVisualStyle,
  type GradeInfo,
  type QuestionChoice,
} from '../data/curriculum';
import { FractionVisual } from './FractionVisual';
import { MascotAvatar } from './MascotCard';

interface QuestionScreenProps {
  studentName: string;
  selectedGrade: GradeInfo;
  attempts: number;
  isSolved: boolean;
  onAttemptWrong: () => void;
  onSolved: () => void;
  onBackToLesson: () => void;
  onViewResults: () => void;
}

export function QuestionScreen({
  studentName,
  selectedGrade,
  attempts,
  isSolved,
  onAttemptWrong,
  onSolved,
  onBackToLesson,
  onViewResults,
}: QuestionScreenProps) {
  const question = QUESTION_CONTENT[selectedGrade.tier];
  const tierStyle = getTierVisualStyle(selectedGrade.tier);
  const isEarly = selectedGrade.tier === 'early';

  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(
    isSolved ? question.choices.find((c) => c.isCorrect)?.id ?? null : null,
  );
  const [wrongTriedIds, setWrongTriedIds] = useState<string[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);

  const selectedChoice = question.choices.find((c) => c.id === selectedChoiceId) ?? null;
  const shadedSet = Array.from(
    { length: question.totalParts },
    (_, i) => i < question.shadedParts,
  );

  const handleSelectChoice = (choice: QuestionChoice) => {
    if (isSolved) return;
    setSelectedChoiceId(choice.id);

    if (choice.isCorrect) {
      onSolved();
    } else {
      if (!wrongTriedIds.includes(choice.id)) {
        setWrongTriedIds((prev) => [...prev, choice.id]);
      }
      onAttemptWrong();
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10"
    >
      {/* Header Row */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs sm:text-sm font-semibold text-teal-700">
            {selectedGrade.label} · الرياضيات · {question.kicker}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            تقييم الفهم يا {studentName}
          </h1>
        </div>

        <button
          type="button"
          onClick={onBackToLesson}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
          <span>العودة إلى الدرس</span>
        </button>
      </div>

      <div
        className={`bg-white border border-slate-200 ${tierStyle.cardRadius} p-6 sm:p-8 lg:p-10 shadow-xs space-y-8`}
      >
        {/* Question Prompt & Visual Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 bg-gradient-to-br from-teal-50/70 via-white to-amber-50/50 border border-slate-200/80 rounded-2xl p-6 flex flex-col items-center justify-center">
            <FractionVisual
              shape={question.shape}
              totalParts={question.totalParts}
              shadedSet={shadedSet}
              interactive={false}
              size="md"
            />
            <p className="text-xs text-slate-500 mt-4 tabular-nums">
              {question.totalParts} أجزاء متساوية
            </p>
          </div>

          <div className="md:col-span-7 space-y-5">
            <h2
              className={`font-display font-bold text-slate-900 leading-relaxed text-balance ${
                isEarly ? 'text-xl sm:text-2xl' : 'text-lg sm:text-2xl'
              }`}
            >
              {question.prompt}
            </h2>

            {!isSolved && (
              <div>
                <button
                  type="button"
                  onClick={() => setShowHint((prev) => !prev)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800 cursor-pointer"
                >
                  <Lightbulb className="w-4 h-4" aria-hidden="true" />
                  <span>{showHint ? 'إخفاء التلميح' : 'هل تحتاج إلى تلميح من رفيق؟'}</span>
                </button>
                {showHint && (
                  <p className="mt-2 text-sm text-slate-700 bg-amber-50/70 border border-amber-200 rounded-xl px-4 py-3 leading-relaxed">
                    {question.hint}
                  </p>
                )}
              </div>
            )}

            {/* Answer Choices Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {question.choices.map((choice) => {
                const isSelected = selectedChoiceId === choice.id;
                const isWrongTried = wrongTriedIds.includes(choice.id);
                const isCorrectHighlight = isSolved && choice.isCorrect;

                let cardStyle =
                  'bg-slate-50 border-slate-200 text-slate-900 hover:bg-white hover:border-teal-500';
                if (isCorrectHighlight) {
                  cardStyle =
                    'bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600';
                } else if (isSelected && !choice.isCorrect) {
                  cardStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-500';
                } else if (isWrongTried) {
                  cardStyle = 'bg-slate-100 border-slate-200 text-slate-500';
                }

                return (
                  <button
                    key={choice.id}
                    type="button"
                    disabled={isSolved}
                    onClick={() => handleSelectChoice(choice)}
                    aria-pressed={isSelected}
                    className={`min-h-[72px] p-4 rounded-2xl border text-right transition-all duration-150 flex items-center justify-between gap-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 ${
                      isSolved ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
                    } ${cardStyle}`}
                  >
                    <div className="space-y-0.5">
                      <span className="block font-bold text-base">{choice.label}</span>
                      {isWrongTried && !isSelected && (
                        <span className="block text-xs text-slate-500">جرّبتها سابقاً</span>
                      )}
                    </div>

                    <div
                      className="flex flex-col items-center justify-center px-3 py-1.5 bg-white border border-slate-200/80 rounded-lg min-w-[54px] shrink-0"
                      dir="ltr"
                    >
                      <span className="font-mono text-lg font-bold tabular-nums leading-none">
                        {choice.numerator}
                      </span>
                      <span className="w-6 h-0.5 bg-slate-800 my-1" aria-hidden="true" />
                      <span className="font-mono text-lg font-bold tabular-nums leading-none">
                        {choice.denominator}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Immediate Diagnostic Feedback Panel */}
        {selectedChoice && (
          <motion.div
            key={selectedChoice.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            aria-live="polite"
            className={`rounded-2xl border p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 ${
              selectedChoice.isCorrect
                ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                : 'bg-amber-50/90 border-amber-300 text-slate-900'
            }`}
          >
            <div className="flex items-start gap-4">
              <MascotAvatar
                mood={selectedChoice.isCorrect ? 'celebrating' : 'teaching'}
                size="sm"
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-display font-bold text-base sm:text-lg">
                  {selectedChoice.isCorrect ? (
                    <>
                      <CheckCircle2
                        className="w-5 h-5 text-emerald-700 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-emerald-900">إجابة صحيحة! أحسنت يا {studentName}</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" aria-hidden="true" />
                      <span className="text-amber-950">
                        محاولة جيدة يا {studentName} — لنتأمّل معاً
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-slate-700">
                  {selectedChoice.feedback}
                </p>
                {!selectedChoice.isCorrect && (
                  <p className="text-xs sm:text-sm font-medium text-amber-900 pt-1">
                    يمكنك اختيار إجابة أخرى مباشرة للمحاولة من جديد. (عدد المحاولات:{' '}
                    <span className="font-mono tabular-nums">{attempts}</span>)
                  </p>
                )}
              </div>
            </div>

            {isSolved && (
              <button
                type="button"
                onClick={onViewResults}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-bold text-white bg-gradient-to-l from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
              >
                <span>عرض النتيجة والمكافأة</span>
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </button>
            )}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
