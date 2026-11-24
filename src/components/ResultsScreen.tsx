import { Award, BookOpen, LayoutGrid, RotateCcw, Star } from 'lucide-react';
import { motion } from 'motion/react';
import {
  QUESTION_CONTENT,
  RESULT_COPY,
  getTierVisualStyle,
  type GradeInfo,
} from '../data/curriculum';
import { MascotAvatar } from './MascotCard';

interface ResultsScreenProps {
  studentName: string;
  selectedGrade: GradeInfo;
  attempts: number;
  onRepeatQuestion: () => void;
  onBackToLesson: () => void;
  onBackToSubjects: () => void;
}

export function ResultsScreen({
  studentName,
  selectedGrade,
  attempts,
  onRepeatQuestion,
  onBackToLesson,
  onBackToSubjects,
}: ResultsScreenProps) {
  const resultCopy = RESULT_COPY[selectedGrade.tier];
  const questionSummary = QUESTION_CONTENT[selectedGrade.tier].successSummary;
  const tierStyle = getTierVisualStyle(selectedGrade.tier);

  const earnedStars = attempts <= 1 ? 3 : attempts === 2 ? 2 : 1;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      <div
        className={`bg-white border border-slate-200 ${tierStyle.cardRadius} overflow-hidden shadow-sm`}
      >
        <div className="h-2 w-full bg-gradient-to-l from-amber-400 via-teal-500 to-emerald-500" />
        <div className="p-6 sm:p-10 text-center space-y-8 bg-gradient-to-b from-amber-50/35 via-white to-white">
          {/* Celebrating Mascot + Stars */}
          <div className="flex flex-col items-center space-y-5">
            <MascotAvatar mood="celebrating" size="md" interactive studentName={studentName} />

            <div
              className="flex items-center justify-center gap-3"
              aria-label={`حصلت على ${earnedStars} من ٣ نجوم`}
            >
              {[1, 2, 3].map((starIndex) => {
                const filled = starIndex <= earnedStars;
                return (
                  <motion.div
                    key={starIndex}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: starIndex * 0.08,
                      duration: 0.25,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Star
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${
                        filled
                          ? 'fill-amber-400 text-amber-500'
                          : 'fill-slate-100 text-slate-300'
                      }`}
                      aria-hidden="true"
                    />
                  </motion.div>
                );
              })}
            </div>

            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center justify-center gap-2 text-sm font-bold text-teal-800">
                <Award className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
                <span>{resultCopy.achievementTitle}</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 text-balance">
                أحسنت يا {studentName}! أتممت الدرس بنجاح
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {resultCopy.celebrationMessage}
              </p>
              <p className="text-sm text-slate-500">{questionSummary}</p>
            </div>
          </div>

          {/* Summary Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-y border-slate-100 py-5 text-center">
            <div>
              <p className="text-xs text-slate-500">الطالب</p>
              <p className="font-bold text-sm sm:text-base text-slate-900 mt-1">{studentName}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">الصف الدراسي</p>
              <p className="font-bold text-sm sm:text-base text-slate-900 mt-1">
                الصف {selectedGrade.shortLabel}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">المحاولات</p>
              <p className="font-mono font-bold text-sm sm:text-base text-slate-900 mt-1 tabular-nums">
                {attempts}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">النجوم المكتسبة</p>
              <p className="font-mono font-bold text-sm sm:text-base text-amber-600 mt-1 tabular-nums">
                {earnedStars} / 3
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={onRepeatQuestion}
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-gradient-to-l from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-5 h-5" aria-hidden="true" />
              <span>إعادة السؤال</span>
            </button>

            <button
              type="button"
              onClick={onBackToLesson}
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
            >
              <BookOpen className="w-5 h-5" aria-hidden="true" />
              <span>العودة إلى الدرس</span>
            </button>
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={onBackToSubjects}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-800 transition-colors cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4" aria-hidden="true" />
              <span>العودة إلى لوحة المواد الدراسية</span>
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
