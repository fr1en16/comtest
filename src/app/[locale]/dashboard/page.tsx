'use client';

import React from 'react';
import Header from '@/components/Header';
import Button from '@/components/ui/Button';
import { Send, BarChart2, Calendar, Plus } from 'lucide-react';
import Link from 'next/link';

const mockResults = [
  { id: '1', name: 'Иван Иванов', score: { P: 34, A: 27, E: 36, I: 23 }, date: '20.03.2024' },
  { id: '2', name: 'Анна Смирнова', score: { P: 28, A: 42, E: 15, I: 35 }, date: '19.03.2024' },
  { id: '3', name: 'Сергей Петров', score: { P: 40, A: 20, E: 45, I: 15 }, date: '18.03.2024' },
];

const roleColors: Record<string, string> = {
  P: '#775948',
  A: '#683E23',
  E: '#FAC7A6',
  I: '#ACA59B',
};

export default function Dashboard() {
  const generateLink = () => {
    const url = `${window.location.origin}/ru/test/paei-default`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Ссылка скопирована в буфер обмена!\n\n' + url);
    });
  };

  return (
    <div className="min-h-screen bg-[#F9F6F2]">
      <Header />
      <main className="max-w-6xl mx-auto p-8 md:p-16">

        {/* Hero header */}
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-8">
          <div>
            <h1 className="text-5xl font-bold uppercase tracking-tighter text-compass-heading-secondary mb-3">
              Личный кабинет
            </h1>
            <p className="text-compass-text-muted font-bold tracking-[0.2em] uppercase text-[10px] opacity-80">
              Управление тестированием и аналитика
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="primary" icon={Send} onClick={generateLink} className="px-10">
              Отправить тест
            </Button>
            <Link href="/ru/admin/builder">
              <Button variant="outline" icon={Plus}>
                Создать тест
              </Button>
            </Link>
          </div>
        </div>

        {/* Results section */}
        <div className="bg-white border border-compass-text-muted/10 p-2">
          <div className="p-8 border-b border-compass-text-muted/10 flex items-center justify-between">
            <div className="flex items-center gap-3 text-compass-heading-secondary">
              <BarChart2 size={24} strokeWidth={1.5} />
              <h2 className="font-bold uppercase tracking-[0.2em] text-xs">Пройденные тесты</h2>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-compass-text-muted">
              Всего: {mockResults.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-[#F9F6F2]/30">
                  {['Сотрудник', 'P', 'A', 'E', 'I', 'Дата', ''].map((h) => (
                    <th
                      key={h}
                      className="px-8 py-5 font-bold uppercase tracking-[0.2em] text-[10px] text-compass-text-muted border-b border-compass-text-muted/10"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockResults.map((res) => (
                  <tr
                    key={res.id}
                    className="group border-b border-compass-text-muted/5 last:border-0 hover:bg-[#F9F6F2]/40 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4 font-bold text-compass-heading-secondary">
                        <div className="w-10 h-10 bg-compass-button-bg flex items-center justify-center font-black text-xs text-compass-button-text">
                          {res.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm tracking-tight">{res.name}</span>
                      </div>
                    </td>
                    {(['P', 'A', 'E', 'I'] as const).map((role) => (
                      <td
                        key={role}
                        className="px-8 py-6 text-center font-bold text-base"
                        style={{ color: roleColors[role] }}
                      >
                        {res.score[role]}
                      </td>
                    ))}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-compass-text-muted font-bold text-[11px] tracking-wide">
                        <Calendar size={13} strokeWidth={1.5} /> {res.date}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link href={`/ru/dashboard/results/${res.id}`}>
                        <Button variant="outline" className="text-[10px] py-2 px-6 h-auto tracking-[0.15em]">
                          Просмотреть
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
