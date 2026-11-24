export type ScreenId =
  | 'welcome'
  | 'setup'
  | 'subjects'
  | 'subject'
  | 'lesson'
  | 'question'
  | 'results';

export type GradeTier = 'early' | 'middle' | 'senior';

export interface GradeInfo {
  id: number;
  label: string;
  shortLabel: string;
  stage: 'المرحلة الابتدائية' | 'المرحلة المتوسطة' | 'المرحلة الثانوية';
  tier: GradeTier;
  tierName: string;
  adaptationNote: string;
}

export type SubjectIconKey =
  | 'calculator'
  | 'book-open'
  | 'globe'
  | 'moon-star'
  | 'atom'
  | 'flask'
  | 'zap'
  | 'dna'
  | 'users'
  | 'map'
  | 'landmark'
  | 'laptop';

export type SubjectColorKey =
  | 'teal'
  | 'amber'
  | 'sky'
  | 'emerald'
  | 'cyan'
  | 'violet'
  | 'indigo'
  | 'green'
  | 'orange'
  | 'lime'
  | 'rose'
  | 'slate';

export interface SampleLessonItem {
  id: string;
  title: string;
  summary: string;
  duration: string;
  isInteractiveAvailable: boolean;
}

export interface SampleExercise {
  prompt: string;
  choices: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export interface LabExperimentPreview {
  title: string;
  description: string;
}

export interface SubjectDefinition {
  id: string;
  name: string;
  shortDesc: string;
  icon: SubjectIconKey;
  color: SubjectColorKey;
  isScience: boolean;
  hasFullSampleLesson: boolean;
  minGrade: number;
  maxGrade: number;
  textbookChapters: string[];
  lessons: SampleLessonItem[];
  activityExercise: SampleExercise;
  assessmentQuestions: SampleExercise[];
  virtualLabExperiments?: LabExperimentPreview[];
}

export interface FractionPreset {
  id: string;
  label: string;
  numerator: number;
  denominator: number;
}

export interface LessonAdaptation {
  title: string;
  subtitle: string;
  rafiqMessage: string;
  concepts: {
    term: string;
    explanation: string;
  }[];
  defaultNumerator: number;
  defaultDenominator: number;
  maxDenominator: number;
  showDecimalsAndPercent: boolean;
  presets: FractionPreset[];
}

export interface QuestionChoice {
  id: string;
  numerator: number;
  denominator: number;
  label: string;
  isCorrect: boolean;
  feedback: string;
}

export interface QuestionAdaptation {
  kicker: string;
  prompt: string;
  hint: string;
  shape: 'circle' | 'bar' | 'grid';
  shadedParts: number;
  totalParts: number;
  choices: QuestionChoice[];
  successSummary: string;
}

export interface TierResultCopy {
  achievementTitle: string;
  celebrationMessage: string;
}

export const GRADES: GradeInfo[] = [
  {
    id: 1,
    label: 'الصف الأول الابتدائي',
    shortLabel: 'الأول',
    stage: 'المرحلة الابتدائية',
    tier: 'early',
    tierName: 'تأسيس بصري مرح',
    adaptationNote: 'ألوان مبهجة، أزرار كبيرة سهلة اللمس، ورسومات توضيحية مبسطة.',
  },
  {
    id: 2,
    label: 'الصف الثاني الابتدائي',
    shortLabel: 'الثاني',
    stage: 'المرحلة الابتدائية',
    tier: 'early',
    tierName: 'تأسيس بصري مرح',
    adaptationNote: 'ألوان مبهجة، أزرار كبيرة سهلة اللمس، ورسومات توضيحية مبسطة.',
  },
  {
    id: 3,
    label: 'الصف الثالث الابتدائي',
    shortLabel: 'الثالث',
    stage: 'المرحلة الابتدائية',
    tier: 'early',
    tierName: 'تأسيس بصري مرح',
    adaptationNote: 'ألوان مبهجة، أزرار كبيرة سهلة اللمس، ورسومات توضيحية مبسطة.',
  },
  {
    id: 4,
    label: 'الصف الرابع الابتدائي',
    shortLabel: 'الرابع',
    stage: 'المرحلة الابتدائية',
    tier: 'early',
    tierName: 'تأسيس بصري مرح',
    adaptationNote: 'ألوان مبهجة، أزرار كبيرة سهلة اللمس، ورسومات توضيحية مبسطة.',
  },
  {
    id: 5,
    label: 'الصف الخامس الابتدائي',
    shortLabel: 'الخامس',
    stage: 'المرحلة الابتدائية',
    tier: 'middle',
    tierName: 'استكشاف مفاهيمي متوازن',
    adaptationNote: 'تصميم حيوي منظم مع تمثيل بصري مزدوج وتفصيل البسط والمقام.',
  },
  {
    id: 6,
    label: 'الصف السادس الابتدائي',
    shortLabel: 'السادس',
    stage: 'المرحلة الابتدائية',
    tier: 'middle',
    tierName: 'استكشاف مفاهيمي متوازن',
    adaptationNote: 'تصميم حيوي منظم مع تمثيل بصري مزدوج وتفصيل البسط والمقام.',
  },
  {
    id: 7,
    label: 'الصف السابع (الأول المتوسط)',
    shortLabel: 'السابع',
    stage: 'المرحلة المتوسطة',
    tier: 'middle',
    tierName: 'استكشاف مفاهيمي متوازن',
    adaptationNote: 'تصميم حيوي منظم مع تمثيل بصري مزدوج وتفصيل البسط والمقام.',
  },
  {
    id: 8,
    label: 'الصف الثامن (الثاني المتوسط)',
    shortLabel: 'الثامن',
    stage: 'المرحلة المتوسطة',
    tier: 'middle',
    tierName: 'استكشاف مفاهيمي متوازن',
    adaptationNote: 'تصميم حيوي منظم مع تمثيل بصري مزدوج وتفصيل البسط والمقام.',
  },
  {
    id: 9,
    label: 'الصف التاسع (الثالث المتوسط)',
    shortLabel: 'التاسع',
    stage: 'المرحلة المتوسطة',
    tier: 'senior',
    tierName: 'تحليل علمي متقدم',
    adaptationNote: 'واجهة عصرية متزنة تشمل الكسور المكافئة، التمثيل العشري، وفروع العلوم المتخصصة.',
  },
  {
    id: 10,
    label: 'الصف العاشر (الأول الثانوي)',
    shortLabel: 'العاشر',
    stage: 'المرحلة الثانوية',
    tier: 'senior',
    tierName: 'تحليل علمي متقدم',
    adaptationNote: 'واجهة عصرية متزنة تشمل الكسور المكافئة، التمثيل العشري، وفروع العلوم المتخصصة.',
  },
  {
    id: 11,
    label: 'الصف الحادي عشر (الثاني الثانوي)',
    shortLabel: 'الحادي عشر',
    stage: 'المرحلة الثانوية',
    tier: 'senior',
    tierName: 'تحليل علمي متقدم',
    adaptationNote: 'واجهة عصرية متزنة تشمل الكسور المكافئة، التمثيل العشري، وفروع العلوم المتخصصة.',
  },
  {
    id: 12,
    label: 'الصف الثاني عشر (الثالث الثانوي)',
    shortLabel: 'الثاني عشر',
    stage: 'المرحلة الثانوية',
    tier: 'senior',
    tierName: 'تحليل علمي متقدم',
    adaptationNote: 'واجهة عصرية متزنة تشمل الكسور المكافئة، التمثيل العشري، وفروع العلوم المتخصصة.',
  },
];

export const SUBJECT_COLOR_STYLES: Record<
  SubjectColorKey,
  {
    cardBg: string;
    cardBorder: string;
    iconBg: string;
    iconText: string;
    accentText: string;
    headerGradient: string;
    buttonBg: string;
  }
> = {
  teal: {
    cardBg: 'bg-gradient-to-br from-teal-50 via-white to-emerald-50/60',
    cardBorder: 'border-teal-200 hover:border-teal-500',
    iconBg: 'bg-teal-600 text-white',
    iconText: 'text-teal-700',
    accentText: 'text-teal-800',
    headerGradient: 'from-teal-600 to-emerald-600',
    buttonBg: 'bg-teal-700 hover:bg-teal-800',
  },
  amber: {
    cardBg: 'bg-gradient-to-br from-amber-50 via-white to-orange-50/50',
    cardBorder: 'border-amber-200 hover:border-amber-500',
    iconBg: 'bg-amber-500 text-white',
    iconText: 'text-amber-700',
    accentText: 'text-amber-800',
    headerGradient: 'from-amber-500 to-orange-500',
    buttonBg: 'bg-amber-600 hover:bg-amber-700',
  },
  sky: {
    cardBg: 'bg-gradient-to-br from-sky-50 via-white to-blue-50/50',
    cardBorder: 'border-sky-200 hover:border-sky-500',
    iconBg: 'bg-sky-600 text-white',
    iconText: 'text-sky-700',
    accentText: 'text-sky-800',
    headerGradient: 'from-sky-500 to-blue-600',
    buttonBg: 'bg-sky-700 hover:bg-sky-800',
  },
  emerald: {
    cardBg: 'bg-gradient-to-br from-emerald-50 via-white to-teal-50/50',
    cardBorder: 'border-emerald-200 hover:border-emerald-500',
    iconBg: 'bg-emerald-600 text-white',
    iconText: 'text-emerald-700',
    accentText: 'text-emerald-800',
    headerGradient: 'from-emerald-600 to-teal-600',
    buttonBg: 'bg-emerald-700 hover:bg-emerald-800',
  },
  cyan: {
    cardBg: 'bg-gradient-to-br from-cyan-50 via-white to-sky-50/50',
    cardBorder: 'border-cyan-200 hover:border-cyan-500',
    iconBg: 'bg-cyan-600 text-white',
    iconText: 'text-cyan-700',
    accentText: 'text-cyan-800',
    headerGradient: 'from-cyan-600 to-sky-600',
    buttonBg: 'bg-cyan-700 hover:bg-cyan-800',
  },
  violet: {
    cardBg: 'bg-gradient-to-br from-violet-50 via-white to-indigo-50/50',
    cardBorder: 'border-violet-200 hover:border-violet-500',
    iconBg: 'bg-violet-600 text-white',
    iconText: 'text-violet-700',
    accentText: 'text-violet-800',
    headerGradient: 'from-violet-600 to-indigo-600',
    buttonBg: 'bg-violet-700 hover:bg-violet-800',
  },
  indigo: {
    cardBg: 'bg-gradient-to-br from-indigo-50 via-white to-blue-50/50',
    cardBorder: 'border-indigo-200 hover:border-indigo-500',
    iconBg: 'bg-indigo-600 text-white',
    iconText: 'text-indigo-700',
    accentText: 'text-indigo-800',
    headerGradient: 'from-indigo-600 to-blue-600',
    buttonBg: 'bg-indigo-700 hover:bg-indigo-800',
  },
  green: {
    cardBg: 'bg-gradient-to-br from-green-50 via-white to-emerald-50/50',
    cardBorder: 'border-green-200 hover:border-green-500',
    iconBg: 'bg-green-600 text-white',
    iconText: 'text-green-700',
    accentText: 'text-green-800',
    headerGradient: 'from-green-600 to-emerald-600',
    buttonBg: 'bg-green-700 hover:bg-green-800',
  },
  orange: {
    cardBg: 'bg-gradient-to-br from-orange-50 via-white to-amber-50/50',
    cardBorder: 'border-orange-200 hover:border-orange-500',
    iconBg: 'bg-orange-500 text-white',
    iconText: 'text-orange-700',
    accentText: 'text-orange-800',
    headerGradient: 'from-orange-500 to-amber-500',
    buttonBg: 'bg-orange-600 hover:bg-orange-700',
  },
  lime: {
    cardBg: 'bg-gradient-to-br from-lime-50 via-white to-emerald-50/50',
    cardBorder: 'border-lime-300 hover:border-lime-600',
    iconBg: 'bg-lime-600 text-white',
    iconText: 'text-lime-700',
    accentText: 'text-lime-800',
    headerGradient: 'from-lime-600 to-emerald-600',
    buttonBg: 'bg-lime-700 hover:bg-lime-800',
  },
  rose: {
    cardBg: 'bg-gradient-to-br from-rose-50 via-white to-orange-50/40',
    cardBorder: 'border-rose-200 hover:border-rose-500',
    iconBg: 'bg-rose-600 text-white',
    iconText: 'text-rose-700',
    accentText: 'text-rose-800',
    headerGradient: 'from-rose-600 to-orange-500',
    buttonBg: 'bg-rose-700 hover:bg-rose-800',
  },
  slate: {
    cardBg: 'bg-gradient-to-br from-slate-100 via-white to-cyan-50/50',
    cardBorder: 'border-slate-300 hover:border-slate-600',
    iconBg: 'bg-slate-800 text-white',
    iconText: 'text-slate-700',
    accentText: 'text-slate-800',
    headerGradient: 'from-slate-700 to-slate-900',
    buttonBg: 'bg-slate-800 hover:bg-slate-900',
  },
};

export const ALL_SUBJECTS: SubjectDefinition[] = [
  {
    id: 'math',
    name: 'الرياضيات',
    shortDesc: 'الأعداد، الكسور، والمنطق الرياضي بأسلوب بصري تفاعلي',
    icon: 'calculator',
    color: 'teal',
    isScience: false,
    hasFullSampleLesson: true,
    minGrade: 1,
    maxGrade: 12,
    textbookChapters: [
      'الفصل الأول: الأعداد والعمليات الحسابية',
      'الفصل الثاني: مفهوم الكسور والأجزاء المتساوية (نموذج تجريبي متاح)',
      'الفصل الثالث: الهندسة والقياس',
    ],
    lessons: [
      {
        id: 'fractions',
        title: 'مفهوم الكسور والأجزاء المتساوية',
        summary: 'تعلّم كيف نمثّل الجزء من الكل باستخدام الدوائر والأشرطة والأسئلة التفاعلية.',
        duration: '٥ دقائق · درس تفاعلي متاح الآن',
        isInteractiveAvailable: true,
      },
      {
        id: 'fractions-ops',
        title: 'مقارنة الكسور وترتيبها',
        summary: 'استكشاف العلاقة بين الكسور المختلفة باستخدام خط الأعداد.',
        duration: 'قريباً في النسخة الكاملة',
        isInteractiveAvailable: false,
      },
      {
        id: 'decimals-intro',
        title: 'التحويل بين الكسور والنسب المئوية',
        summary: 'ربط التمثيل الكسري بالأعداد العشرية في الحياة اليومية.',
        duration: 'قريباً في النسخة الكاملة',
        isInteractiveAvailable: false,
      },
    ],
    activityExercise: {
      prompt: 'تدريب سريع: إذا قسمت قطعة شوكولاتة إلى ٤ قطع متساوية وأكلت قطعتين، فما الكسر الذي يمثل ما أكلته؟',
      choices: [
        {
          id: 'm-act-1',
          text: '2/4 (نصف القطعة)',
          isCorrect: true,
          feedback: 'أحسنت! قطعتان من أصل ٤ قطع متساوية تمثل 2/4 وهو يكافئ النصف.',
        },
        {
          id: 'm-act-2',
          text: '4/2',
          isCorrect: false,
          feedback: 'انتبه: عدد الأجزاء المأخوذة (٢) يوضع في البسط بالأعلى، والكل (٤) في المقام بالأسفل.',
        },
        {
          id: 'm-act-3',
          text: '1/4',
          isCorrect: false,
          feedback: '1/4 يمثّل قطعة واحدة فقط، بينما السؤال يذكر قطعتين من أصل ٤.',
        },
      ],
    },
    assessmentQuestions: [
      {
        prompt: 'أي من الأشكال التالية يمكن التعبير عن أجزائه بكسر صحيح؟',
        choices: [
          {
            id: 'm-ass-1',
            text: 'شكل مقسم إلى أجزاء متساوية تماماً في المساحة',
            isCorrect: true,
            feedback: 'دقيق! شرط التساوي بين الأجزاء أساسي لتكوين الكسر.',
          },
          {
            id: 'm-ass-2',
            text: 'شكل مقسم إلى قطع عشوائية مختلفة الأحجام',
            isCorrect: false,
            feedback: 'تذكّر: لا بد أن تكون الأجزاء متطابقة ومتساوية لكي يصح الكسر.',
          },
        ],
      },
    ],
  },
  {
    id: 'arabic',
    name: 'اللغة العربية',
    shortDesc: 'القراءة، القواعد النحوية، والتعبير اللغوي السليم',
    icon: 'book-open',
    color: 'amber',
    isScience: false,
    hasFullSampleLesson: false,
    minGrade: 1,
    maxGrade: 12,
    textbookChapters: [
      'الوحدة الأولى: القراءة والفهم',
      'الوحدة الثانية: أساسيات الجملة العربية',
      'الوحدة الثالثة: التعبير والإملاء',
    ],
    lessons: [
      {
        id: 'ar-1',
        title: 'أنواع الكلمة: الاسم والفعل والحرف',
        summary: 'معاينة أولية لدرس تفاعلي يميّز أقسام الكلمة بأمثلة من الحياة اليومية.',
        duration: 'قريباً في النسخة الكاملة',
        isInteractiveAvailable: false,
      },
      {
        id: 'ar-2',
        title: 'الجملة الاسمية والجملة الفعلية',
        summary: 'بناء الجملة العربية الصحيحة وتحديد أركانها الأساسية.',
        duration: 'قريباً في النسخة الكاملة',
        isInteractiveAvailable: false,
      },
    ],
    activityExercise: {
      prompt: 'نشاط لغوي تجريبي: أيّ الكلمات التالية تدلّ على فعل مضارع؟',
      choices: [
        {
          id: 'ar-act-1',
          text: 'يكتبُ',
          isCorrect: true,
          feedback: 'ممتاز! «يكتبُ» فعل مضارع يدل على حدوث الكتابة في الزمن الحاضر.',
        },
        {
          id: 'ar-act-2',
          text: 'كتابٌ',
          isCorrect: false,
          feedback: '«كتابٌ» اسم يدل على شيء محسوس وليس فعلاً.',
        },
        {
          id: 'ar-act-3',
          text: 'على',
          isCorrect: false,
          feedback: '«على» حرف جر لا يدل على حدث مقترن بزمن.',
        },
      ],
    },
    assessmentQuestions: [
      {
        prompt: 'ما الركنان الأساسيان في الجملة الاسمية؟',
        choices: [
          {
            id: 'ar-ass-1',
            text: 'المبتدأ والخبر',
            isCorrect: true,
            feedback: 'صحيح! تتكوّن الجملة الاسمية من مبتدأ مبدوء به وخبر يتمّم المعنى.',
          },
          {
            id: 'ar-ass-2',
            text: 'الفعل والفاعل',
            isCorrect: false,
            feedback: 'الفعل والفاعل هما ركنا الجملة الفعلية وليست الاسمية.',
          },
        ],
      },
    ],
  },
  {
    id: 'english',
    name: 'اللغة الإنجليزية',
    shortDesc: 'المفردات، القواعد الأساسية، ومهارات التواصل',
    icon: 'globe',
    color: 'sky',
    isScience: false,
    hasFullSampleLesson: false,
    minGrade: 1,
    maxGrade: 12,
    textbookChapters: [
      'Unit 1: Everyday Greetings & Vocabulary',
      'Unit 2: Core Grammar Structures',
      'Unit 3: Reading Comprehension',
    ],
    lessons: [
      {
        id: 'en-1',
        title: 'بناء الجملة البسيطة (Subject + Verb)',
        summary: 'معاينة أولية لتكوين الجمل الإنجليزية اليومية بوضوح.',
        duration: 'قريباً في النسخة الكاملة',
        isInteractiveAvailable: false,
      },
    ],
    activityExercise: {
      prompt: 'تدريب تجريبي: اختر الفعل المناسب لإكمال الجملة التالية: "She ___ to school every day."',
      choices: [
        {
          id: 'en-act-1',
          text: 'goes',
          isCorrect: true,
          feedback: 'رائع! مع الضمير المفرد الغائب (She) في المضارع البسيط نستخدم goes.',
        },
        {
          id: 'en-act-2',
          text: 'go',
          isCorrect: false,
          feedback: 'نستخدم go مع I/You/We/They، أما مع She فنضيف es لتصبح goes.',
        },
      ],
    },
    assessmentQuestions: [
      {
        prompt: 'أي كلمة تعبّر عن جمع كلمة "Book"؟',
        choices: [
          {
            id: 'en-ass-1',
            text: 'Books',
            isCorrect: true,
            feedback: 'أحسنت! نجمع الأسماء القياسية بإضافة حرف s في نهايتها.',
          },
          {
            id: 'en-ass-2',
            text: 'Bookes',
            isCorrect: false,
            feedback: 'كلمة Book لا تنتهي بحرف يتطلب es، بل نكتفي بإضافة s فقط.',
          },
        ],
      },
    ],
  },
  {
    id: 'islamic',
    name: 'التربية الإسلامية',
    shortDesc: 'القيم والأخلاق، السيرة النبوية، والفقه الميسّر',
    icon: 'moon-star',
    color: 'emerald',
    isScience: false,
    hasFullSampleLesson: false,
    minGrade: 1,
    maxGrade: 12,
    textbookChapters: [
      'الوحدة الأولى: التلاوة والفهم',
      'الوحدة الثانية: الأخلاق الإسلامية والآداب',
      'الوحدة الثالثة: محطات من السيرة النبوية',
    ],
    lessons: [
      {
        id: 'is-1',
        title: 'أخلاق الصدق والأمانة في حياتنا',
        summary: 'معاينة قصصية تفاعلية ترسّخ القيم العملية في المدرسة والبيت.',
        duration: 'قريباً في النسخة الكاملة',
        isInteractiveAvailable: false,
      },
    ],
    activityExercise: {
      prompt: 'نشاط قيمي تجريبي: إذا وجدت قلماً في ساحة المدرسة لا يخصّك، ما التصرف الصحيح الذي يدلّ على الأمانة؟',
      choices: [
        {
          id: 'is-act-1',
          text: 'تسليمه لإدارة المدرسة أو المعلم ليعود لصاحبه',
          isCorrect: true,
          feedback: 'بارك الله فيك! هذا هو التصرف الأمين الذي يحفظ حقوق الآخرين.',
        },
        {
          id: 'is-act-2',
          text: 'الاحتفاظ به في الحقيبة',
          isCorrect: false,
          feedback: 'الأمانة تقتضي البحث عن صاحب الغرض المفقود وإعادته إليه.',
        },
      ],
    },
    assessmentQuestions: [
      {
        prompt: 'لماذا لُقّب النبي محمد ﷺ بالصادق الأمين قبل البعثة؟',
        choices: [
          {
            id: 'is-ass-1',
            text: 'لأنه عُرف بصدق حديثه وحفظه لودائع الناس وأماناتهم',
            isCorrect: true,
            feedback: 'إجابة موفقة! الصدق والأمانة من أعظم الصفات التي اشتهر بها ﷺ.',
          },
          {
            id: 'is-ass-2',
            text: 'لأنه كان أكبر القوم سناً',
            isCorrect: false,
            feedback: 'اللقب جاء بسبب أمانته وصدقه بين أهل مكة منذ شبابه.',
          },
        ],
      },
    ],
  },
  {
    id: 'science',
    name: 'العلوم',
    shortDesc: 'استكشاف الطبيعة، الكائنات الحية، والمادة والطاقة',
    icon: 'atom',
    color: 'cyan',
    isScience: true,
    hasFullSampleLesson: false,
    minGrade: 1,
    maxGrade: 8,
    textbookChapters: [
      'الوحدة الأولى: الكائنات الحية وبيئاتها',
      'الوحدة الثانية: حالات المادة وتغيراتها',
      'الوحدة الثالثة: الضوء والصوت والطاقة',
    ],
    lessons: [
      {
        id: 'sci-1',
        title: 'حالات المادة الثلاث: الصلبة والسائلة والغازية',
        summary: 'معاينة استكشافية توضّح تحوّلات الماء بين الجليد والسائل والبخار.',
        duration: 'قريباً في النسخة الكاملة',
        isInteractiveAvailable: false,
      },
    ],
    activityExercise: {
      prompt: 'تدريب علمي تجريبي: عندما نضع الماء في المجمد (الفريزر)، ماذا يحدث لحالته؟',
      choices: [
        {
          id: 'sci-act-1',
          text: 'يتحوّل من الحالة السائلة إلى الحالة الصلبة (جليد)',
          isCorrect: true,
          feedback: 'إجابة علمية صحيحة! التبريد يجمّد جزيئات الماء فيتحول إلى صلب.',
        },
        {
          id: 'sci-act-2',
          text: 'يتبخّر مباشرة إلى غاز',
          isCorrect: false,
          feedback: 'التبخر يحدث بالتسخين، أما التبريد الشديد فيحوّل الماء إلى ثلج صلب.',
        },
      ],
    },
    assessmentQuestions: [
      {
        prompt: 'أي من المصادر التالية يمدّ النباتات بالطاقة اللازمة لصنع غذائها؟',
        choices: [
          {
            id: 'sci-ass-1',
            text: 'ضوء الشمس',
            isCorrect: true,
            feedback: 'ممتاز! تستخدم النباتات ضوء الشمس في عملية البناء الضوئي.',
          },
          {
            id: 'sci-ass-2',
            text: 'الصخور',
            isCorrect: false,
            feedback: 'تحتاج النباتات إلى ضوء الشمس والماء والهواء لصنع غذائها.',
          },
        ],
      },
    ],
    virtualLabExperiments: [
      {
        title: 'مختبر تحوّلات الماء بالحرارة',
        description: 'تجربة تفاعلية لمراقبة انصهار الجليد وغليان الماء وتبخره.',
      },
      {
        title: 'تركيب الدائرة الكهربائية البسيطة',
        description: 'توصيل البطارية والمصباح والمفتاح وملاحظة سريان التيار.',
      },
    ],
  },
  {
    id: 'chemistry',
    name: 'الكيمياء',
    shortDesc: 'الذرات، الروابط الكيميائية، والتفاعلات والمحاليل',
    icon: 'flask',
    color: 'violet',
    isScience: true,
    hasFullSampleLesson: false,
    minGrade: 9,
    maxGrade: 12,
    textbookChapters: [
      'الفصل الأول: البنية الذرية والجدول الدوري',
      'الفصل الثاني: الروابط الكيميائية',
      'الفصل الثالث: الأحماض والقواعد والمحاليل',
    ],
    lessons: [
      {
        id: 'chem-1',
        title: 'مقياس الرقم الهيدروجيني (pH) للأحماض والقواعد',
        summary: 'معاينة مفاهيمية لكيفية التمييز بين المحاليل الحمضية والقاعدية والمتعادلة.',
        duration: 'قريباً في النسخة الكاملة',
        isInteractiveAvailable: false,
      },
    ],
    activityExercise: {
      prompt: 'تدريب كيميائي تجريبي: ما قيمة الرقم الهيدروجيني (pH) للماء النقي المتعادل عند درجة حرارة ٢٥ مئوية؟',
      choices: [
        {
          id: 'chem-act-1',
          text: '7',
          isCorrect: true,
          feedback: 'صحيح! القيمة 7 تمثّل نقطة التعادل بين الأحماض (أقل من 7) والقواعد (أكبر من 7).',
        },
        {
          id: 'chem-act-2',
          text: '2',
          isCorrect: false,
          feedback: 'القيمة 2 تشير إلى محلول حمضي قوي، بينما الوسط المتعادل يساوي 7.',
        },
      ],
    },
    assessmentQuestions: [
      {
        prompt: 'أي الجسيمات الذرية يحمل شحنة كهربائية موجبة داخل النواة؟',
        choices: [
          {
            id: 'chem-ass-1',
            text: 'البروتونات',
            isCorrect: true,
            feedback: 'إجابة دقيقة! البروتونات موجبة الشحنة بينما النيوترونات متعادلة والإلكترونات سالبة.',
          },
          {
            id: 'chem-ass-2',
            text: 'الإلكترونات',
            isCorrect: false,
            feedback: 'الإلكترونات تدور حول النواة وتحمل شحنة سالبة.',
          },
        ],
      },
    ],
    virtualLabExperiments: [
      {
        title: 'معايرة الأحماض والقواعد بالكاشف اللوني',
        description: 'إضافة قطرات من القاعدة إلى الحمض وملاحظة تغيّر لون المحلول عند التعادل.',
      },
      {
        title: 'تفاعل الفلزات مع الماء',
        description: 'محاكاة آمنة لمقارنة سرعة تفاعل عناصر المجموعة الأولى.',
      },
    ],
  },
  {
    id: 'physics',
    name: 'الفيزياء',
    shortDesc: 'الحركة، القوى، الكهرباء والمغناطيسية، والضوء',
    icon: 'zap',
    color: 'indigo',
    isScience: true,
    hasFullSampleLesson: false,
    minGrade: 9,
    maxGrade: 12,
    textbookChapters: [
      'الفصل الأول: الحركة الخطية وقوانين نيوتن',
      'الفصل الثاني: الشغل والطاقة والقدرة',
      'الفصل الثالث: الدوائر الكهربائية وقانون أوم',
    ],
    lessons: [
      {
        id: 'phy-1',
        title: 'قانون أوم والعلاقة بين الجهد والتيار والمقاومة',
        summary: 'معاينة تطبيقية لحساب شدة التيار الكهربائي في الدوائر البسيطة.',
        duration: 'قريباً في النسخة الكاملة',
        isInteractiveAvailable: false,
      },
    ],
    activityExercise: {
      prompt: 'تدريب فيزيائي تجريبي: ما وحدة قياس القوة في النظام الدولي للوحدات (SI)؟',
      choices: [
        {
          id: 'phy-act-1',
          text: 'النيوتن (N)',
          isCorrect: true,
          feedback: 'صحيح! تُقاس القوة بوحدة النيوتن نسبة إلى العالم إسحاق نيوتن.',
        },
        {
          id: 'phy-act-2',
          text: 'الجول (J)',
          isCorrect: false,
          feedback: 'الجول هو وحدة قياس الشغل والطاقة، بينما وحدة القوة هي النيوتن.',
        },
      ],
    },
    assessmentQuestions: [
      {
        prompt: 'إذا تحركت سيارة مسافة ١٢٠ كيلومتراً خلال ساعتين بسرعة ثابتة، فما سرعتها المتوسطة؟',
        choices: [
          {
            id: 'phy-ass-1',
            text: '60 كم/ساعة',
            isCorrect: true,
            feedback: 'ممتاز! السرعة = المسافة ÷ الزمن = 120 ÷ 2 = 60 كم/ساعة.',
          },
          {
            id: 'phy-ass-2',
            text: '240 كم/ساعة',
            isCorrect: false,
            feedback: 'تذكّر أن السرعة تساوي قسمة المسافة على الزمن وليس ضربهما.',
          },
        ],
      },
    ],
    virtualLabExperiments: [
      {
        title: 'مختبر قانون أوم والدوائر الكهربائية',
        description: 'تغيير الجهد والمقاومة وقياس شدة التيار رقمياً بالأميتر.',
      },
      {
        title: 'محاكاة البندول البسيط والجاذبية',
        description: 'دراسة أثر طول الخيط على الزمن الدوري للاهتزاز.',
      },
    ],
  },
  {
    id: 'biology',
    name: 'الأحياء',
    shortDesc: 'الخلية الحية، الوراثة، ووظائف أعضاء الكائنات الحية',
    icon: 'dna',
    color: 'green',
    isScience: true,
    hasFullSampleLesson: false,
    minGrade: 9,
    maxGrade: 12,
    textbookChapters: [
      'الفصل الأول: تركيب الخلية ووظائف العضيات',
      'الفصل الثاني: البناء الضوئي والتنفس الخلوي',
      'الفصل الثالث: الوراثة والحمض النووي DNA',
    ],
    lessons: [
      {
        id: 'bio-1',
        title: 'مقارنة بين الخلية النباتية والخلية الحيوانية',
        summary: 'معاينة مرئية لتراكيب الخلية الأساسية ووظيفة كل عضية.',
        duration: 'قريباً في النسخة الكاملة',
        isInteractiveAvailable: false,
      },
    ],
    activityExercise: {
      prompt: 'تدريب حيوي تجريبي: أي عضية في الخلية تُعرف بـ «مصنع الطاقة» لإنتاج جزيئات ATP؟',
      choices: [
        {
          id: 'bio-act-1',
          text: 'الميتوكوندريا',
          isCorrect: true,
          feedback: 'صحيح! الميتوكوندريا مسؤولة عن التنفس الخلوي وإنتاج الطاقة للخلية.',
        },
        {
          id: 'bio-act-2',
          text: 'الجدار الخلوي',
          isCorrect: false,
          feedback: 'الجدار الخلوي يوفر الحماية والدعامة للخلية النباتية ولا ينتج الطاقة.',
        },
      ],
    },
    assessmentQuestions: [
      {
        prompt: 'أي تراكيب توجد في الخلية النباتية ولا توجد في الخلية الحيوانية؟',
        choices: [
          {
            id: 'bio-ass-1',
            text: 'البلاستيدات الخضراء والجدار الخلوي',
            isCorrect: true,
            feedback: 'دقيق! البلاستيدات الخضراء والجدار الخلوي تميّزان الخلايا النباتية.',
          },
          {
            id: 'bio-ass-2',
            text: 'النواة والغشاء البلازمي',
            isCorrect: false,
            feedback: 'النواة والغشاء البلازمي مشتركان في كلٍّ من الخلية النباتية والحيوانية.',
          },
        ],
      },
    ],
    virtualLabExperiments: [
      {
        title: 'المجهر الافتراضي لفحص الخلايا',
        description: 'تكبير شرائح نباتية وحيوانية والتعرف على النواة والسيتوبلازم.',
      },
      {
        title: 'تأثير شدة الإضاءة على البناء الضوئي',
        description: 'قياس فقاعات الأكسجين الناتجة مع تغيير مسافة المصباح.',
      },
    ],
  },
  {
    id: 'social',
    name: 'الاجتماعيات',
    shortDesc: 'المواطنة، المجتمع، والبيئة المحلية والمحيطة',
    icon: 'users',
    color: 'orange',
    isScience: false,
    hasFullSampleLesson: false,
    minGrade: 4,
    maxGrade: 6,
    textbookChapters: [
      'الوحدة الأولى: وطني ومجتمعي',
      'الوحدة الثانية: الخرائط والجهات الأصلية',
      'الوحدة الثالثة: التعاون والمسؤولية المجتمعية',
    ],
    lessons: [
      {
        id: 'soc-1',
        title: 'الجهات الأصلية الأربع وكيفية تحديدها',
        summary: 'معاينة مبسطة لقراءة البوصلة والخريطة في رحلاتنا اليومية.',
        duration: 'قريباً في النسخة الكاملة',
        isInteractiveAvailable: false,
      },
    ],
    activityExercise: {
      prompt: 'تدريب اجتماعي تجريبي: من أي جهة تشرق الشمس صباحاً؟',
      choices: [
        {
          id: 'soc-act-1',
          text: 'الشرق',
          isCorrect: true,
          feedback: 'أحسنت! تشرق الشمس من جهة الشرق وتغرب في جهة الغرب.',
        },
        {
          id: 'soc-act-2',
          text: 'الشمال',
          isCorrect: false,
          feedback: 'الشمال جهة أصلية لكن الشمس تشرق دائماً من الشرق.',
        },
      ],
    },
    assessmentQuestions: [
      {
        prompt: 'كم عدد الجهات الأصلية على الخريطة؟',
        choices: [
          {
            id: 'soc-ass-1',
            text: '٤ جهات: الشمال، الجنوب، الشرق، الغرب',
            isCorrect: true,
            feedback: 'ممتاز! هذه هي الجهات الأصلية الأربع المستخدمة في قراءة الخرائط.',
          },
          {
            id: 'soc-ass-2',
            text: 'جهتان فقط',
            isCorrect: false,
            feedback: 'الخرائط تعتمد على ٤ جهات أصلية رئيسية لتحديد المواقع بدقة.',
          },
        ],
      },
    ],
  },
  {
    id: 'geography',
    name: 'الجغرافيا',
    shortDesc: 'التضاريس، المناخ، الموارد الطبيعية، والخرائط',
    icon: 'map',
    color: 'lime',
    isScience: false,
    hasFullSampleLesson: false,
    minGrade: 7,
    maxGrade: 12,
    textbookChapters: [
      'الوحدة الأولى: خطوط الطول ودوائر العرض',
      'الوحدة الثانية: الأقاليم المناخية والتضاريس',
      'الوحدة الثالثة: الموارد المائية والاستدامة',
    ],
    lessons: [
      {
        id: 'geo-1',
        title: 'خطوط الطول ودوائر العرض وتحديد الزمن',
        summary: 'معاينة جغرافية لفهم الإحداثيات الجغرافية وفروق التوقيت بين المدن.',
        duration: 'قريباً في النسخة الكاملة',
        isInteractiveAvailable: false,
      },
    ],
    activityExercise: {
      prompt: 'تدريب جغرافي تجريبي: ما اسم دائرة العرض الرئيسية التي تقسم الكرة الأرضية إلى نصفين شمالي وجنوبي؟',
      choices: [
        {
          id: 'geo-act-1',
          text: 'خط الاستواء',
          isCorrect: true,
          feedback: 'صحيح! خط الاستواء درجته صفر ويقسم الأرض إلى نصف شمالي وآخر جنوبي.',
        },
        {
          id: 'geo-act-2',
          text: 'خط غرينتش',
          isCorrect: false,
          feedback: 'خط غرينتش هو خط الطول الرئيسي الذي يقسم الأرض شرقاً وغرباً.',
        },
      ],
    },
    assessmentQuestions: [
      {
        prompt: 'أي من العوامل التالية يؤثر مباشرة في انخفاض درجات الحرارة عند الصعود إلى قمم الجبال؟',
        choices: [
          {
            id: 'geo-ass-1',
            text: 'الارتفاع عن مستوى سطح البحر',
            isCorrect: true,
            feedback: 'أحسنت! تنخفض درجة الحرارة كلما ارتفعنا عن سطح البحر.',
          },
          {
            id: 'geo-ass-2',
            text: 'كثرة الأنهار فقط',
            isCorrect: false,
            feedback: 'الارتفاع عن مستوى سطح البحر هو العامل الأساسي في برودة قمم الجبال.',
          },
        ],
      },
    ],
  },
  {
    id: 'history',
    name: 'التاريخ',
    shortDesc: 'الحضارات الإنسانية، التاريخ الإسلامي، والأحداث المعاصرة',
    icon: 'landmark',
    color: 'rose',
    isScience: false,
    hasFullSampleLesson: false,
    minGrade: 7,
    maxGrade: 12,
    textbookChapters: [
      'الوحدة الأولى: نشأة الحضارات القديمة',
      'الوحدة الثانية: الإسهامات العلمية في الحضارة الإسلامية',
      'الوحدة الثالثة: تحوّلات العصر الحديث',
    ],
    lessons: [
      {
        id: 'his-1',
        title: 'بيت الحكمة والإسهامات العلمية العربية',
        summary: 'معاينة تاريخية تستعرض دور الترجمة والابتكار في ازدهار العلوم.',
        duration: 'قريباً في النسخة الكاملة',
        isInteractiveAvailable: false,
      },
    ],
    activityExercise: {
      prompt: 'تدريب تاريخي تجريبي: في أي مدينة تأسس «بيت الحكمة» بوصفه مركزاً علمياً بارزاً؟',
      choices: [
        {
          id: 'his-act-1',
          text: 'بغداد',
          isCorrect: true,
          feedback: 'صحيح! كان بيت الحكمة في بغداد منارةً للترجمة والبحث العلمي.',
        },
        {
          id: 'his-act-2',
          text: 'روما',
          isCorrect: false,
          feedback: 'تأسس بيت الحكمة في مدينة بغداد في العصر العباسي.',
        },
      ],
    },
    assessmentQuestions: [
      {
        prompt: 'لماذا يهتم المؤرخون بدراسة المصادر الأولية مثل النقوش والمخطوطات؟',
        choices: [
          {
            id: 'his-ass-1',
            text: 'لأنها شهادات معاصرة للحدث التاريخي وتوثّق تفاصيله بدقة',
            isCorrect: true,
            feedback: 'إجابة ممتازة! المصادر الأولية هي الأساس الموثوق لإعادة قراءة التاريخ.',
          },
          {
            id: 'his-ass-2',
            text: 'لأنها روايات خيالية حديثة',
            isCorrect: false,
            feedback: 'المصادر الأولية وثائق وآثار حقيقية عاصرت الحدث وليست روايات خيالية.',
          },
        ],
      },
    ],
  },
  {
    id: 'computer',
    name: 'الحاسوب',
    shortDesc: 'التفكير المنطقي، الخوارزميات، والأمان الرقمي',
    icon: 'laptop',
    color: 'slate',
    isScience: false,
    hasFullSampleLesson: false,
    minGrade: 1,
    maxGrade: 12,
    textbookChapters: [
      'الوحدة الأولى: مكونات الحاسوب الأساسية',
      'الوحدة الثانية: التفكير الخوارزمي وحل المشكلات',
      'الوحدة الثالثة: المواطنة والأمان الرقمي',
    ],
    lessons: [
      {
        id: 'cs-1',
        title: 'ما هي الخوارزمية؟ خطوات مرتّبة لحل مشكلة',
        summary: 'معاينة ممتعة تشرح كيف نحل المشكلات بخطوات واضحة ومتسلسلة.',
        duration: 'قريباً في النسخة الكاملة',
        isInteractiveAvailable: false,
      },
    ],
    activityExercise: {
      prompt: 'تدريب رقمي تجريبي: أي مما يلي يُعدّ كلمة مرور قوية وآمنة لحسابك؟',
      choices: [
        {
          id: 'cs-act-1',
          text: 'مزيج من أحرف كبيرة وصغيرة وأرقام ورموز خاصة',
          isCorrect: true,
          feedback: 'أحسنت! تنوّع الرموز والأحرف والأرقام يجعل تخمين كلمة المرور صعباً جداً.',
        },
        {
          id: 'cs-act-2',
          text: '123456',
          isCorrect: false,
          feedback: 'الأرقام المتسلسلة مثل 123456 يسهل تخمينها وهي غير آمنة.',
        },
      ],
    },
    assessmentQuestions: [
      {
        prompt: 'ماذا تعني الخوارزمية في علوم الحاسوب؟',
        choices: [
          {
            id: 'cs-ass-1',
            text: 'مجموعة خطوات منطقية مرتّبة لحل مشكلة محددة',
            isCorrect: true,
            feedback: 'ممتاز! الخوارزمية هي خطة خطوة بخطوة لتنفيذ مهمة أو حل مسألة.',
          },
          {
            id: 'cs-ass-2',
            text: 'شاشة الحاسوب فقط',
            isCorrect: false,
            feedback: 'الشاشة من وحدات الإخراج، بينما الخوارزمية هي طريقة التفكير المرتب لحل المشكلات.',
          },
        ],
      },
    ],
  },
];

export function getSubjectsForGrade(gradeId: number): SubjectDefinition[] {
  return ALL_SUBJECTS.filter(
    (subject) => gradeId >= subject.minGrade && gradeId <= subject.maxGrade,
  );
}

export function getTierVisualStyle(tier: GradeTier | null) {
  if (tier === 'early') {
    return {
      pageBg: 'bg-gradient-to-b from-amber-50/70 via-sky-50/40 to-slate-50',
      heroAccent: 'from-teal-500 via-emerald-500 to-sky-500',
      cardRadius: 'rounded-3xl',
      buttonRadius: 'rounded-2xl',
      headlineSize: 'text-3xl sm:text-4xl',
    };
  }
  if (tier === 'middle') {
    return {
      pageBg: 'bg-gradient-to-b from-teal-50/60 via-slate-50 to-indigo-50/40',
      heroAccent: 'from-teal-600 via-cyan-600 to-indigo-600',
      cardRadius: 'rounded-2xl',
      buttonRadius: 'rounded-xl',
      headlineSize: 'text-2xl sm:text-3xl',
    };
  }
  if (tier === 'senior') {
    return {
      pageBg: 'bg-gradient-to-b from-slate-100/90 via-slate-50 to-teal-50/30',
      heroAccent: 'from-slate-800 via-teal-800 to-indigo-900',
      cardRadius: 'rounded-2xl',
      buttonRadius: 'rounded-xl',
      headlineSize: 'text-2xl sm:text-3xl',
    };
  }
  return {
    pageBg: 'bg-gradient-to-b from-teal-50/70 via-amber-50/30 to-slate-50',
    heroAccent: 'from-teal-600 via-cyan-600 to-amber-500',
    cardRadius: 'rounded-2xl',
    buttonRadius: 'rounded-xl',
    headlineSize: 'text-3xl sm:text-4xl',
  };
}

export const LESSON_CONTENT: Record<GradeTier, LessonAdaptation> = {
  early: {
    title: 'ما هو الكسر؟',
    subtitle: 'الكسر يعني جزءاً جميلاً من شيء كامل مقسّم بالتساوي.',
    rafiqMessage:
      'تخيّل أن لدينا فطيرة لذيذة وقسّمناها إلى قطع متساوية تماماً! اضغط على القطع لتلوينها وشاهد كيف يتغيّر الكسر.',
    concepts: [
      {
        term: 'الرقم العلوي (الأجزاء الملوّنة)',
        explanation: 'يُخبرنا كم قطعة لوّناها أو أخذناها من الشكل.',
      },
      {
        term: 'الرقم السفلي (كل القطع المتساوية)',
        explanation: 'يُخبرنا بعدد جميع القطع المتساوية في الشكل الكامل.',
      },
    ],
    defaultNumerator: 1,
    defaultDenominator: 4,
    maxDenominator: 6,
    showDecimalsAndPercent: false,
    presets: [
      { id: 'half', label: 'نصف (1/2)', numerator: 1, denominator: 2 },
      { id: 'quarter', label: 'ربع (1/4)', numerator: 1, denominator: 4 },
      { id: 'three-quarters', label: 'ثلاثة أرباع (3/4)', numerator: 3, denominator: 4 },
    ],
  },
  middle: {
    title: 'فهم الكسور وتمثيلها البصري',
    subtitle: 'الكسر الاعتيادي يصف العلاقة بين جزء محدّد والكل المقسّم إلى أجزاء متساوية.',
    rafiqMessage:
      'لاحظ كيف يتغيّر الكسر عندما نعدّل عدد الأجزاء المظلّلة أو نغيّر تقسيم الشكل. جرّب التبديل بين الدائرة والشريط لتقارن بين التمثيلين.',
    concepts: [
      {
        term: 'البسط (في الأعلى)',
        explanation: 'يمثّل عدد الأجزاء المظلّلة أو المختارة من الشكل.',
      },
      {
        term: 'المقام (في الأسفل)',
        explanation: 'يمثّل العدد الكلي للأجزاء المتطابقة التي قُسّم إليها الواحد الصحيح.',
      },
      {
        term: 'شرط التساوي',
        explanation: 'لا يُعدّ التقسيم كسراً صحيحاً إلا إذا كانت جميع الأجزاء متساوية في المساحة.',
      },
    ],
    defaultNumerator: 3,
    defaultDenominator: 5,
    maxDenominator: 8,
    showDecimalsAndPercent: true,
    presets: [
      { id: 'half', label: 'نصف (1/2)', numerator: 1, denominator: 2 },
      { id: 'two-thirds', label: 'ثلثان (2/3)', numerator: 2, denominator: 3 },
      { id: 'five-eighths', label: 'خمسة أثمان (5/8)', numerator: 5, denominator: 8 },
    ],
  },
  senior: {
    title: 'النسب والكسور الاعتيادية والتمثيل المكافئ',
    subtitle: 'العدد النسبي يُكتب بصورة a/b حيث b ≠ 0، ويعبّر عن نسبة الجزء المظلّل إلى الوحدة الكاملة.',
    rafiqMessage:
      'استكشف العلاقة بين التمثيل الهندسي للكسر، وصورته العشرية، ونسبته المئوية، ولاحظ متى تتكافأ الكسور رغم اختلاف التقسيم.',
    concepts: [
      {
        term: 'البسط (a) والمقام (b)',
        explanation: 'يحدّد المقام b دقة التجزئة المتطابقة للوحدة، بينما يحدّد البسط a عدد الوحدات الجزئية المظلّلة.',
      },
      {
        term: 'التكافؤ والاختصار',
        explanation: 'قسمة كلٍّ من البسط والمقام على القاسم المشترك الأكبر تُنتج الكسر المكافئ في أبسط صورة.',
      },
      {
        term: 'الربط العشري والمئوي',
        explanation: 'كل كسر اعتيادي يقابله تمثيل عشري (a ÷ b) ونسبة مئوية توضّح وزنه من الكل.',
      },
    ],
    defaultNumerator: 6,
    defaultDenominator: 8,
    maxDenominator: 12,
    showDecimalsAndPercent: true,
    presets: [
      { id: 'three-quarters', label: 'ثلاثة أرباع (3/4)', numerator: 3, denominator: 4 },
      { id: 'six-eighths', label: 'ستة أثمان (6/8)', numerator: 6, denominator: 8 },
      { id: 'nine-twelfths', label: 'تسعة من اثني عشر (9/12)', numerator: 9, denominator: 12 },
    ],
  },
};

export const QUESTION_CONTENT: Record<GradeTier, QuestionAdaptation> = {
  early: {
    kicker: 'سؤال تفاعلي · التأسيس البصري',
    prompt: 'انظر إلى الدائرة الجميلة: كم يمثّل الجزء الملوّن من الدائرة كلها؟',
    hint: 'عدّ القطع الملوّنة أولاً، ثم عدّ جميع القطع في الدائرة.',
    shape: 'circle',
    shadedParts: 3,
    totalParts: 4,
    choices: [
      {
        id: 'c1',
        numerator: 3,
        denominator: 4,
        label: 'ثلاثة أرباع',
        isCorrect: true,
        feedback: 'رائع! لدينا ٣ قطع ملوّنة من أصل ٤ قطع متساوية، إذن الكسر هو 3/4.',
      },
      {
        id: 'c2',
        numerator: 1,
        denominator: 4,
        label: 'ربع واحد',
        isCorrect: false,
        feedback: 'قريب جداً! 1/4 هو الجزء غير الملوّن. لنعدّ معاً القطع الملوّنة باللون التركوازي، كم عددها؟',
      },
      {
        id: 'c3',
        numerator: 4,
        denominator: 3,
        label: 'أربعة أثلاث',
        isCorrect: false,
        feedback: 'لاحظ الترتيب يا بطل: عدد القطع الملوّنة (٣) يوضع في الأعلى، وعدد كل القطع (٤) يوضع في الأسفل.',
      },
      {
        id: 'c4',
        numerator: 3,
        denominator: 1,
        label: 'ثلاثة على واحد',
        isCorrect: false,
        feedback: 'أحسنت عدّ القطع الملوّنة (٣)! لكن في الأسفل نكتب عدد جميع قطع الدائرة وهي ٤ قطع متساوية.',
      },
    ],
    successSummary: 'أحسنت التمييز بين عدد الأجزاء الملوّنة والعدد الكلي لأجزاء الدائرة.',
  },
  middle: {
    kicker: 'تطبيق مفاهيمي · البسط والمقام',
    prompt: 'الشكل المقابل مقسّم إلى ٨ أجزاء متساوية، وقد ظُلّل منها ٥ أجزاء. ما الكسر الذي يمثّل الجزء المظلّل؟',
    hint: 'تذكّر: البسط يعبر عن الأجزاء المظلّلة، والمقام يعبر عن مجموع الأجزاء المتساوية.',
    shape: 'bar',
    shadedParts: 5,
    totalParts: 8,
    choices: [
      {
        id: 'm1',
        numerator: 5,
        denominator: 8,
        label: 'خمسة أثمان',
        isCorrect: true,
        feedback: 'إجابة دقيقة! عدد الأجزاء المظلّلة ٥ (البسط)، وإجمالي الأجزاء المتساوية ٨ (المقام).',
      },
      {
        id: 'm2',
        numerator: 3,
        denominator: 8,
        label: 'ثلاثة أثمان',
        isCorrect: false,
        feedback: 'انتبه: 3/8 يمثّل الأجزاء غير المظلّلة. السؤال يطلب الكسر المعبّر عن الأجزاء المظلّلة.',
      },
      {
        id: 'm3',
        numerator: 8,
        denominator: 5,
        label: 'ثمانية أخماس',
        isCorrect: false,
        feedback: 'تنبّه لترتيب الكسر: البسط (الأعلى) هو الجزء المظلّل (٥)، والمقام (الأسفل) هو الكل (٨).',
      },
      {
        id: 'm4',
        numerator: 5,
        denominator: 3,
        label: 'خمسة أثلاث',
        isCorrect: false,
        feedback: 'الرقم ٣ يمثّل الأجزاء الفارغة فقط، بينما المقام يجب أن يضمّ جميع أجزاء الشريط الثمانية.',
      },
    ],
    successSummary: 'أظهرت فهماً واضحاً للعلاقة بين البسط (الأجزاء المظلّلة) والمقام (الكل).',
  },
  senior: {
    kicker: 'تحليل رياضي · تبسيط الكسور المكافئة',
    prompt: 'في الشبكة الهندسية المقابلة، ظُلّل ٩ مربعات من أصل ١٢ مربعاً متطابقاً. أيّ الكسور التالية يمثّل الجزء المظلّل في أبسط صورة؟',
    hint: 'اكتب الكسر 9/12 أولاً، ثم اقسم البسط والمقام على القاسم المشترك الأكبر بينهما.',
    shape: 'grid',
    shadedParts: 9,
    totalParts: 12,
    choices: [
      {
        id: 's1',
        numerator: 3,
        denominator: 4,
        label: 'ثلاثة أرباع (75%)',
        isCorrect: true,
        feedback: 'ممتاز! الكسر 9/12 عند قسمة بسطه ومقامه على ٣ يُختصر إلى 3/4 ويكافئ 0.75 أو 75%.',
      },
      {
        id: 's2',
        numerator: 1,
        denominator: 4,
        label: 'ربع (25%)',
        isCorrect: false,
        feedback: 'هذا الكسر يمثّل الجزء غير المظلّل (3/12 = 1/4). أعد الحساب بالنسبة للأجزاء المظلّلة التسعة.',
      },
      {
        id: 's3',
        numerator: 4,
        denominator: 3,
        label: 'أربعة أثلاث',
        isCorrect: false,
        feedback: 'بما أن الجزء المظلّل أصغر من الشكل الكامل، فلا بد أن يكون البسط أصغر من المقام (قيمة الكسر أقل من ١).',
      },
      {
        id: 's4',
        numerator: 2,
        denominator: 3,
        label: 'ثلثان (66.7%)',
        isCorrect: false,
        feedback: 'للتأكّد: الكسر 2/3 يكافئ 8/12، بينما الشكل يحتوي على ٩ مربعات مظلّلة من ١٢. جرّب القسمة على ٣.',
      },
    ],
    successSummary: 'أحسنت الربط بين التمثيل الهندسي وتبسيط الكسور إلى أبسط صورة.',
  },
};

export const RESULT_COPY: Record<GradeTier, TierResultCopy> = {
  early: {
    achievementTitle: 'وسام بطل الكسور الصغير',
    celebrationMessage: 'أنت رائع يا صديقي! لقد فهمت كيف نقسّم الأشكال ونقرأ الكسور بسهولة.',
  },
  middle: {
    achievementTitle: 'وسام مستكشف الكسور',
    celebrationMessage: 'عمل ممتاز! أتقنت التمييز بين البسط والمقام وتطبيق ذلك على الأشكال الهندسية.',
  },
  senior: {
    achievementTitle: 'وسام متقن التمثيل النسبي',
    celebrationMessage: 'أداء متميز! نجحت في تحويل التمثيل الهندسي إلى كسر مبسّط في أبسط صورة.',
  },
};

export function describeFractionInArabic(numerator: number, denominator: number): string {
  if (numerator === 0) return 'لا شيء مظلّل (صفر)';
  if (numerator === denominator) return 'الكل مظلّل (واحد صحيح)';

  const unitNames: Record<number, { single: string; dual: string; plural: string }> = {
    2: { single: 'نصف', dual: 'نصفان', plural: 'أنصاف' },
    3: { single: 'ثلث', dual: 'ثلثان', plural: 'أثلاث' },
    4: { single: 'ربع', dual: 'ربعان', plural: 'أرباع' },
    5: { single: 'خُمس', dual: 'خُمسان', plural: 'أخماس' },
    6: { single: 'سُدس', dual: 'سُدسان', plural: 'أسداس' },
    7: { single: 'سُبع', dual: 'سُبعان', plural: 'أسباع' },
    8: { single: 'ثُمن', dual: 'ثُمنان', plural: 'أثمان' },
    9: { single: 'تُسع', dual: 'تُسعان', plural: 'أتساع' },
    10: { single: 'عُشر', dual: 'عُشران', plural: 'أعشار' },
  };

  const countWords: Record<number, string> = {
    3: 'ثلاثة',
    4: 'أربعة',
    5: 'خمسة',
    6: 'ستة',
    7: 'سبعة',
    8: 'ثمانية',
    9: 'تسعة',
    10: 'عشرة',
    11: 'أحد عشر',
  };

  const unit = unitNames[denominator];
  if (unit) {
    if (numerator === 1) return unit.single;
    if (numerator === 2) return unit.dual;
    if (numerator <= 10 && countWords[numerator]) {
      return `${countWords[numerator]} ${unit.plural}`;
    }
  }

  return `${numerator} من أصل ${denominator} جزءاً متساوياً`;
}
