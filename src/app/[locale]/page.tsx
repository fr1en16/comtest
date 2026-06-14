import Link from 'next/link';
import { ArrowRight, Lock, Shield, Users, BarChart } from 'lucide-react';
import Header from '@/components/Header';

const TESTS = [
  {
    id: 'paei-default',
    key: 'paei',
    active: true,
    icon: BarChart,
  },
  {
    id: 'team',
    key: 'team',
    active: false,
    icon: Users,
  },
  {
    id: 'leadership',
    key: 'leadership',
    active: false,
    icon: Shield,
  },
];

const TRANSLATIONS = {
  ru: {
    title: 'Модули тестирования',
    description: 'Выберите подходящий тест для оценки ваших качеств и навыков.',
    start: 'Начать тест',
    disabled: 'Недоступно',
    tests: {
      paei: {
        title: 'Оценка PAEI (Метод Адизеса)',
        description: 'Определение управленческого кода. Анализ ролей: Производитель, Администратор, Предприниматель, Интегратор.',
      },
      team: {
        title: 'Командная динамика',
        description: 'Анализ психологического климата и профессиональной совместимости членов вашей команды.',
      },
      leadership: {
        title: 'Лидерские качества',
        description: 'Исследование индивидуальных лидерских качеств и определение зон для профессионального роста.',
      }
    }
  },
  en: {
    title: 'Assessment Modules',
    description: 'Select a suitable test to evaluate your qualities and skills.',
    start: 'Start Test',
    disabled: 'Disabled',
    tests: {
      paei: {
        title: 'PAEI Assessment (Adizes)',
        description: 'Determining the management code. Role analysis: Producer, Administrator, Entrepreneur, Integrator.',
      },
      team: {
        title: 'Team Dynamics',
        description: 'Analysis of the psychological climate and professional compatibility of your team members.',
      },
      leadership: {
        title: 'Leadership Qualities',
        description: 'Study of individual leadership qualities and identification of areas for professional growth.',
      }
    }
  },
  uz: {
    title: 'Test modullari',
    description: 'Sifat va ko\'nikmalaringizni baholash uchun mos keladigan testni tanlang.',
    start: 'Testni boshlash',
    disabled: 'Mavjud emas',
    tests: {
      paei: {
        title: 'PAEI Baholash (Adizes)',
        description: 'Boshqaruv kodini aniqlash. Rollar tahlili: Ishlab chiqaruvchi, Administrator, Tadbirkor, Integrator.',
      },
      team: {
        title: 'Jamoa dinamikasi',
        description: 'Jamoangiz a\'zolarining psixologik iqlimi va kasbiy mosligini tahlil qilish.',
      },
      leadership: {
        title: 'Yetakchilik fazilatlari',
        description: 'Shaxsiy yetakchilik fazilatlarini o\'rganish va professional o\'sish sohalarini aniqlash.',
      }
    }
  }
};

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'ru';
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] || TRANSLATIONS.ru;

  return (
    <div className="min-h-screen bg-[#EDDDD3] flex flex-col text-[#683E23] border-4 border-[#683E23] m-0 overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 py-16 px-8 md:px-16 max-w-7xl mx-auto w-full">
        {/* Heading Section */}
        <div className="mb-16 pb-8 border-b-4 border-[#683E23]/20">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
            {t.title}
          </h1>
          <p className="text-sm font-bold text-[#775948] max-w-2xl uppercase leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTS.map((test) => {
            const Icon = test.icon;
            const testInfo = t.tests[test.key as keyof typeof t.tests];

            return (
              <div 
                key={test.id}
                className={`bg-white border-4 border-[#683E23] p-8 flex flex-col shadow-[6px_6px_0px_0px_#683E23] ${!test.active ? 'opacity-50' : ''}`}
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-[#683E23] text-white flex items-center justify-center font-black text-xl shrink-0 mb-8 border-2 border-[#683E23]">
                  <Icon size={24} />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-black uppercase tracking-tight text-[#683E23] mb-4 leading-tight">
                  {testInfo.title}
                </h3>

                {/* Description */}
                <p className="text-sm font-bold text-[#2C4935] leading-relaxed mb-8 flex-1">
                  {testInfo.description}
                </p>

                {/* Button */}
                {test.active ? (
                  <Link
                    href={`/${locale}/test/${test.id}`}
                    className="inline-flex items-center justify-between px-6 py-4 bg-[#FAC8A7] text-[#2C4935] border-2 border-[#683E23] font-black uppercase tracking-widest text-[10px] shadow-[4px_4px_0px_0px_#683E23] hover:shadow-[2px_2px_0px_0px_#683E23] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    {t.start}
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <div className="inline-flex items-center justify-between px-6 py-4 bg-transparent text-[#ACA59B] border-2 border-[#ACA59B] font-black uppercase tracking-widest text-[10px] cursor-not-allowed">
                    {t.disabled}
                    <Lock size={16} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
