'use client';

import React from 'react';
import Header from '@/components/Header';
import ResultsChart from '@/components/ResultsChart';
import Button from '@/components/ui/Button';
import { Download, Share2, ChevronLeft, MapPin } from 'lucide-react';
import Link from 'next/link';

// Dynamic import to avoid SSR issues with html2pdf
let html2pdfLib: typeof import('html2pdf.js') | null = null;
if (typeof window !== 'undefined') {
  import('html2pdf.js').then((m) => { html2pdfLib = m; });
}

const ROLE_DESCRIPTIONS: Record<string, { title: string; description: string; color: string; bg: string }> = {
  P: {
    title: 'Производитель',
    description: 'Ориентирован на результат. Действует быстро, фокусируется на конкретных задачах и достижении целей в срок.',
    color: '#775948',
    bg: '#F5EDE6',
  },
  A: {
    title: 'Администратор',
    description: 'Ценит порядок и системность. Создаёт процессы, следит за соблюдением правил и стандартов.',
    color: '#683E23',
    bg: '#EDE0D6',
  },
  E: {
    title: 'Предприниматель',
    description: 'Генерирует идеи и видит стратегические возможности. Вдохновляет команду на изменения.',
    color: '#C4935A',
    bg: '#FAF0E0',
  },
  I: {
    title: 'Интегратор',
    description: 'Объединяет людей вокруг общей цели. Создаёт атмосферу доверия и взаимной поддержки.',
    color: '#7A7168',
    bg: '#EDEBE7',
  },
};

const mockResult = {
  id: '1',
  userName: 'Иван Иванов',
  score: { P: 34, A: 27, E: 36, I: 23 },
  date: '20.03.2024',
};

function getDominantRole(score: { P: number; A: number; E: number; I: number }) {
  const entries = Object.entries(score) as [string, number][];
  return entries.reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}

export default function ResultsPage() {
  const dominant = getDominantRole(mockResult.score);
  const roleInfo = ROLE_DESCRIPTIONS[dominant];

  const exportPDF = async () => {
    const el = document.getElementById('report-container');
    if (!el) return;
    if (!html2pdfLib) {
      html2pdfLib = await import('html2pdf.js');
    }
    const m = html2pdfLib as { default?: unknown };
    const h2p = typeof m === 'function' ? m : (m.default as (el: HTMLElement) => { set: (opts: unknown) => { save: () => void } });
    (h2p as (el: HTMLElement) => { set: (opts: unknown) => { save: () => void } })(el).set({
      margin: 10,
      filename: `compass-paei-${mockResult.userName.replace(' ', '-')}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }).save();
  };

  const shareResults = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Ссылка на результаты скопирована!');
  };

  return (
    <div className="min-h-screen bg-[#F9F6F2] pb-24">
      <Header />
      <main className="max-w-5xl mx-auto p-8 md:p-16">

        <Link
          href="/ru/dashboard"
          className="inline-flex items-center gap-2 text-compass-heading-secondary font-bold uppercase tracking-[0.2em] text-[10px] hover:opacity-60 transition-opacity mb-12"
        >
          <ChevronLeft size={16} /> Вернуться в кабинет
        </Link>

        {/* Top bar */}
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-8">
          <div>
            <h1 className="text-5xl font-bold uppercase tracking-tighter text-compass-heading-secondary mb-3">
              Результаты PAEI
            </h1>
            <p className="text-compass-text-muted font-bold tracking-[0.2em] uppercase text-[10px] opacity-80">
              {mockResult.userName} · {mockResult.date}
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" icon={Share2} onClick={shareResults} className="px-8">
              Поделиться
            </Button>
            <Button variant="primary" icon={Download} onClick={exportPDF} className="px-10">
              Скачать PDF
            </Button>
          </div>
        </div>

        {/* Report container */}
        <div
          id="report-container"
          className="bg-white border border-compass-text-muted/10 overflow-hidden"
        >
          {/* Report header */}
          <div className="bg-compass-heading-secondary text-white p-12 flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold uppercase tracking-tight mb-2">{mockResult.userName}</h2>
              <p className="text-compass-text-primary font-bold uppercase tracking-[0.2em] text-[10px] opacity-70">
                Отчёт по методологии Адизеса · PAEI Profile
              </p>
            </div>
            <div className="hidden md:flex flex-col items-end gap-1.5 opacity-60">
              <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Compass Management</span>
              <span className="text-[10px] font-bold uppercase tracking-widest leading-none">{mockResult.date}</span>
            </div>
          </div>

          <div className="p-10 md:p-20 space-y-20">

            {/* Score + Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

              {/* Role legend */}
              <div className="space-y-6">
                <h3 className="font-bold uppercase tracking-[0.2em] text-compass-heading-secondary text-[11px] border-b border-compass-text-muted/10 pb-4">
                  Ролевой профиль
                </h3>
                <div className="space-y-5">
                  {(['P', 'A', 'E', 'I'] as const).map((role) => {
                    const info = ROLE_DESCRIPTIONS[role];
                    const val = mockResult.score[role];
                    const max = Math.max(...Object.values(mockResult.score));
                    const pct = Math.round((val / max) * 100);
                    return (
                      <div key={role} className="flex items-center gap-5">
                        <div
                          className="w-10 h-10 shrink-0 flex items-center justify-center font-bold text-lg text-white"
                          style={{ background: info.color }}
                        >
                          {role}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-bold uppercase text-[10px] tracking-widest" style={{ color: info.color }}>
                              {info.title}
                            </p>
                            <span className="font-bold text-sm" style={{ color: info.color }}>{val}</span>
                          </div>
                          <div className="h-1 bg-[#F9F6F2]">
                            <div
                              className="h-full transition-all duration-700"
                              style={{ width: `${pct}%`, background: info.color }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chart */}
              <div>
                <h3 className="font-bold uppercase tracking-[0.2em] text-compass-heading-secondary text-[11px] border-b border-compass-text-muted/10 pb-4 mb-8">
                  График баллов
                </h3>
                <ResultsChart data={mockResult.score} />
              </div>
            </div>

            {/* Dominant role banner */}
            <div
              className="p-12 border border-compass-text-muted/10"
              style={{ background: roleInfo.bg }}
            >
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div
                  className="w-16 h-16 shrink-0 flex items-center justify-center font-bold text-3xl text-white"
                  style={{ background: roleInfo.color }}
                >
                  {dominant}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-compass-heading-secondary/60 mb-2">
                    Доминирующая роль
                  </p>
                  <h3 className="text-3xl font-bold uppercase tracking-tight mb-4" style={{ color: roleInfo.color }}>
                    {roleInfo.title}
                  </h3>
                  <p className="font-medium text-compass-heading-secondary/80 leading-relaxed max-w-2xl text-lg">
                    {roleInfo.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Score summary row */}
            <div className="grid grid-cols-4 border border-compass-text-muted/10 divide-x divide-compass-text-muted/10">
              {(['P', 'A', 'E', 'I'] as const).map((role) => {
                const info = ROLE_DESCRIPTIONS[role];
                const val = mockResult.score[role];
                return (
                  <div
                    key={role}
                    className="p-10 text-center"
                    style={{ background: role === dominant ? info.bg : 'transparent' }}
                  >
                    <div className="text-6xl font-bold mb-3 tracking-tighter" style={{ color: info.color }}>{val}</div>
                    <div className="font-bold text-xl" style={{ color: info.color }}>{role}</div>
                    <div className="text-[10px] font-bold text-compass-text-muted uppercase tracking-[0.2em] mt-2">{info.title}</div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="pt-12 border-t border-compass-text-muted/10 font-bold uppercase text-[9px] tracking-[0.3em] text-compass-text-muted flex items-center justify-between">
              <span>© 2024 COMPASS MANAGEMENT · PAEI ASSESSMENT</span>
              <span className="flex items-center gap-2 opacity-70"><MapPin size={12} /> compassmanagement.io</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
