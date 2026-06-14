'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Button from '@/components/ui/Button';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { calculatePAEI, type Answer } from '@/lib/adizes-calculator';
import { useRouter } from 'next/navigation';

const PAEI_QUESTIONS = [
  {
    id: 1,
    text: 'В работе я прежде всего...',
    statements: {
      A: 'Стремлюсь к конкретному ощутимому результату',
      B: 'Слежу за порядком и соблюдением процедур',
      V: 'Предлагаю новые идеи и вижу перспективы',
      G: 'Стараюсь поддержать комфортный климат в коллективе',
    },
  },
  {
    id: 2,
    text: 'Принимая важное решение, я...',
    statements: {
      A: 'Сразу перехожу к конкретным шагам',
      B: 'Анализирую все детали и возможные риски',
      V: 'Рассматриваю нестандартные варианты',
      G: 'Узнаю мнение коллег и стараюсь прийти к консенсусу',
    },
  },
  {
    id: 3,
    text: 'Когда команда сталкивается с трудностями, я...',
    statements: {
      A: 'Беру инициативу и срочно решаю проблему',
      B: 'Разбираю причины и строю план действий',
      V: 'Предлагаю переосмыслить подход полностью',
      G: 'Сплачиваю команду и поднимаю боевой дух',
    },
  },
  {
    id: 4,
    text: 'На рабочих совещаниях я предпочитаю...',
    statements: {
      A: 'Говорить о конкретных результатах и сроках',
      B: 'Обсуждать структуру, правила и ответственность',
      V: 'Генерировать идеи и видеть большую картину',
      G: 'Следить за тем, чтобы все чувствовали себя услышанными',
    },
  },
  {
    id: 5,
    text: 'Изменения в компании для меня — это...',
    statements: {
      A: 'Повод быстрее достигать новых целей',
      B: 'Необходимость тщательно выстраивать новые процессы',
      V: 'Захватывающие возможности для роста',
      G: 'Проверка сплоченности и доверия команды',
    },
  },
  {
    id: 6,
    text: 'Мой идеальный рабочий день — это...',
    statements: {
      A: 'Завершить максимум конкретных задач',
      B: 'Всё спланировано, все процессы работают чётко',
      V: 'Появились новые интересные проекты и идеи',
      G: 'Продуктивное взаимодействие с людьми',
    },
  },
  {
    id: 7,
    text: 'В конфликтных ситуациях я обычно...',
    statements: {
      A: 'Решаю проблему напрямую и сразу',
      B: 'Выясняю, какие правила были нарушены',
      V: 'Предлагаю новую перспективу для переосмысления',
      G: 'Помогаю сторонам найти компромисс',
    },
  },
  {
    id: 8,
    text: 'Планирование для меня — это...',
    statements: {
      A: 'Инструмент для достижения конкретных результатов',
      B: 'Основа организованной и предсказуемой работы',
      V: 'Возможность обозначить новые горизонты',
      G: 'Процесс согласования ожиданий команды',
    },
  },
  {
    id: 9,
    text: 'Я чувствую удовлетворение, когда...',
    statements: {
      A: 'Вижу ощутимый результат моей работы',
      B: 'Система работает без сбоев',
      V: 'Реализую смелую идею, которая изменила что-то важное',
      G: 'В моей команде царит атмосфера доверия и поддержки',
    },
  },
  {
    id: 10,
    text: 'Для меня важно, чтобы коллеги...',
    statements: {
      A: 'Выполняли обязательства в срок',
      B: 'Соблюдали установленные правила и процедуры',
      V: 'Были открыты к новым идеям и экспериментам',
      G: 'Уважали и поддерживали друг друга',
    },
  },
  {
    id: 11,
    text: 'В проектах я фокусируюсь на...',
    statements: {
      A: 'Конкретных метриках и сроках',
      B: 'Процессах, документации и контроле',
      V: 'Инновационности и стратегическом видении',
      G: 'Сплочённости команды и общем духе',
    },
  },
  {
    id: 12,
    text: 'Мои друзья и коллеги назвали бы меня...',
    statements: {
      A: 'Деятельным и результативным',
      B: 'Организованным и надёжным',
      V: 'Творческим и дальновидным',
      G: 'Чутким и умеющим объединять людей',
    },
  },
  {
    id: 13,
    text: 'Если возникает серьёзная проблема, я...',
    statements: {
      A: 'Немедленно берусь за её устранение',
      B: 'Разрабатываю систематический план решения',
      V: 'Ищу нестандартный, принципиально новый выход',
      G: 'Привлекаю нужных людей к совместному решению',
    },
  },
  {
    id: 14,
    text: 'Руководя другими, я...',
    statements: {
      A: 'Ставлю чёткие цели и требую результата',
      B: 'Объясняю правила и слежу за их соблюдением',
      V: 'Вдохновляю на смелые идеи и развитие',
      G: 'Создаю атмосферу доверия и взаимной поддержки',
    },
  },
  {
    id: 15,
    text: 'Мой стиль общения можно охарактеризовать как...',
    statements: {
      A: 'Прямой и конкретный — говорю о фактах',
      B: 'Структурированный и точный',
      V: 'Образный, вдохновляющий, о возможностях',
      G: 'Внимательный и ориентированный на диалог',
    },
  },
];

const EMPTY_RATINGS = { A: 0, B: 0, V: 0, G: 0 };

export default function PublicTestPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [ratings, setRatings] = useState({ ...EMPTY_RATINGS });
  const [finished, setFinished] = useState(false);
  const router = useRouter();

  const current = PAEI_QUESTIONS[step];
  const allRated = ratings.A > 0 && ratings.B > 0 && ratings.V > 0 && ratings.G > 0;

  const handleNext = () => {
    const newAnswer: Answer = { questionId: current.id, ratings: { ...ratings } };
    const newAnswers = [...answers];
    newAnswers[step] = newAnswer;
    setAnswers(newAnswers);

    if (step < PAEI_QUESTIONS.length - 1) {
      setStep(step + 1);
      const existing = newAnswers[step + 1];
      setRatings(existing ? { ...existing.ratings } : { ...EMPTY_RATINGS });
    } else {
      const score = calculatePAEI(newAnswers);
      console.log('PAEI Score:', score);
      setFinished(true);
      setTimeout(() => router.push('/ru/dashboard/results/1'), 2500);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
      setRatings(answers[step - 1] ? { ...answers[step - 1].ratings } : { ...EMPTY_RATINGS });
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-[#EDDDD3] flex items-center justify-center p-8">
        <div className="bg-white border-8 border-[#683E23] p-16 text-center shadow-[16px_16px_0px_0px_#683E23] max-w-lg w-full">
          <div className="text-7xl mb-6">🎯</div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-[#683E23] mb-4">
            Тест завершён!
          </h2>
          <p className="font-bold text-[#ACA59B] uppercase tracking-widest text-sm leading-loose">
            Ваши результаты рассчитаны.<br />Перенаправление к отчёту...
          </p>
        </div>
      </div>
    );
  }

  const progress = ((step + 1) / PAEI_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#EDDDD3]">
      <Header />
      <main className="max-w-3xl mx-auto p-6 md:p-12">

        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#ACA59B]">
              Вопрос {step + 1} из {PAEI_QUESTIONS.length}
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-[#683E23]">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-3 w-full bg-[#ACA59B]/20 border-2 border-[#683E23]">
            <div
              className="h-full bg-[#683E23] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white border-4 border-[#683E23] p-8 mb-8 shadow-[6px_6px_0px_0px_#683E23]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#683E23] text-white flex items-center justify-center font-black text-xl shrink-0">
              {step + 1}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#683E23] uppercase tracking-tight leading-tight">
              {current.text}
            </h2>
          </div>
          <p className="mt-4 ml-16 text-xs font-bold text-[#ACA59B] uppercase tracking-widest">
            Оцените каждое утверждение от 1 (совсем не про меня) до 4 (точно про меня)
          </p>
        </div>

        {/* Statements */}
        <div className="space-y-5">
          {(['A', 'B', 'V', 'G'] as const).map((key) => {
            const labelMap = { A: '#775948', B: '#683E23', V: '#FAC7A6', G: '#ACA59B' };
            return (
              <div
                key={key}
                className="bg-white border-4 border-[#683E23] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-[4px_4px_0px_0px_#ACA59B] hover:shadow-[2px_2px_0px_0px_#ACA59B] transition-all"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 shrink-0 flex items-center justify-center font-black text-sm border-2 border-[#683E23] text-white"
                    style={{ background: labelMap[key] }}
                  >
                    {key}
                  </div>
                  <p className="text-base font-bold text-[#2C4935] leading-snug">
                    {current.statements[key]}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0 ml-12 sm:ml-0">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      onClick={() => setRatings((r) => ({ ...r, [key]: n }))}
                      className={`w-12 h-12 font-black text-xl border-2 border-[#683E23] transition-all ${
                        ratings[key] === n
                          ? 'bg-[#FAC8A7] text-[#2C4935] shadow-[2px_2px_0px_0px_#2C4935]'
                          : 'bg-transparent text-[#683E23] hover:bg-[#FAC7A6]/30'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-8 border-t-4 border-[#683E23]/20">
          <Button
            variant="outline"
            icon={ChevronLeft}
            onClick={handlePrev}
            disabled={step === 0}
            className="px-8"
          >
            Назад
          </Button>
          <Button
            variant="primary"
            icon={step === PAEI_QUESTIONS.length - 1 ? CheckCircle2 : ChevronRight}
            onClick={handleNext}
            disabled={!allRated}
            className="px-8"
          >
            {step === PAEI_QUESTIONS.length - 1 ? 'Завершить' : 'Далее'}
          </Button>
        </div>
      </main>
    </div>
  );
}
