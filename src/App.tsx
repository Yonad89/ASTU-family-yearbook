import React, { useState, useMemo, useEffect } from 'react';
import { 
  Heart, 
  Search, 
  Calendar, 
  Sparkles, 
  BookOpen, 
  ShieldAlert, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  ChevronRight, 
  Cross, 
  Camera, 
  Laugh, 
  Users, 
  Flame, 
  GraduationCap,
  MessageSquare,
  Award,
  Zap
} from 'lucide-react';
import Hero3D from './Hero3D';
import RotatingText from './RotatingText';
import ScrollReveal from './ScrollReveal';
import StarBorder from './StarBorder';
// ==========================================
// 1. TYPES & DATA STRUCTURES
// ==========================================



export interface FamilyMember {
  id: string;
  realName: string;
  nickname: string;
  role: string;
  description: string;
  birthday: string; // ISO String format YYYY-MM-DD or empty
  photo: string;
  favoriteVerse: string;
  knownFor: string[];
  //categories: FilterCategory[];
}

export interface Memory {
  id: string;
  title: string;
  date: string;
  location: string;
  caption: string;
  image: string;
  category: 'Group' | 'Funny' | 'Bible Study' | 'Events' | 'Trips';
  taggedMembers: string[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}

// ==========================================
// 2. CENTRALIZED DATA ARCHITECTURE
// ==========================================

export const FAMILY_MEMBERS_DATA: FamilyMember[] = [
  {
    id: 'abeni',
    realName: 'Abenezer',
    nickname: 'Dad',
    role: 'Dad of the family',
    description: 'Crazy yet caring. Lives life on easy mode yet somehow takes things deeply. Has knowledge in many different aspects of life and somehow always has something to say about almost everything.',
    birthday: 'July 14',
    photo: 'dad.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Wisdom', 'Caring', 'Life knowledge', 'Controlled chaos'],
    //categories: ['Everyone', 'Leadership', 'The Chaos Department 😂']
  },
  {
    id: 'fri',
    realName: 'Friket',
    nickname: 'Mom',
    role: 'Mom of the family',
    description: 'A gentle soul. Loves everyone and somehow everyone loves her back. Her soft behavior can melt the heart of almost anyone.',
    birthday: 'September 5',
    photo: 'mom.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Kindness', 'Gentleness', 'Making people feel loved'],
    //categories: ['Everyone', 'Leadership', 'The Quiet Ones']
  },
  {
    id: 'yabu',
    realName: 'Yeabsira',
    nickname: 'Ewawa',
    role: 'Bible Study Link',
    description: 'Christ-centered girl who loves everyone and is loved by everyone. She genuinely cares about people and gives Christ-anchored advice. She is someone who guides others toward Christ rather than simply telling them what they want to hear.',
    birthday: 'August 10',
    photo: 'wawa.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Christ-centered advice', 'Caring', 'Guidance', 'Love'],
    //categories: ['Everyone', 'Bible Study', 'Counseling']
  },
  {
    id: 'yoni',
    realName: 'Yonas',
    nickname: 'yoni',
    role: 'Counseling Link',
    description: 'Strong character yet soft-hearted. Has a great sense of humor, actually listens when people talk, and knows how to guide people without making them feel judged.',
    birthday: 'January 8',
    photo: 'yonas.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Listening', 'Guidance', 'Humor', 'Emotional wisdom'],
   // categories: ['Everyone', 'Counseling', 'Leadership', 'The Funny Ones']
  },
  {
    id: 'gelo',
    realName: 'Gelana',
    nickname: 'Gelo',
    role: 'Big Brother',
    description: 'Genius mind yet somehow stupid at the same time. 😂 Can solve calculus problems but can also get stuck wondering whether the sun is following him or not. Despite the chaos, he is a genuine leader who knows how to gather everyone together and keep the family connected.',
    birthday: 'January 30',
    photo: 'Gelo.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Calculus', 'Intelligence', 'Leadership', 'Hilarious confusion'],
    //categories: ['Everyone', 'Leadership', 'The Funny Ones', 'The Chaos Department 😂']
  },
  {
    id: 'keti',
    realName: 'Ketim',
    nickname: 'Kena',
    role: 'Big Sister',
    description: 'Professional ragebaiter, certified photo girl, yet incredibly humble and thoughtful underneath all the trolling.',
    birthday: 'November 23',
    photo: 'keti.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Ragebaiting', 'Photography', 'Humility', 'Thoughtfulness'],
    //categories: ['Everyone', 'Leadership', 'The Chaos Department 😂']
  },
  {
    id: 'amen',
    realName: 'Amen',
    nickname: 'Amiti or Amenua',
    role: 'Sister',
    description: 'A gentle soul. Loves everyone and everyone loves her.',
    birthday: 'August 17',
    photo: 'amen.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Gentleness', 'Kindness'],
    //categories: ['Everyone', 'The Quiet Ones']
  },
  {
    id: 'elroi',
    realName: 'Elroi',
    nickname: 'Option Lee',
    role: "Sister",
    description: 'Talks non-stop. Literally. She is the light of the family. If Elroi is around, the family cannot get bored.',
    birthday: 'September 25',
    photo: 'lee.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Talking', 'Energy', 'Laughter', 'Keeping everyone entertained'],
    //categories: ['Everyone', 'The Funny Ones', 'The Chaos Department 😂']
  },
  {
    id: 'acsah',
    realName: 'Acsah',
    nickname: 'Acsah',
    role: 'Sister',
    description: 'Can match the energy and communicate with almost anyone. Somehow knows how to connect with completely different personalities. Also possesses a questionable sense of humor.',
    birthday: 'May 12',
    photo: 'acsah.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Communication', 'Adaptability', 'Questionable humor'],
    //categories: ['Everyone', 'The Funny Ones']
  },
  {
    id: 'tsion',
    realName: 'Tsion',
    nickname: 'Tsi',
    role: 'Sister',
    description: 'A gentle soul who is very introverted and shy.',
    birthday: '',
    photo: 'tsion.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Gentleness', 'Quietness', 'Humility'],
    //categories: ['Everyone', 'The Quiet Ones']
  },
  {
    id: 'tsion-big',
    realName: 'Tsion',
    nickname: 'Tsi',
    role: 'Sister',
    description: 'A gentle soul who didn\'t get to come around the family as much, but whenever she did, she was quite interactive and pleasant to be around.',
    birthday: '',
    photo: '',
    favoriteVerse: 'Not added yet',
    knownFor: ['Gentleness', 'Warm interaction'],
   // categories: ['Everyone', 'The Quiet Ones']
  },
  {
    id: 'afnan',
    realName: 'Afnan',
    nickname: 'Grandma 😂',
    role: 'Sister',
    description: 'The girl with a gentle soul. Loves everyone and everyone loves her.',
    birthday: 'May 24',
    photo: 'afnan.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Gentleness', 'Maturity', 'Affection'],
    //categories: ['Everyone', 'Leadership', 'The Quiet Ones']
  },
  {
    id: 'yewalii',
    realName: 'Yehuala-eshet',
    nickname: 'Yewaliii',
    role: 'Brother',
    description: 'A programmer with a deeply Christian character. His presence during Bible study has been a blessing to the family.',
    birthday: 'March 13',
    photo: 'yewalii.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Programming', 'Christian depth', 'Bible study'],
    //categories: [ 'Bible Study', 'The Quiet Ones']
  },
  {
    id: 'nathan',
    realName: 'Nathan',
    nickname: 'Mr. Nonchalant',
    role: 'Brother',
    description: 'Questionable sense of humor, extremely nonchalant, yet somehow still fun to talk to. Also a programmer.',
    birthday: 'April 4',
    photo: 'nathan.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Nonchalance', 'Humor', 'Programming'],
    //categories: ['Everyone', 'The Funny Ones', 'The Quiet Ones']
  },
  {
    id: 'sami-science',
    realName: 'Samuel',
    nickname: 'Sami applied',
    role: 'Brother',
    description: 'A guy with an "IDC" mentality.',
    birthday: 'February 13',
    photo: 'sami app.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Applied science', 'Not caring about unnecessary drama'],
    //categories: ['Everyone', 'The Quiet Ones']
  },
  {
    id: 'nati',
    realName: 'Nathnael',
    nickname: 'Nati',
    role: 'Brother',
    description: 'The manga guy. Lives life in neutral gear. Introverted but still interactive when you actually get him talking.',
    birthday: 'March 8',
    photo: 'nati.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Manga', 'Introversion', 'Chill energy'],
   // categories: ['Everyone', 'The Quiet Ones']
  },
  {
    id: 'teshu',
    realName: 'Teshager',
    nickname: 'Teshe',
    role: 'Brother',
    description: 'The loud one. A wannabe singer with an unhealthy relationship with his JBL speaker kinda voice. His speaking volume somehow has only one setting: MAXIMUM. Also blessed with deep Bible knowledge.',
    birthday: 'June 26',
    photo: 'teshu.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Being loud', 'Singing','Bible knowledge'],
    //categories: ['Everyone', 'Bible Study', 'The Funny Ones', 'The Chaos Department 😂']
  },
  {
    id: 'yabu',
    realName: 'Yeabsira',
    nickname: 'Yabu',
    role: 'Brother',
    description: 'Introverted but genuinely such a gentleman.',
    birthday: 'February 1',
    photo: 'yabu.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Quietness', 'Respect', 'Gentleman behavior'],
    //categories: ['Everyone', 'The Quiet Ones']
  },
  {
    id: 'dagi',
    realName: 'Dagim',
    nickname: 'Dagi',
    role: 'Brother',
    description: 'The gym rat, knows ball, is humorous, and can communicate with practically anyone.',
    birthday: 'June 9',
    photo: 'dagi.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Gym', 'collistion with a car', 'Humor', 'Communication'],
   // categories: ['Everyone', 'The Funny Ones']
  },
  {
    id: 'yosi',
    realName: 'Yosef',
    nickname: 'Yossi',
    role: 'Brother',
    description: 'The Albert Einstein of the family. Extremely intelligent and has blessed the family\'s soul with his Bible knowledge.',
    birthday: 'June 5',
    photo: 'Yosii.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Intelligence', 'Bible knowledge'],
   // categories: ['Everyone', 'Bible Study']
  },
  {
    id: 'yona',
    realName: 'Yonatan',
    nickname: 'Yona',
    role: 'Brother',
    description: 'Loud, extroverted, and possesses a questionable sense of humor. Can somehow turn almost any conversation into a conversation about cars. Another Bible study guy of the family ',
    birthday: 'July 18',
    photo: 'yona.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Cars', 'Apologetics', 'Bible study', 'Loudness', 'Questionable humor'],
   // categories: ['Everyone', 'Bible Study', 'The Funny Ones', 'The Chaos Department 😂']
  },
  {
    id: 'sami',
    realName: 'Samuel',
    nickname: 'Sami eng',
    role: 'Brother',
    description: 'Cool, gentle, understanding, and another Bible study warrior of the family.',
    birthday: 'August 6',
    photo: 'sami eng.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Being calm', 'Understanding', 'Spiritually grounded'],
    //categories: ['Everyone', 'Bible Study', 'The Quiet Ones']
  },
  {
    id: 'oli',
    realName: 'Oluma',
    nickname: 'Oli',
    role: 'Brother',
    description: 'Loved by everyone. Basically everyone\'s favorite, like the last child in the family. A caring and gentle soul who has blessed the family with his Bible knowledge and ideas that can make you stop and reconsider your entire existence.',
    birthday: 'October 29',
    photo: 'oli.jpg',
    favoriteVerse: 'Not added yet',
    knownFor: ['Gentleness', 'Bible knowledge', 'Deep ideas', 'Being everyone\'s favorite'],
    //categories: ['Everyone', 'Bible Study', 'The Quiet Ones']
  }
];

export const MEMORIES_DATA: Memory[] = [
  {
    id: '1',
    title: 'The first day',
    date: 'Editable Date',
    location: 'Nazreth Emmanuel church',
    caption: 'When we first met eachother as a family. Teshe and yona are talking like they know each other for years.Playing mafia and civil together for the first time',
    image: 'Firstday.jpg',
    category: 'Group',
    taggedMembers: ['Everyone']
  },
  {
    id: '2',
    title: 'Freedom up and maturity nowhere to be seen',
    date: 'Editable Date',
    location: 'ASTU dubai',
    caption: 'The moment we all forgot that we are matured and started acting like kids.',
    image: 'fam.jpg',
    category: 'crazy night',
    taggedMembers: ['Everyone']
  },
  {
    id: '3',
    title: 'The christmas feast',
    date: 'Editable Date',
    location: 'Bekas Cafe',
    caption: 'The ones who were in campus spending christmass together.',
    image: 'christmass.jpg',
    category: 'Holiday',
    taggedMembers: ['Everyone']
  },
  {
    id: '4',
    title: 'Football Memories',
    date: 'Editable Date',
    location: 'Kereyu field',
    caption: 'The boys having uncoordinated play and losing by a diabolical result gap',
    image: 'Football.jpg',
    category: 'Game',
    taggedMembers: ['Everyone']
  },
  {
    id: '5',
    title: 'dress day',
    date: 'Editable Date',
    location: 'ASTU Females lib',
    caption: 'The day our girls trying to act like GIRLS😁 ',
    image: 'dress.jpg',
    category: 'Girls',
    taggedMembers: ['Everyone']
  },
{
    id: '6',
    title: 'Mini-mission',
    date: 'Editable Date',
    location: 'Adama streets',
    caption: 'Serving the lord as a family on the mini mission ',
    image: 'Mini.jpg',
    category: 'Mission',
    taggedMembers: ['Everyone']
  },
  {
    id: '7',
    title: 'The last day',
    date: 'Editable Date',
    location: 'ASTU',
    caption: 'The day that we concluded the year! ',
    image: 'Last.jpg',
    category: 'Concluded',
    taggedMembers: ['Everyone']
  },
];

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: '1',
    date: 'Semester 1',
    title: 'First Meetings at Fellowship',
    subtitle: 'From Strangers to Familiar Faces',
    description: 'We gathered as students attending ASTU fellowship. Unsure of what lay ahead, but drawn together by a shared faith.',
    tag: 'Beginning'
  },
  {
    id: '2',
    date: 'Mid Semester',
    title: 'The Bible Study Spark',
    subtitle: 'Diving Deep Into Scripture',
    description: 'Our weekly Bible studies evolved from simple readings into profound, life-altering conversations.',
    tag: 'Spiritual Growth'
  },
  {
    id: '3',
    date: 'Exam Season',
    title: 'Calculus, Arch lab & Late Nights',
    subtitle: 'Surviving Academic Chaos Together',
    description: 'Some of us solving calculus, some of us wondering why we are here in the first place',
    tag: 'Memories'
  },
  {
    id: '4',
    date: 'Present Day',
    title: 'One Family in Christ',
    subtitle: 'A Bond That Lasts Forever',
    description: 'We came to ASTU for degrees, but Christ gave us a family that will last a lifetime.',
    tag: 'Forever'
  },
];

// ==========================================
// 3. REUSABLE ATOMIC & UI COMPONENTS
// ==========================================

export const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
}> = ({ title, subtitle, badge, centered = true }) => (
  <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    {badge && (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-3">
        <Sparkles className="w-3 py-3 h-3" />
        {badge}
      </span>
    )}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

// ==========================================
// 4. NAVIGATION BAR
// ==========================================

export const Navbar: React.FC<{
  activeSection: string;
  setActiveSection: (sec: string) => void;
  isDark: boolean;
  setIsDark: (val: boolean) => void;
}> = ({ activeSection, setActiveSection, isDark, setIsDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'family', label: 'The Family' },
    { id: 'memories', label: 'Memories' },
    { id: 'birthdays', label: 'Birthdays' },
    { id: 'about', label: 'About Us' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-amber-50/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-amber-900/5 dark:border-slate-800' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
              <Cross className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-amber-50 block leading-tight">
                ASTU<span className="text-amber-600 dark:text-amber-400"> FELLOWSHIP</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold block">
                Family Yearbook
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-amber-900/5 dark:bg-slate-900/60 p-1.5 rounded-full border border-amber-900/10 dark:border-slate-800 backdrop-blur-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-full bg-amber-900/5 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-amber-900/10 dark:hover:bg-slate-800 border border-amber-900/10 dark:border-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-xl bg-amber-900/5 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-amber-900/10 dark:border-slate-800"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-amber-50/95 dark:bg-slate-950/95 border-b border-amber-900/10 dark:border-slate-800 px-4 pt-2 pb-6 space-y-2 backdrop-blur-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-amber-900/5 dark:hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

// ==========================================
// 5. HERO SECTION
// ==========================================

export const Hero: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-400/20 to-orange-500/10 dark:from-amber-600/10 dark:to-orange-600/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-300/20 dark:bg-amber-900/10 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Modern Symbol Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <Cross className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>ASTU Christian Fellowship Family</span>
        </div>

        {/* Main Title */}
       {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-slate-50 mb-6 leading-tight flex flex-col items-center">
          THE FELLOWSHIP
         <RotatingText
  texts={['FAMILY', 'COMMUNITY', 'GENERATION', 'HOUSEHOLD']}
  splitBy="words"
  staggerDuration={0}
  rotationInterval={3500}
  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
  mainClassName="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 dark:from-amber-400 dark:via-orange-400 dark:to-amber-500 bg-clip-text text-transparent overflow-hidden py-1 transform-gpu"
  splitLevelClassName="overflow-hidden"
  initial={{ y: '100%', opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: '-100%', opacity: 0 }}
/>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl font-semibold text-amber-700 dark:text-amber-400 mb-6 tracking-wide">
          Different personalities. One family. One Christ.
        </p>

        {/* Short Description */}
      <ScrollReveal
  containerClassName="max-w-3xl mx-auto text-center"
  textClassName="text-slate-300 font-normal !text-base sm:!text-lg leading-relaxed"
  baseOpacity={0.15}
  enableBlur={true}
  blurStrength={3}
>
  These are the people who turned a fellowship into a family. The laughs, the Bible studies, the advice, the arguments, the inside jokes, the questionable humor, and the memories that made our time at ASTU unforgettable.
</ScrollReveal>

        {/* Animated Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
       <StarBorder
  as="button"
  onClick={onExplore}
  className="group cursor-pointer shadow-lg shadow-orange-600/25 hover:shadow-orange-600/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
  color="#ffffff"
  speed="5s"
  thickness={2}
  backgroundColor="#ea580c"
  textColor="#ffffff"
  borderColor="transparent"
>
  <span className="flex items-center gap-2 text-base font-bold">
    Meet the Family
    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </span>
</StarBorder>
        </div>

        {/* Emotional Quote Badge */}
        <div className="inline-block p-4 rounded-2xl bg-amber-900/5 dark:bg-slate-900/80 border border-amber-900/10 dark:border-slate-800 max-w-md mx-auto">
          <p className="text-sm italic font-medium text-slate-700 dark:text-slate-300">
            &ldquo;We didn&apos;t just meet at fellowship. We became family.&rdquo;
          </p>
        </div>

        {/* Cinematic Hero Image Layout */}
        <div className="mt-14 relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-950/10 dark:border-slate-800 bg-slate-900">
          <img
            src="fam.jpg"
            alt="ASTU Fellowship Family Group"
            className="w-full h-[350px] sm:h-[480px] object-cover opacity-90 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6 sm:p-10">
            <div className="text-left text-white">
              <span className="px-3 py-1 rounded-md bg-amber-600/80 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider mb-2 inline-block">
                ASTU Campus Memories
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">Forever Bound in Faith & Friendship</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 6. FAMILY PROFILE MODAL
// ==========================================

export const FamilyProfileModal: React.FC<{
  member: FamilyMember | null;
  onClose: () => void;
}> = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-amber-50 dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-amber-900/10 dark:border-slate-800 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Photo */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
          <img
            src={member.photo}
            alt={member.nickname}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-50 dark:from-slate-900 via-slate-900/30 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold uppercase tracking-wider mb-2 inline-block shadow-sm">
              {member.role}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {member.nickname}
            </h2>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Real Name: {member.realName}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Personality Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">
              Personality & Vibe
            </h4>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed bg-amber-900/5 dark:bg-slate-800/50 p-4 rounded-2xl border border-amber-900/5 dark:border-slate-800">
              {member.description}
            </p>
          </div>

          {/* Known For Badges */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">
              Known For
            </h4>
            <div className="flex flex-wrap gap-2">
              {member.knownFor.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/10 dark:bg-amber-400/10 text-amber-800 dark:text-amber-300 border border-amber-500/20"
                >
                  ✨ {item}
                </span>
              ))}
            </div>
          </div>

          {/* Grid Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-amber-900/5 dark:bg-slate-800/40 border border-amber-900/5 dark:border-slate-800 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Birthday</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {member.birthday || 'Not added yet'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-900/5 dark:bg-slate-800/40 border border-amber-900/5 dark:border-slate-800 flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Favorite Verse</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {member.favoriteVerse || 'Not added yet'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 7. FAMILY MEMBER CARD
// ==========================================

export const FamilyCard: React.FC<{
  member: FamilyMember;
  onClick: () => void;
}> = ({ member, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-3xl bg-amber-100/50 dark:bg-slate-900/80 border border-amber-900/10 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Photo Section */}
        <div className="relative aspect-square w-full overflow-hidden bg-slate-950">
          <img
            src={member.photo}
            alt={member.nickname}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
          
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/90 backdrop-blur-sm text-white shadow-sm">
              {member.role}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="text-xl font-black leading-tight tracking-tight">
              {member.nickname}
            </h3>
            <p className="text-xs font-medium text-amber-200/90">
              {member.realName !== 'Not added yet' ? member.realName : ''}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
            {member.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {member.knownFor.slice(0, 3).map((item, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/15"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pb-4 pt-2 border-t border-amber-900/5 dark:border-slate-800/60 flex items-center justify-between text-xs font-medium text-amber-700 dark:text-amber-400">
        <span>View Profile</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};

// ==========================================
// 8. FAMILY GRID SECTION (WITH SEARCH & FILTERS)
// ==========================================

export const FamilyGrid: React.FC<{
  members: FamilyMember[];
  onSelectMember: (m: FamilyMember) => void;
}> = ({ members, onSelectMember }) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('Everyone');

  
  const filteredMembers = useMemo(() => {
  return members.filter((member) => {
    return (
      member.nickname.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase()) ||
      member.description.toLowerCase().includes(search.toLowerCase()) ||
      member.knownFor.some((k) => k.toLowerCase().includes(search.toLowerCase()))
    );
  });
}, [members, search]);

  return (
    <section id="family" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        badge="Family Directory"
        title="Meet The Fellowship Family"
        subtitle="Each personality brought a unique flavor, spiritual strength, and unforgettable energy to our ASTU home."
      />

      {/* Search & Category Filter Controls */}
      <div className="space-y-6 mb-12">
        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by nickname, role, or trait..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-amber-100/60 dark:bg-slate-900 border border-amber-900/10 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-sm transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

       
      {/* Grid Display */}
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <FamilyCard
              key={member.id}
              member={member}
              onClick={() => onSelectMember(member)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-amber-900/5 dark:bg-slate-900/40 rounded-3xl border border-amber-900/10 dark:border-slate-800">
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            No family members match your current filter or search criteria.
          </p>
        </div>
      )}
      </div>
    </section>
  );
};

// ==========================================
// 9. BIRTHDAY SECTION
// ==========================================

export const BirthdaySection: React.FC<{ members: FamilyMember[] }> = ({ members }) => {
  const membersWithBirthdays = useMemo(() => {
    return members.filter((m) => m.birthday && m.birthday !== 'Not added yet');
  }, [members]);

  return (
    <section id="birthdays" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeader
        badge="Celebrations"
        title="Upcoming Birthdays"
        subtitle="Celebrating another year of God's faithfulness in the lives of our fellowship family."
      />

      {membersWithBirthdays.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {membersWithBirthdays.map((member) => (
            <div
              key={member.id}
              className="p-6 rounded-3xl bg-amber-100/50 dark:bg-slate-900/80 border border-amber-900/10 dark:border-slate-800 flex items-center gap-5 shadow-sm"
            >
              <img
                src={member.photo}
                alt={member.nickname}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-500/30"
              />
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400">
                  {member.role}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {member.nickname}
                </h3>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  {member.birthday}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-10 rounded-3xl bg-amber-900/5 dark:bg-slate-900/40 border border-amber-900/10 dark:border-slate-800 text-center max-w-xl mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
            <Calendar className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Birthdays Added Yet</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Actual birthday dates will be populated here chronologically once updated in the system data.
          </p>
        </div>
      )}
    </section>
  );
};

// ==========================================
// 10. MEMORIES & GALLERY SECTION
// ==========================================

export const MemoryGallery: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <section id="memories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        badge="Photo Gallery"
        title="Fellowship Memories"
        subtitle="Unfiltered moments, late-night studies, and unforgettable fellowship times."
      />

      {/* Masonry-Style Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MEMORIES_DATA.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedMemory(item)}
            className="group cursor-pointer rounded-3xl overflow-hidden bg-slate-900 border border-amber-900/10 dark:border-slate-800 relative shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-[4/5] w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 mb-1">
                {item.category} • {item.location}
              </span>
              <h3 className="text-lg font-bold leading-snug mb-1">{item.title}</h3>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedMemory && (
        <div 
          onClick={() => setSelectedMemory(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 text-white shadow-2xl"
          >
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-900"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedMemory.image}
              alt={selectedMemory.title}
              className="w-full h-[380px] object-cover"
            />
            <div className="p-6 space-y-2">
              <div className="flex items-center justify-between text-xs text-amber-400 font-semibold uppercase">
                <span>{selectedMemory.category}</span>
                <span>{selectedMemory.location}</span>
              </div>
              <h3 className="text-2xl font-bold">{selectedMemory.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{selectedMemory.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// ==========================================
// 11. TIMELINE SECTION
// ==========================================

export const Timeline: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <SectionHeader
        badge="Our Journey"
        title="How We Became Family"
        subtitle="A look back at the key chapters of our shared time at ASTU."
      />

      <div className="relative border-l-2 border-amber-500/30 dark:border-amber-400/20 ml-4 sm:ml-32 space-y-12">
        {TIMELINE_DATA.map((event) => (
          <div key={event.id} className="relative pl-6 sm:pl-10">
            {/* Circle Node */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-amber-100 dark:ring-slate-900" />
            
            {/* Floating Date Header for Large Screens */}
            <div className="sm:absolute sm:-left-36 sm:top-1 sm:text-right w-28 mb-2 sm:mb-0">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {event.date}
              </span>
            </div>

            {/* Card Content */}
            <div className="p-6 rounded-3xl bg-amber-100/50 dark:bg-slate-900/80 border border-amber-900/10 dark:border-slate-800 space-y-2 shadow-sm">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                {event.tag}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{event.title}</h3>
              <h4 className="text-xs font-semibold text-amber-700 dark:text-amber-400">{event.subtitle}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ==========================================
// 12. ABOUT & CHRIST-CENTERED SECTION
// ==========================================

export const AboutFamily: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      {/* Heartfelt About Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-amber-100/60 dark:bg-slate-900/90 border border-amber-900/10 dark:border-slate-800 shadow-xl space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
          <Heart className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          More Than Just A List of Names
        </h2>

        <div className="space-y-4 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
          <p>
            This yearbook exists because some people enter your life as strangers and somehow become family.
          </p>
          <p>
            We studied together, laughed together, prayed together, argued, joked, encouraged one another, learned Scripture together, and grew together.
          </p>
          <p className="italic text-amber-800 dark:text-amber-300 bg-amber-500/10 p-4 rounded-2xl border-l-4 border-amber-500">
            &ldquo;Everyone here is different. Some are loud. Some are quiet. Some talk too much. Some barely talk. Some solve calculus. Some make you question their intelligence. Some bring jokes. Some bring wisdom. Some bring chaos. But somehow, all of them became part of the same family.&rdquo;
          </p>
          <p className="font-semibold text-slate-900 dark:text-white">
            And at the center of it all is Christ.
          </p>
        </div>
      </div>

      {/* Christ-Centered Anchor */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10 pointer-events-none">
          <Cross className="w-96 h-96" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            Our Foundation
          </span>
          <h2 className="text-3xl sm:text-5xl font-black">ONE FAMILY. ONE LORD.</h2>
          <p className="text-amber-100 text-base sm:text-lg leading-relaxed">
            Our bond isn&apos;t just rooted in shared classes or dorm rooms—it is grounded in the unconditional love of Jesus Christ. Through every season at ASTU, His grace was the glue that kept us connected and made our fellowship a true spiritual home.
          </p>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 13. FOOTER
// ==========================================

export const Footer: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-amber-100/80 dark:bg-slate-950 border-t border-amber-900/10 dark:border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left space-y-1">
          <h3 className="font-black text-lg text-slate-900 dark:text-white">
            ASTU Fellowship Family
          </h3>
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
            Different personalities. One family. One Christ.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-400">
          {['home', 'family', 'memories', 'birthdays', 'about'].map((sec) => (
            <button
              key={sec}
              onClick={() => onNavigate(sec)}
              className="hover:text-amber-600 dark:hover:text-amber-400 capitalize transition-colors"
            >
              {sec}
            </button>
          ))}
        </div>

        <div className="text-center md:text-right text-xs text-slate-500 dark:text-slate-500">
          <p>© Made to remember the people who made the journey worth remembering.</p>
        </div>
      </div>
    </footer>
  );
};

// ==========================================
// 14. MAIN ROOT APPLICATION COMPONENT
// ==========================================

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  // Sync theme changes with DOM
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 selection:bg-amber-500 selection:text-white">
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <Hero3D />
      </div>
      {/* Sticky Glassmorphic Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* Hero Section */}
      <Hero onExplore={() => handleNavigate('family')} />

      {/* Main Family Grid */}
      <FamilyGrid
        members={FAMILY_MEMBERS_DATA}
        onSelectMember={(m) => setSelectedMember(m)}
      />

      {/* Photo Gallery */}
      <MemoryGallery />

      {/* Timeline */}
      <Timeline />

      {/* Birthdays */}
      <BirthdaySection members={FAMILY_MEMBERS_DATA} />

      {/* About Section */}
      <AboutFamily />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Modal */}
      <FamilyProfileModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}
