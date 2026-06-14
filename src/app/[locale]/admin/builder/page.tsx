'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Header from '@/components/Header';
import { Plus, Trash2, Save } from 'lucide-react';

interface Statement {
  A: string;
  B: string;
  V: string;
  G: string;
}

interface Question {
  id: number;
  text: string;
  statements: Statement;
}

const defaultQuestion = (): Question => ({
  id: Date.now(),
  text: '',
  statements: { A: '', B: '', V: '', G: '' },
});

export default function AdminBuilder() {
  const [testTitle, setTestTitle] = useState('PAEI Test');
  const [questions, setQuestions] = useState<Question[]>([
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
  ]);

  const addQuestion = () => setQuestions((prev) => [...prev, defaultQuestion()]);
  const removeQuestion = (id: number) =>
    setQuestions((prev) => prev.filter((q) => q.id !== id));

  const updateQuestion = (id: number, field: keyof Question, value: string) =>
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );

  const updateStatement = (id: number, key: keyof Statement, value: string) =>
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, statements: { ...q.statements, [key]: value } } : q
      )
    );

  const handleSave = () => {
    const content = { title: testTitle, questions };
    console.log('Saving test:', content);
    alert('Тест сохранён (в консоль). Подключите Supabase для реального сохранения.');
  };

  return (
    <div className="min-h-screen bg-[#EDDDD3]">
      <Header />
      <main className="max-w-4xl mx-auto p-6 md:p-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 bg-white border-4 border-[#683E23] p-8 shadow-[8px_8px_0px_0px_#683E23]">
          <div className="flex-1">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-[#683E23] mb-4 border-l-8 border-[#775948] pl-4">
              Конструктор&nbsp;Тестов
            </h1>
            <Input
              label="Название теста"
              value={testTitle}
              onChange={(e) => setTestTitle(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Button variant="primary" icon={Plus} onClick={addQuestion}>
              Добавить вопрос
            </Button>
            <Button variant="secondary" icon={Save} onClick={handleSave}>
              Сохранить тест
            </Button>
          </div>
        </div>

        <div className="space-y-10">
          {questions.map((q, index) => (
            <div
              key={q.id}
              className="bg-white border-4 border-[#683E23] p-8 shadow-[6px_6px_0px_0px_#775948] relative"
            >
              <button
                onClick={() => removeQuestion(q.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors p-1"
                title="Удалить вопрос"
              >
                <Trash2 size={22} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#683E23] text-white flex items-center justify-center font-black text-lg shrink-0">
                  {index + 1}
                </div>
                <Input
                  label="Текст вопроса"
                  placeholder="Введите текст вопроса..."
                  value={q.text}
                  onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                  className="flex-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {(['A', 'B', 'V', 'G'] as const).map((key) => {
                  const roleMap = { A: 'P — Производство', B: 'A — Администрирование', V: 'E — Предпринимательство', G: 'I — Интеграция' };
                  return (
                    <div key={key} className="flex gap-3 items-start">
                      <div className="w-8 h-8 shrink-0 mt-5 font-black text-sm flex items-center justify-center bg-[#FAC8A7] border-2 border-[#683E23] text-[#683E23]">
                        {key}
                      </div>
                      <Input
                        label={roleMap[key]}
                        placeholder={`Утверждение ${key}...`}
                        value={q.statements[key]}
                        onChange={(e) => updateStatement(q.id, key, e.target.value)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {questions.length === 0 && (
          <div className="text-center py-20 text-[#ACA59B] font-bold uppercase tracking-widest border-4 border-dashed border-[#ACA59B]">
            Нет вопросов. Нажмите «Добавить вопрос».
          </div>
        )}
      </main>
    </div>
  );
}
