import { ArrowLeft, ArrowRight, FlaskConical } from 'lucide-react';
import { motion } from 'motion/react';
import {
  SUBJECT_COLOR_STYLES,
  getSubjectsForGrade,
  getTierVisualStyle,
  type GradeInfo,
} from '../data/curriculum';
import { MascotAvatar } from './MascotCard';
import { SubjectIcon } from './SubjectIcon';

interface SubjectsDashboardProps {
  studentName: string;
  selectedGrade: GradeInfo;
  onBackToSetup: () => void;
  onSelectSubject: (subjectId: string) => void;
}

export function SubjectsDashboard({
  studentName,
  selectedGrade,
  onBackToSetup,
  onSelectSubject,
}: SubjectsDashboardProps) {
  const subjects = getSubjectsForGrade(selectedGrade.id);
  const tierStyle = getTierVisualStyle(selectedGrade.tier);
  const isEarly = selectedGrade.tier === 'early';

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8"
    >
      {/* Personalized Greeting Banner */}
      <div
        className={`bg-white border border-slate-200 ${tierStyle.cardRadius} overflow-hidden shadow-xs`}
      >
        <div className={`h-2 w-full bg-gradient-to-l ${tierStyle.heroAccent}`} />
        <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <MascotAvatar mood="welcome" size="sm" interactive studentName={studentName} />
            <div className="space-y-1">
              <div className="text-xs sm:text-sm font-semibold text-teal-700 flex flex-wrap items-center gap-2">
                <span>{selectedGrade.label}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedGrade.tierName}</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                أهلاً بك يا {studentName}! اختر مادتك الدراسية
              </h1>
              <p className="text-sm sm:text-base text-slate-600">
                {isEarly
                  ? 'اضغط على المادة التي تحب أن تبدأ بها رحلتك اليوم.'
                  : 'المواد التالية مخصّصة لصفك الدراسي، وتشمل الدروس والأنشطة وتقييم الفهم.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onBackToSetup}
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
            <span>تعديل الاسم أو الصف</span>
          </button>
        </div>
      </div>

      {/* Colorful Subjects Grid */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
            المواد الدراسية المتاحة ({subjects.length} مواد)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            تجربة الكسور التفاعلية الكاملة متاحة في مادة الرياضيات
          </p>
        </div>

        <div
          className={`grid gap-4 sm:gap-5 ${
            isEarly
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}
        >
          {subjects.map((subject, idx) => {
            const palette = SUBJECT_COLOR_STYLES[subject.color];
            return (
              <motion.button
                key={subject.id}
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03, duration: 0.2 }}
                whileHover={{ y: -3 }}
                onClick={() => onSelectSubject(subject.id)}
                className={`group text-right border-2 ${palette.cardBg} ${palette.cardBorder} ${tierStyle.cardRadius} ${
                  isEarly ? 'p-6 min-h-[190px]' : 'p-5 min-h-[172px]'
                } flex flex-col justify-between gap-4 transition-all duration-150 cursor-pointer shadow-xs hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600`}
              >
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`${
                        isEarly ? 'w-14 h-14 rounded-2xl' : 'w-12 h-12 rounded-xl'
                      } ${palette.iconBg} flex items-center justify-center shadow-xs shrink-0 transition-transform duration-150 group-hover:scale-105`}
                    >
                      <SubjectIcon
                        icon={subject.icon}
                        className={isEarly ? 'w-7 h-7' : 'w-6 h-6'}
                      />
                    </div>

                    <div className="text-xs font-semibold text-left">
                      {subject.hasFullSampleLesson ? (
                        <span className="text-teal-700">نموذج تفاعلي متاح</span>
                      ) : subject.isScience ? (
                        <span className="inline-flex items-center gap-1 text-slate-600">
                          <FlaskConical className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>تضم مختبراً</span>
                        </span>
                      ) : (
                        <span className="text-slate-500">معاينة المادة</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3
                      className={`font-display font-extrabold text-slate-900 ${
                        isEarly ? 'text-xl' : 'text-lg'
                      }`}
                    >
                      {subject.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {subject.shortDesc}
                    </p>
                  </div>
                </div>

                <div
                  className={`pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs sm:text-sm font-bold ${palette.accentText}`}
                >
                  <span>افتح لوحة {subject.name}</span>
                  <ArrowLeft
                    className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
