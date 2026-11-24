/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LessonScreen } from './components/LessonScreen';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PWAInstallButton } from './components/PWAInstallButton';
import { QuestionScreen } from './components/QuestionScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { SetupScreen } from './components/SetupScreen';
import { SubjectDashboardScreen } from './components/SubjectDashboardScreen';
import { SubjectsDashboard } from './components/SubjectsDashboard';
import { TopNav } from './components/TopNav';
import { WelcomeScreen } from './components/WelcomeScreen';
import {
  ALL_SUBJECTS,
  GRADES,
  getTierVisualStyle,
  type ScreenId,
} from './data/curriculum';

export default function App() {
  // IMPORTANT: Nothing is preselected. Student manually enters name and chooses grade, subject, and lesson.
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('welcome');
  const [unlockedScreens, setUnlockedScreens] = useState<ScreenId[]>(['welcome', 'setup']);
  const [studentName, setStudentName] = useState<string>('');
  const [selectedGradeId, setSelectedGradeId] = useState<number | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const [questionAttempts, setQuestionAttempts] = useState<number>(0);
  const [isQuestionSolved, setIsQuestionSolved] = useState<boolean>(false);
  const [questionSessionKey, setQuestionSessionKey] = useState<number>(0);

  const selectedGrade =
    selectedGradeId !== null ? GRADES.find((g) => g.id === selectedGradeId) ?? null : null;
  const selectedSubject =
    selectedSubjectId !== null
      ? ALL_SUBJECTS.find((s) => s.id === selectedSubjectId) ?? null
      : null;

  const tierStyle = getTierVisualStyle(selectedGrade?.tier ?? null);

  const unlockAndNavigate = (target: ScreenId) => {
    setUnlockedScreens((prev) => (prev.includes(target) ? prev : [...prev, target]));
    setCurrentScreen(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGrade = (gradeId: number) => {
    if (gradeId !== selectedGradeId) {
      setSelectedGradeId(gradeId);
      setSelectedSubjectId(null);
      setSelectedLessonId(null);
      setQuestionAttempts(0);
      setIsQuestionSolved(false);
      setQuestionSessionKey((prev) => prev + 1);
    }
  };

  const handleContinueToSubjects = () => {
    if (!studentName.trim() || selectedGrade === null) return;
    unlockAndNavigate('subjects');
  };

  const handleSelectSubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setSelectedLessonId(null);
    unlockAndNavigate('subject');
  };

  const handleStartLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    unlockAndNavigate('lesson');
  };

  const handleGoToQuestion = () => {
    unlockAndNavigate('question');
  };

  const handleAttemptWrong = () => {
    setQuestionAttempts((prev) => prev + 1);
  };

  const handleSolved = () => {
    setQuestionAttempts((prev) => prev + 1);
    setIsQuestionSolved(true);
    setUnlockedScreens((prev) => (prev.includes('results') ? prev : [...prev, 'results']));
  };

  const handleRepeatQuestion = () => {
    setQuestionAttempts(0);
    setIsQuestionSolved(false);
    setQuestionSessionKey((prev) => prev + 1);
    unlockAndNavigate('question');
  };

  const mathStarsEarned = isQuestionSolved
    ? questionAttempts <= 1
      ? 3
      : questionAttempts === 2
        ? 2
        : 1
    : null;

  return (
    <div className={`min-h-screen flex flex-col ${tierStyle.pageBg} text-slate-900`}>
      <TopNav
        currentScreen={currentScreen}
        unlockedScreens={unlockedScreens}
        studentName={studentName}
        selectedGrade={selectedGrade}
        selectedSubject={selectedSubject}
        onNavigate={unlockAndNavigate}
      />

      <OfflineIndicator />

      <main className="flex-1">
        <PWAInstallButton variant="banner" />
        {currentScreen === 'welcome' && (
          <WelcomeScreen onStart={() => unlockAndNavigate('setup')} />
        )}

        {currentScreen === 'setup' && (
          <SetupScreen
            studentName={studentName}
            selectedGradeId={selectedGradeId}
            onChangeName={setStudentName}
            onSelectGrade={handleSelectGrade}
            onBack={() => unlockAndNavigate('welcome')}
            onContinueToSubjects={handleContinueToSubjects}
          />
        )}

        {currentScreen === 'subjects' && selectedGrade && (
          <SubjectsDashboard
            studentName={studentName.trim()}
            selectedGrade={selectedGrade}
            onBackToSetup={() => unlockAndNavigate('setup')}
            onSelectSubject={handleSelectSubject}
          />
        )}

        {currentScreen === 'subject' && selectedGrade && selectedSubject && (
          <SubjectDashboardScreen
            key={`${selectedGrade.id}-${selectedSubject.id}`}
            studentName={studentName.trim()}
            selectedGrade={selectedGrade}
            subject={selectedSubject}
            mathStarsEarned={mathStarsEarned}
            onBackToSubjects={() => unlockAndNavigate('subjects')}
            onStartLesson={handleStartLesson}
            onStartMathQuestion={handleGoToQuestion}
          />
        )}

        {currentScreen === 'lesson' && selectedGrade && selectedLessonId && (
          <LessonScreen
            studentName={studentName.trim()}
            selectedGrade={selectedGrade}
            onBackToSubject={() => unlockAndNavigate('subject')}
            onGoToQuestion={handleGoToQuestion}
          />
        )}

        {currentScreen === 'question' && selectedGrade && (
          <QuestionScreen
            key={`${selectedGrade.tier}-${questionSessionKey}`}
            studentName={studentName.trim()}
            selectedGrade={selectedGrade}
            attempts={questionAttempts}
            isSolved={isQuestionSolved}
            onAttemptWrong={handleAttemptWrong}
            onSolved={handleSolved}
            onBackToLesson={() =>
              unlockAndNavigate(selectedLessonId ? 'lesson' : 'subject')
            }
            onViewResults={() => unlockAndNavigate('results')}
          />
        )}

        {currentScreen === 'results' && selectedGrade && (
          <ResultsScreen
            studentName={studentName.trim()}
            selectedGrade={selectedGrade}
            attempts={Math.max(1, questionAttempts)}
            onRepeatQuestion={handleRepeatQuestion}
            onBackToLesson={() =>
              unlockAndNavigate(selectedLessonId ? 'lesson' : 'subject')
            }
            onBackToSubjects={() => unlockAndNavigate('subjects')}
          />
        )}
      </main>

      <footer className="border-t border-slate-200/80 bg-white/75 pt-5 safe-pb">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span>رفيق · نموذج أولي لمنصة تعلّم عربية تفاعلية</span>
          <div className="flex flex-wrap items-center gap-3">
            <span>
              {studentName.trim() && selectedGrade
                ? `الطالب: ${studentName.trim()} · ${selectedGrade.label}`
                : 'أدخل اسمك وصفك الدراسي لتخصيص التجربة'}
            </span>
            <PWAInstallButton variant="compact" />
          </div>
        </div>
      </footer>
    </div>
  );
}
