import { ArrowLeft, BookOpen, Compass, FlaskConical, Shapes } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { MascotAvatar } from './MascotCard';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [mascotTip, setMascotTip] = useState(
    'أهلاً بك! أنا رفيق، سأساعدك على استكشاف دروسك بطريقة ممتعة وواضحة. اضغط عليّ لتتعرّف أكثر!',
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        {/* Vibrant Top Accent Strip */}
        <div className="h-2 w-full bg-gradient-to-l from-teal-500 via-sky-500 to-amber-400" />

        <div className="p-5 sm:p-10 lg:p-14 bg-gradient-to-br from-teal-50/40 via-white to-amber-50/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text & CTA Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-sm font-semibold text-teal-700 flex flex-wrap items-center gap-2">
                <span>منصة تعلّم عربية تفاعلية</span>
                <span aria-hidden="true">·</span>
                <span>جميع المواد من الصف الأول حتى الثاني عشر</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight text-balance">
                تعلّم بذكاء ومتعة مع <span className="text-teal-700">رفيق</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
                مرحباً يا صديقي! مع <strong className="text-slate-900 font-bold">رفيق</strong>{' '}
                ستحصل على تجربة تعليمية مخصّصة باسمك وصفك الدراسي، مع مواد متنوعة، شرح بصري
                تفاعلي، وأنشطة مشوّقة تنمّي فهمك خطوة بخطوة.
              </p>

              {/* Colorful Highlights Grid */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100">
                  <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">مخصّص لاسمك وصفك</p>
                    <p className="text-xs text-slate-600 mt-0.5">يتكيّف من الصف ١ حتى ١٢</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">كل المواد الدراسية</p>
                    <p className="text-xs text-slate-600 mt-0.5">منسّقة حسب مرحلتك</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100">
                  <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                    <Shapes className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">دروس وأنشطة تفاعلية</p>
                    <p className="text-xs text-slate-600 mt-0.5">تجربة حيّة للكسور والتمارين</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-violet-50/70 border border-violet-100">
                  <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0">
                    <FlaskConical className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">مختبرات علمية مستقبلية</p>
                    <p className="text-xs text-slate-600 mt-0.5">مساحة مخصّصة للعلوم</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onStart}
                  className="w-full sm:w-auto min-h-[54px] inline-flex items-center justify-center gap-3 px-8 py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-l from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 active:scale-[0.99] rounded-2xl transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 shadow-md"
                >
                  <span>ابدأ رحلتك</span>
                  <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Interactive Mascot Visual Column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <MascotAvatar
                mood="welcome"
                size="lg"
                interactive
                onTipChange={(tip) => setMascotTip(tip)}
              />
              <motion.div
                key={mascotTip}
                initial={{ opacity: 0.6, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 bg-white border border-teal-200 rounded-2xl px-5 py-4 max-w-sm text-center shadow-xs"
              >
                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                  «{mascotTip}»
                </p>
                <p className="text-xs text-teal-700 font-semibold mt-2">
                  اضغط على صورة رفيق لتبديل الرسالة
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
