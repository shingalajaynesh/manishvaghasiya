import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Users, ShieldAlert, Award, Compass, GraduationCap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Programs() {
  const { t } = useLanguage();

  const programList = [
    {
      id: 'vandan',
      title: t('programs.vandan.title'),
      desc: t('programs.vandan.desc'),
      image: '/images/program-vandan.png',
      icon: <Heart className="w-5 h-5" />,
      color: 'bg-brand-gold/10 text-brand-gold',
      size: 'lg:col-span-8'
    },
    {
      id: 'bonding',
      title: t('programs.bonding.title'),
      desc: t('programs.bonding.desc'),
      image: null,
      icon: <Users className="w-5 h-5" />,
      color: 'bg-brand-terracotta/10 text-brand-terracotta',
      size: 'lg:col-span-4'
    },
    {
      id: 'peace',
      title: t('programs.peace.title'),
      desc: t('programs.peace.desc'),
      image: '/images/program-parenting.png',
      icon: <Compass className="w-5 h-5" />,
      color: 'bg-green-500/10 text-green-600',
      size: 'lg:col-span-4'
    },
    {
      id: 'oneRupee',
      title: t('programs.oneRupee.title'),
      desc: t('programs.oneRupee.desc'),
      image: null,
      icon: <Award className="w-5 h-5" />,
      color: 'bg-blue-500/10 text-blue-600',
      size: 'lg:col-span-8'
    },
    {
      id: 'students',
      title: t('programs.students.title'),
      desc: t('programs.students.desc'),
      image: '/images/program-student.png',
      icon: <GraduationCap className="w-5 h-5" />,
      color: 'bg-indigo-500/10 text-indigo-600',
      size: 'lg:col-span-6'
    },
    {
      id: 'teachers',
      title: t('programs.teachers.title'),
      desc: t('programs.teachers.desc'),
      image: null,
      icon: <Users className="w-5 h-5" />,
      color: 'bg-purple-500/10 text-purple-600',
      size: 'lg:col-span-6'
    }
  ];

  return (
    <section id="programs" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-1/4 w-[50vw] h-[50vw] bg-brand-blush/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[11px] font-sans font-extrabold text-brand-goldDark tracking-[0.25em] uppercase mb-2">
            {t('nav.programs')}
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif font-black text-brand-darkText leading-tight">
            {t('programs.title')}
          </h3>
          <p className="text-sm md:text-base text-gray-500 mt-3 font-sans font-medium">
            {t('programs.subtitle')}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {programList.map((prog, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              key={prog.id}
              className={`rounded-[2rem] border border-gray-100 overflow-hidden bg-brand-lightBg flex flex-col justify-between group hover:border-brand-gold/30 hover:shadow-lg transition-all duration-500 ${prog.size}`}
            >
              
              {/* Image Header if applicable */}
              {prog.image ? (
                <div className="w-full aspect-[16/8] overflow-hidden relative border-b border-gray-100">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-lightBg to-transparent opacity-60" />
                </div>
              ) : null}

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2.5 rounded-xl ${prog.color}`}>
                      {prog.icon}
                    </div>
                    <span className="text-xs font-sans font-bold tracking-wider text-gray-400 uppercase">
                      {idx + 1} / 6
                    </span>
                  </div>

                  <h4 className="text-xl md:text-2xl font-serif font-bold text-brand-darkText mb-3 group-hover:text-brand-gold transition-colors duration-300">
                    {prog.title}
                  </h4>

                  <p className="text-sm md:text-base text-gray-500 leading-relaxed font-sans font-medium">
                    {prog.desc}
                  </p>
                </div>

                {/* Footer link trigger */}
                <div className="mt-6 pt-4 border-t border-gray-200/40 flex justify-between items-center text-xs font-sans font-bold text-brand-terracotta hover:text-brand-gold cursor-pointer transition-colors duration-300">
                  <span>Enquire Details</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
