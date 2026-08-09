import { useTranslations } from 'next-intl';

export default function SkillsSection() {
  const t = useTranslations('about.skills');
  
  const skillCategories = [
    {
      title: t('frontend.title'),
      items: t.raw('frontend.items') as string[]
    },
    {
      title: t('backend.title'),
      items: t.raw('backend.items') as string[]
    },
    {
      title: t('tools.title'),
      items: t.raw('tools.items') as string[]
    }
  ];
  
  return (
    <section className="py-24 px-0 bg-gradient-to-b from-transparent to-[#050608]">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 hover:bg-white/[0.03] transition-colors">
              <h3 className="text-xl font-semibold mb-4 text-[#628DFF]">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((skill, skillIndex) => (
                  <li key={skillIndex} className="text-[#8A8FA0] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#628DFF] rounded-full"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
