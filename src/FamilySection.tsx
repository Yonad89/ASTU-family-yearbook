import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Quote, Calendar } from 'lucide-react';
import { FAMILY_MEMBERS_DATA, FamilyMember } from '../data/familyData'; // Adjust path if your data file is located elsewhere

const CATEGORIES = [
  'All',
  'Leadership',
  'Bible Study',
  'The Chaos Department 😂',
  'The Quiet Ones',
  'The Funny Ones',
];

export const FamilySection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredMembers = FAMILY_MEMBERS_DATA.filter((member: FamilyMember) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      member.realName.toLowerCase().includes(query) ||
      member.nickname.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query) ||
      member.knownFor.some((trait) => trait.toLowerCase().includes(query));

    if (!matchesSearch) return false;
    if (selectedCategory === 'All') return true;

    if (selectedCategory === 'Leadership') {
      return (
        member.role.includes('Dad') ||
        member.role.includes('Mom') ||
        member.role.includes('Big') ||
        member.role.includes('Link')
      );
    }
    if (selectedCategory === 'Bible Study') {
      return member.knownFor.some((k) =>
        ['bible', 'christian', 'apologetics', 'spiritually'].some((term) =>
          k.toLowerCase().includes(term)
        )
      );
    }
    if (selectedCategory === 'The Chaos Department 😂') {
      return member.knownFor.some((k) =>
        ['ragebaiting', 'calculus', 'loud', 'cars', 'chaos', 'singing'].some(
          (term) => k.toLowerCase().includes(term)
        )
      );
    }
    if (selectedCategory === 'The Quiet Ones') {
      return member.knownFor.some((k) =>
        ['gentleness', 'quietness', 'introversion', 'nonchalance', 'calm'].some(
          (term) => k.toLowerCase().includes(term)
        )
      );
    }
    if (selectedCategory === 'The Funny Ones') {
      return member.knownFor.some((k) => k.toLowerCase().includes('humor'));
    }

    return true;
  });

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl"
        >
          Meet The Fellowship Family
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 max-w-2xl mx-auto text-lg text-slate-400"
        >
          Each personality brings a unique flavor, spiritual strength, and
          unforgettable energy to our home.
        </motion.p>
      </div>

      {/* Search Bar & Category Filters */}
      <div className="flex flex-col items-center gap-6 mb-12">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, role, or trait..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-900/80 border border-slate-700/60 rounded-full text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-lg"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105 font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Animated Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredMembers.map((member, index) => {
            const imageSrc = member.photo
              ? encodeURI(`/${member.photo}`)
              : '/fam.jpg';

            return (
              <motion.div
                layout
                key={member.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/10 transition-all group"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-800 border-2 border-amber-500/30 flex-shrink-0 group-hover:border-amber-400 transition-colors">
                      <img
                        src={imageSrc}
                        alt={member.realName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="w-full h-full flex items-center justify-center bg-amber-500/10 text-amber-400 font-bold text-xl absolute inset-0 -z-10">
                        {member.realName.charAt(0)}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {member.realName}
                        <span className="text-xs font-normal text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                          "{member.nickname}"
                        </span>
                      </h3>
                      <p className="text-sm font-medium text-slate-400">
                        {member.role}
                      </p>
                      {member.birthday && (
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-500/70" />
                          {member.birthday}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {member.description}
                  </p>

                  {member.favoriteVerse &&
                    member.favoriteVerse !== 'Not added yet' && (
                      <div className="flex items-start gap-2 p-3 bg-slate-800/40 rounded-lg text-xs text-amber-200/80 mb-4 border border-slate-800">
                        <Quote className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>{member.favoriteVerse}</span>
                      </div>
                    )}
                </div>

                <div className="px-6 pb-6 pt-0">
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                    {member.knownFor.map((trait, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700/50"
                      >
                        #{trait}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredMembers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 text-slate-500"
        >
          <Sparkles className="w-10 h-10 mx-auto mb-3 text-slate-600" />
          <p className="text-lg">No family members found matching your search.</p>
        </motion.div>
      )}
    </section>
  );
};
