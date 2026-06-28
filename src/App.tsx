/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Smile,
  Compass,
  BookOpen,
  Sun,
  X,
  Check,
  Globe,
  Award,
  Heart,
  FileText,
  Mail,
  Instagram,
  ArrowUpRight,
  Coffee,
  Activity,
  Layers,
  MessageCircle,
  AlertCircle
} from 'lucide-react';

// --- DATA STRUCTURES ---

interface CountryPartner {
  code: string;
  name: string;
  flag: string;
  orgName: string;
  spotsTotal: number;
  spotsAvailable: number;
  color: string;
}

interface ScheduleDay {
  day: number;
  title: string;
  theme: string;
  description: string;
  activities: string[];
  icon: string;
  color: string;
}

interface FaqItem {
  question: string;
  answer: string;
  category: 'General' | 'Financial' | 'Wellbeing';
}

const PARTNER_COUNTRIES: CountryPartner[] = [
  { code: 'ES', name: 'Spain (Host)', flag: '🇪🇸', orgName: 'Asociación Juventud Vital', spotsTotal: 6, spotsAvailable: 2, color: '#10B981' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', orgName: 'Mentis Giovani ETS', spotsTotal: 6, spotsAvailable: 1, color: '#14B8A6' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', orgName: 'Jugend & Seele e.V.', spotsTotal: 6, spotsAvailable: 3, color: '#84CC16' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', orgName: 'Fundacja Otwarta Głowa', spotsTotal: 6, spotsAvailable: 2, color: '#22C55E' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', orgName: 'Hellenic Youth Harmony', spotsTotal: 6, spotsAvailable: 4, color: '#059669' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', orgName: 'Caminhos Mente Sã', spotsTotal: 6, spotsAvailable: 1, color: '#0D9488' },
];

const SCHEDULE_DAYS: ScheduleDay[] = [
  {
    day: 1,
    title: 'Arrival & Safe Space',
    theme: 'Connecting the Dots',
    description: 'Arrivals at Valencia hostel, informal welcome dinner, name games, and co-creating our group confidentiality & safe space agreements.',
    activities: ['Hostel Check-in & Welcome Packs', 'Icebreaker Tapas Dinner', 'Group Agreement & Secret Friend Draw'],
    icon: 'smile',
    color: '#10B981'
  },
  {
    day: 2,
    title: 'Unmasking Stigmas',
    theme: 'Mental Health Across Europe',
    description: 'Exploring cultural differences in mental health perception. Breaking down taboos around therapy, anxiety, and depression.',
    activities: ['Intercultural Mental Health Mapping', 'The "Masks We Wear" Theater Workshop', 'Evening Reflection Pods'],
    icon: 'globe',
    color: '#14B8A6'
  },
  {
    day: 3,
    title: 'Somatic & Nervous System',
    theme: 'Body-Mind Connection',
    description: 'Practical workshops led by somatic therapists focusing on breathwork, vagus nerve stimulation, and recognizing burnout warning signs.',
    activities: ['Morning Beach Yoga & Breathwork', 'Understanding Fight/Flight/Freeze/Fawn', 'Somatic Shake-out Session'],
    icon: 'activity',
    color: '#84CC16'
  },
  {
    day: 4,
    title: 'Creative Art Therapy',
    theme: 'Externalizing the Internal',
    description: 'Using non-verbal creative mediums to express complex emotions. No artistic skills required—just willingness to experiment.',
    activities: ['Clay Emotion Sculpting', 'Collaborative Mural Painting', 'Acoustic Campfire Songwriting'],
    icon: 'sparkles',
    color: '#22C55E'
  },
  {
    day: 5,
    title: 'Nature Mindfulness',
    theme: 'Albufera Digital Detox',
    description: 'A full day excursion to Albufera National Park. Offline immersion, silent meditative walking, and eco-journaling.',
    activities: ['Boat Ride on Albufera Lagoon', 'Solo Forest Sit & Guided Journaling', 'Sunset Gratitude Circle'],
    icon: 'sun',
    color: '#059669'
  },
  {
    day: 6,
    title: 'Peer First-Aid & Empathy',
    theme: 'Supporting Without Absorbing',
    description: 'Learning active listening techniques, setting healthy emotional boundaries, and recognizing when professional intervention is necessary.',
    activities: ['Active Listening Triads Workshop', 'Boundary Setting Roleplays', 'Self-Care Toolkit Creation'],
    icon: 'heart',
    color: '#0D9488'
  },
  {
    day: 7,
    title: 'Future Impact & Gala',
    theme: 'Spreading the Spark',
    description: 'Designing local follow-up initiatives in national teams. Youthpass self-assessment certification and our celebratory farewell dinner.',
    activities: ['Local Action Plan Hackathon', 'Youthpass Competency Mapping', 'Eurovision Farewell Talent Show'],
    icon: 'award',
    color: '#65A30D'
  },
  {
    day: 8,
    title: 'Closing & Departures',
    theme: 'See You Somewhere in Europe',
    description: 'Final emotional check-outs, exchanging contact journals, shuttle departures to Valencia Airport and Train Station.',
    activities: ['The String Web Closing Ceremony', 'Packing & Room Check-outs', 'Airport Shuttles Depart'],
    icon: 'compass',
    color: '#15803D'
  }
];

const FAQ_LIST: FaqItem[] = [
  {
    category: 'Financial',
    question: 'Is this exchange truly 100% free?',
    answer: 'Yes! Funded by the European Union Erasmus+ programme. Your accommodation (cozy 2-3 person rooms), 3 daily healthy meals, coffee breaks, and all workshop materials are fully covered. Travel costs are reimbursed after the project up to the official EU distance band limit (e.g., €275 for most central European flights).'
  },
  {
    category: 'General',
    question: 'Do I need perfect English or psychology degrees?',
    answer: 'Absolutely not! This is a Youth Exchange, not an academic conference. Basic conversational English is enough—we translate and support each other. You only need personal interest in mental health wellbeing and motivation to participate actively.'
  },
  {
    category: 'Wellbeing',
    question: 'What if I feel emotionally overwhelmed during sessions?',
    answer: 'Your psychological safety is our #1 priority. All workshops operate under "Challenge by Choice"—you never have to share anything you are uncomfortable with. We have a designated silent "Sensory Recovery Room" available 24/7, and two certified mental health first-aiders on staff.'
  },
  {
    category: 'General',
    question: 'What is the age limit and who can apply?',
    answer: 'Applicants must be between 18 and 30 years old on the start date of the project (group leaders can be 18+ with no upper limit). You must legally reside in one of our 6 partner countries: Spain, Italy, Germany, Poland, Greece, or Portugal.'
  },
  {
    category: 'Financial',
    question: 'How and when do I get my travel money back?',
    answer: 'You purchase your economy flight/train tickets upfront. During the project, you hand in your original boarding passes and invoices. Within 4 weeks after completion and submitting your online EU survey, our host association transfers the exact reimbursement to your bank account.'
  },
  {
    category: 'Wellbeing',
    question: 'Can dietary restrictions (vegan, gluten-free, halal) be accommodated?',
    answer: 'Yes! Our catering team specializes in youth groups. When you get accepted, you will fill out a detailed medical & dietary form so all meals match your exact nutritional requirements.'
  }
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'overview' | 'workshops' | 'schedule' | 'eligibility' | 'faq'>('overview');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [faqCategory, setFaqCategory] = useState<string>('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Eligibility Quiz State
  const [quizAge, setQuizAge] = useState<boolean | null>(null);
  const [quizCountry, setQuizCountry] = useState<string>('');
  const [quizCommitment, setQuizCommitment] = useState<boolean | null>(null);

  // Modal State
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: 'ES',
    age: '',
    motivation: '',
    specialNeeds: ''
  });

  // Helper render for schedule icons
  const renderScheduleIcon = (type: string) => {
    switch(type) {
      case 'smile': return <Smile className="w-6 h-6 text-white" />;
      case 'globe': return <Globe className="w-6 h-6 text-white" />;
      case 'activity': return <Activity className="w-6 h-6 text-[#064E3B]" />;
      case 'sparkles': return <Sparkles className="w-6 h-6 text-white" />;
      case 'sun': return <Sun className="w-6 h-6 text-white" />;
      case 'heart': return <Heart className="w-6 h-6 text-white" />;
      case 'award': return <Award className="w-6 h-6 text-white" />;
      default: return <Compass className="w-6 h-6 text-white" />;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.motivation) {
      return;
    }
    setFormSubmitted(true);
  };

  const filteredFaqs = faqCategory === 'All' 
    ? FAQ_LIST 
    : FAQ_LIST.filter(item => item.category === faqCategory);

  const activeScheduleDay = SCHEDULE_DAYS.find(d => d.day === selectedDay) || SCHEDULE_DAYS[0];

  return (
    <div className="min-h-screen bg-[#F0FDF4] text-[#064E3B] font-sans selection:bg-[#10B981] selection:text-white flex flex-col">
      
      {/* --- TOP BANNER --- */}
      <div className="bg-[#D9F99D] text-[#064E3B] px-4 py-2 text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b border-[#064E3B]/10 shadow-sm">
        <Sparkles className="w-4 h-4 text-[#10B981] animate-pulse" />
        <span>Official Call for Participants: Erasmus+ Youth Exchange 2026 • Fully Funded by the European Union</span>
      </div>

      {/* --- TOP NAVIGATION --- */}
      <header className="sticky top-0 z-40 bg-[#F0FDF4]/90 backdrop-blur-md border-b border-gray-200/50 transition-all">
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-5">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-[#10B981] rounded-full flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              E+
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-[#064E3B] tracking-tight block leading-none">BEYOND THE SMILE</span>
              <span className="text-[10px] font-bold text-[#14B8A6] uppercase tracking-widest block mt-1">Youth Exchange</span>
            </div>
          </a>

          <div className="hidden lg:flex gap-8 items-center text-[#064E3B] font-bold uppercase text-xs tracking-wider">
            <a 
              href="#program" 
              onClick={() => setActiveTab('overview')}
              className={`hover:text-[#10B981] transition-colors py-1 relative ${activeTab === 'overview' ? 'text-[#10B981] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#10B981]' : ''}`}
            >
              The Program
            </a>
            <a 
              href="#workshops" 
              onClick={() => setActiveTab('workshops')}
              className={`hover:text-[#10B981] transition-colors py-1 relative ${activeTab === 'workshops' ? 'text-[#10B981] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#10B981]' : ''}`}
            >
              Pillars
            </a>
            <a 
              href="#schedule" 
              onClick={() => setActiveTab('schedule')}
              className={`hover:text-[#10B981] transition-colors py-1 relative ${activeTab === 'schedule' ? 'text-[#10B981] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#10B981]' : ''}`}
            >
              Schedule
            </a>
            <a 
              href="#eligibility" 
              onClick={() => setActiveTab('eligibility')}
              className={`hover:text-[#10B981] transition-colors py-1 relative ${activeTab === 'eligibility' ? 'text-[#10B981] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#10B981]' : ''}`}
            >
              Eligibility
            </a>
            <a 
              href="#faq" 
              onClick={() => setActiveTab('faq')}
              className={`hover:text-[#10B981] transition-colors py-1 relative ${activeTab === 'faq' ? 'text-[#10B981] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#10B981]' : ''}`}
            >
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              id="header-apply-btn"
              onClick={() => { setIsApplyModalOpen(true); setFormSubmitted(false); }}
              className="bg-[#10B981] hover:bg-[#059669] text-white font-bold px-7 py-2.5 rounded-full border-b-4 border-[#047857] active:border-b-0 active:translate-y-1 transition-all shadow-md text-sm uppercase tracking-wide cursor-pointer flex items-center gap-2"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </nav>
      </header>

      {/* --- HERO SECTION --- */}
      <section id="program" className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-16 md:py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="w-full lg:w-3/5">
          <div className="inline-flex items-center gap-2 bg-[#D9F99D] text-[#064E3B] px-4 py-1.5 rounded-full font-bold text-xs uppercase mb-6 shadow-sm border border-[#064E3B]/5">
            <Globe className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Erasmus+ Youth Exchange 2026 • Valencia, Spain</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#064E3B] leading-[0.92] tracking-tight mb-8">
            Find Your <br/> 
            <span className="text-[#10B981] underline decoration-[#D9F99D] decoration-wavy decoration-4">Inner Spark.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-700 font-medium mb-10 max-w-xl leading-relaxed">
            Join 36 young change-makers from 6 European nations for 8 transformative days of creative workshops, somatic movement, and honest conversations breaking youth mental health stigmas.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white p-5 rounded-3xl shadow-sm border-2 border-gray-100 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <MapPin className="w-4 h-4 text-[#10B981]" />
                <span className="text-xs uppercase font-extrabold tracking-wider">Location</span>
              </div>
              <p className="text-base font-black text-[#064E3B]">Valencia, Spain</p>
              <span className="text-[11px] text-gray-500 mt-0.5">Eco-Hostel by Beach</span>
            </div>

            <div className="bg-white p-5 rounded-3xl shadow-sm border-2 border-gray-100 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Calendar className="w-4 h-4 text-[#14B8A6]" />
                <span className="text-xs uppercase font-extrabold tracking-wider">Project Dates</span>
              </div>
              <p className="text-base font-black text-[#064E3B]">Nov 10 — 18, 2025</p>
              <span className="text-[11px] text-[#14B8A6] font-bold">8 Full Program Days</span>
            </div>

            <div className="bg-white p-5 rounded-3xl shadow-sm border-2 border-gray-100 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Users className="w-4 h-4 text-[#84CC16]" />
                <span className="text-xs uppercase font-extrabold tracking-wider">Group Size</span>
              </div>
              <p className="text-base font-black text-[#064E3B]">36 Participants</p>
              <span className="text-[11px] text-gray-500 mt-0.5">Ages 18 — 30</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button 
              onClick={() => { setIsApplyModalOpen(true); setFormSubmitted(false); }}
              className="bg-[#10B981] hover:bg-[#059669] text-white font-black px-8 py-4 rounded-full border-b-4 border-[#047857] active:border-b-0 active:translate-y-1 transition-all shadow-lg text-base uppercase tracking-wider cursor-pointer flex items-center gap-3"
            >
              <span>Apply For Your Spot</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <a 
              href="#eligibility" 
              className="text-[#064E3B] font-bold text-sm hover:text-[#14B8A6] underline decoration-2 underline-offset-4 transition-colors flex items-center gap-1.5"
            >
              <span>Check Country Quotas</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* --- VIBRANT ROTATED VISUAL ELEMENT (IN GREEN SHADES) --- */}
        <div className="w-full lg:w-2/5 h-[420px] sm:h-[460px] relative px-4">
          {/* Back rotated layer */}
          <div className="absolute inset-4 bg-[#D9F99D] rounded-[50px] sm:rounded-[60px] rotate-4 shadow-md transition-transform hover:rotate-6"></div>
          {/* Middle rotated layer */}
          <div className="absolute inset-4 bg-[#34D399] rounded-[50px] sm:rounded-[60px] -rotate-2 opacity-30 shadow-md"></div>
          {/* Front rotated main card */}
          <div className="absolute inset-4 bg-[#10B981] rounded-[50px] sm:rounded-[60px] -rotate-3 flex flex-col items-center justify-center p-8 sm:p-10 text-center text-white shadow-xl border-4 border-white/20 transition-transform hover:-rotate-1">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/30">
              <ShieldCheck className="w-14 h-14 text-white animate-bounce" />
            </div>
            <span className="bg-white text-[#064E3B] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-md">
              100% EU Grant Funded
            </span>
            <h3 className="text-3xl sm:text-4xl font-black mb-3 leading-tight tracking-tight">Fully Funded Experience</h3>
            <p className="text-base sm:text-lg font-medium text-white/95 leading-relaxed max-w-xs">
              Travel costs, eco-lodge stay, and 3 daily chef-prepared vegan/vegetarian meals are covered by Erasmus+.
            </p>
            <div className="mt-6 flex items-center gap-2 bg-black/20 px-4 py-2 rounded-2xl text-xs font-bold text-white/90">
              <span>🇪🇺 Youth Exchange Action KA152</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE GRID (CORE PILLARS) --- */}
      <section id="workshops" className="bg-white py-16 border-y border-gray-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-4 py-1.5 rounded-full inline-block mb-3">
              Program Architecture
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#064E3B] tracking-tight">
              Four Pillars of <span className="text-[#10B981]">Beyond the Smile.</span>
            </h2>
            <p className="text-gray-600 mt-4 text-base sm:text-lg font-medium">
              We replace boring lectures with experiential learning, somatic movement, and peer dialogue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 01 */}
            <div className="bg-[#10B981]/10 p-7 rounded-[40px] border-2 border-[#10B981] flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-md">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-14 h-14 bg-[#10B981] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md">
                    01
                  </div>
                  <Users className="w-7 h-7 text-[#10B981]" />
                </div>
                <h3 className="text-xl font-black text-[#064E3B] mb-2">Peer Support Pods</h3>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  Build a global family of friends who truly understand your mental health journey. Daily structured check-ins in intimate 6-person home pods.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#10B981]/20 flex items-center gap-1.5 text-xs font-bold text-[#047857]">
                <Check className="w-4 h-4" />
                <span>Judgment-Free Safe Zone</span>
              </div>
            </div>

            {/* Card 02 */}
            <div className="bg-[#14B8A6]/10 p-7 rounded-[40px] border-2 border-[#14B8A6] flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-md">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-14 h-14 bg-[#14B8A6] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md">
                    02
                  </div>
                  <Activity className="w-7 h-7 text-[#14B8A6]" />
                </div>
                <h3 className="text-xl font-black text-[#064E3B] mb-2">Somatic Regulation</h3>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  Learn practical neurobiology tools for stress management. Master breathwork, vagal nerve resets, and recognizing early physical burnout signs.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#14B8A6]/20 flex items-center gap-1.5 text-xs font-bold text-[#0F766E]">
                <Check className="w-4 h-4" />
                <span>Led by Psychologists</span>
              </div>
            </div>

            {/* Card 03 */}
            <div className="bg-[#84CC16]/15 p-7 rounded-[40px] border-2 border-[#84CC16] flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-md">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-14 h-14 bg-[#84CC16] rounded-2xl flex items-center justify-center text-[#064E3B] font-black text-xl shadow-md">
                    03
                  </div>
                  <Sparkles className="w-7 h-7 text-[#65A30D]" />
                </div>
                <h3 className="text-xl font-black text-[#064E3B] mb-2">Creative Flow</h3>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  Externalize inner feelings through collaborative art, improvised theater, songwriting, and clay modeling. No talent needed—pure authentic expression.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#84CC16]/30 flex items-center gap-1.5 text-xs font-bold text-[#4D7C0F]">
                <Check className="w-4 h-4" />
                <span>Non-Verbal Art Therapy</span>
              </div>
            </div>

            {/* Card 04 */}
            <div className="bg-[#22C55E]/10 p-7 rounded-[40px] border-2 border-[#22C55E] flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-md">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-14 h-14 bg-[#22C55E] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md">
                    04
                  </div>
                  <Award className="w-7 h-7 text-[#22C55E]" />
                </div>
                <h3 className="text-xl font-black text-[#064E3B] mb-2">Youthpass Diploma</h3>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  Gain official European Union certification of your interpersonal and resilience competencies. Great booster for CVs, university applications, and jobs.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#22C55E]/20 flex items-center gap-1.5 text-xs font-bold text-[#15803D]">
                <Check className="w-4 h-4" />
                <span>EU Official Document</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE SCHEDULE SECTION --- */}
      <section id="schedule" className="py-20 max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-4 py-1.5 rounded-full inline-block mb-3">
              Day-by-Day Journey
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#064E3B] tracking-tight">
              8 Days of <span className="text-[#10B981]">Transformation.</span>
            </h2>
          </div>
          <p className="text-gray-600 max-w-md text-sm sm:text-base font-medium">
            Click any day below to explore our carefully paced itinerary balancing deep emotional workshops with beach relaxation and social bonding.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
          {SCHEDULE_DAYS.map((item) => {
            const isSelected = selectedDay === item.day;
            return (
              <button
                key={item.day}
                onClick={() => setSelectedDay(item.day)}
                className={`p-4 rounded-3xl font-black text-left transition-all duration-200 cursor-pointer border-2 flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-[#064E3B] text-white border-[#064E3B] shadow-lg scale-105' 
                    : 'bg-white text-[#064E3B] border-gray-200 hover:border-[#10B981]'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-xs uppercase px-2.5 py-0.5 rounded-full font-bold ${isSelected ? 'bg-[#D9F99D] text-[#064E3B]' : 'bg-gray-100 text-gray-500'}`}>
                    Day {item.day}
                  </span>
                </div>
                <span className="text-xs font-bold line-clamp-2 leading-snug">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Day Detail Box */}
        <div className="bg-white rounded-[40px] p-8 sm:p-12 border-4 border-[#064E3B] shadow-xl relative overflow-hidden">
          <div 
            className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-15 -mr-20 -mt-20 blur-2xl pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: activeScheduleDay.color }}
          ></div>

          <div className="relative z-10 flex flex-col lg:flex-row gap-10 justify-between items-start">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md font-black text-xl"
                  style={{ backgroundColor: activeScheduleDay.color }}
                >
                  {renderScheduleIcon(activeScheduleDay.icon)}
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400 block">Focus Theme</span>
                  <span className="text-xl font-extrabold text-[#064E3B]">{activeScheduleDay.theme}</span>
                </div>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-[#064E3B] mb-4">
                Day {activeScheduleDay.day}: {activeScheduleDay.title}
              </h3>
              
              <p className="text-gray-600 text-base sm:text-lg font-medium leading-relaxed mb-8">
                {activeScheduleDay.description}
              </p>

              <div className="bg-[#F0FDF4] p-6 rounded-3xl border border-gray-200">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#10B981] mb-2">
                  <Coffee className="w-4 h-4" />
                  <span>Sensory Balance Note</span>
                </div>
                <p className="text-xs text-gray-600 font-medium">
                  Every afternoon includes a mandatory 2-hour "Siesta & Quiet Integration" window where phones are put away and participants can rest in the hammock garden.
                </p>
              </div>
            </div>

            <div className="lg:w-1/2 w-full bg-[#F0FDF4] p-8 rounded-3xl border-2 border-gray-200/80">
              <h4 className="text-lg font-black text-[#064E3B] mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#14B8A6]" />
                <span>Key Activities & Timetable</span>
              </h4>
              
              <div className="space-y-4">
                {activeScheduleDay.activities.map((act, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-xl bg-[#14B8A6]/15 text-[#14B8A6] font-black text-sm flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </div>
                    <span className="font-bold text-[#064E3B] text-sm sm:text-base">{act}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center text-xs font-bold text-gray-500">
                <span>🕖 Breakfast: 08:30</span>
                <span>🥗 Lunch: 13:30</span>
                <span>🍲 Dinner: 20:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ELIGIBILITY & PARTNER COUNTRIES --- */}
      <section id="eligibility" className="bg-[#D9F99D]/40 py-20 border-y border-[#BBF7D0]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#064E3B] bg-white px-4 py-1.5 rounded-full inline-block mb-3 shadow-sm">
                International Quotas
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-[#064E3B] tracking-tight">
                Who Can Apply?
              </h2>
            </div>
            <p className="text-gray-700 max-w-lg text-sm sm:text-base font-medium leading-relaxed">
              We are selecting exactly <strong>5 participants + 1 team leader</strong> per partner country. Check below to find your national sending organization.
            </p>
          </div>

          {/* Country Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {PARTNER_COUNTRIES.map((c) => (
              <div 
                key={c.code}
                className="bg-white rounded-3xl p-7 border-2 border-gray-200/80 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
              >
                <div 
                  className="absolute top-0 left-0 right-0 h-3"
                  style={{ backgroundColor: c.color }}
                ></div>

                <div className="flex justify-between items-start mt-2 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{c.flag}</span>
                    <div>
                      <h3 className="text-xl font-black text-[#064E3B]">{c.name}</h3>
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Quota: {c.spotsTotal} Spots</span>
                    </div>
                  </div>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${c.spotsAvailable <= 1 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-green-100 text-green-700'}`}>
                    {c.spotsAvailable} Left
                  </span>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
                  <span className="text-[10px] uppercase font-black tracking-wider text-gray-400 block mb-1">Sending Partner Org</span>
                  <span className="text-sm font-bold text-[#064E3B] flex items-center gap-1.5">
                    <BuildingIcon className="w-4 h-4 text-gray-500 shrink-0" />
                    <span>{c.orgName}</span>
                  </span>
                </div>

                <button
                  onClick={() => {
                    setIsApplyModalOpen(true);
                    setFormData(prev => ({ ...prev, country: c.code }));
                  }}
                  className="w-full bg-[#064E3B] hover:bg-[#022C22] text-white font-bold py-3 rounded-2xl text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Apply via {c.code} Team</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Mini Eligibility Quiz */}
          <div className="bg-white rounded-[40px] p-8 sm:p-12 border-2 border-gray-200 shadow-xl max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-[#10B981] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold shadow-md">
                <HelpCircle className="w-7 h-7" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#064E3B]">Quick Eligibility Check</h3>
              <p className="text-gray-500 text-sm mt-1">Answer 3 quick questions to verify your eligibility for Erasmus+ funding</p>
            </div>

            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-[#F0FDF4] p-5 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="font-extrabold text-[#064E3B] text-sm sm:text-base">
                  1. Will you be between 18 and 30 years old on Nov 10, 2025?
                </span>
                <div className="flex gap-2 shrink-0">
                  <button 
                    onClick={() => setQuizAge(true)}
                    className={`px-5 py-2 rounded-full font-bold text-xs uppercase transition-all cursor-pointer ${quizAge === true ? 'bg-[#10B981] text-white shadow' : 'bg-white text-gray-600 border border-gray-200'}`}
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => setQuizAge(false)}
                    className={`px-5 py-2 rounded-full font-bold text-xs uppercase transition-all cursor-pointer ${quizAge === false ? 'bg-[#059669] text-white shadow' : 'bg-white text-gray-600 border border-gray-200'}`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Question 2 */}
              <div className="bg-[#F0FDF4] p-5 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="font-extrabold text-[#064E3B] text-sm sm:text-base">
                  2. Do you legally reside in ES, IT, DE, PL, GR, or PT?
                </span>
                <select 
                  value={quizCountry}
                  onChange={(e) => setQuizCountry(e.target.value)}
                  className="bg-white border border-gray-200 rounded-full px-5 py-2 font-bold text-xs text-[#064E3B] outline-none cursor-pointer shadow-sm"
                >
                  <option value="">Select Country</option>
                  <option value="ES">Spain 🇪🇸</option>
                  <option value="IT">Italy 🇮🇹</option>
                  <option value="DE">Germany 🇩🇪</option>
                  <option value="PL">Poland 🇵🇱</option>
                  <option value="GR">Greece 🇬🇷</option>
                  <option value="PT">Portugal 🇵🇹</option>
                  <option value="OTHER">Other Country</option>
                </select>
              </div>

              {/* Question 3 */}
              <div className="bg-[#F0FDF4] p-5 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="font-extrabold text-[#064E3B] text-sm sm:text-base">
                  3. Are you ready to actively participate and share in sessions?
                </span>
                <div className="flex gap-2 shrink-0">
                  <button 
                    onClick={() => setQuizCommitment(true)}
                    className={`px-5 py-2 rounded-full font-bold text-xs uppercase transition-all cursor-pointer ${quizCommitment === true ? 'bg-[#10B981] text-white shadow' : 'bg-white text-gray-600 border border-gray-200'}`}
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => setQuizCommitment(false)}
                    className={`px-5 py-2 rounded-full font-bold text-xs uppercase transition-all cursor-pointer ${quizCommitment === false ? 'bg-[#059669] text-white shadow' : 'bg-white text-gray-600 border border-gray-200'}`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            {/* Quiz Result Feedback */}
            {quizAge !== null && quizCountry !== '' && quizCommitment !== null && (
              <div className="mt-8 p-6 rounded-3xl text-center animate-fadeIn transition-all">
                {quizAge && quizCountry !== 'OTHER' && quizCommitment ? (
                  <div className="bg-[#10B981]/15 border-2 border-[#10B981] p-6 rounded-3xl">
                    <div className="inline-flex items-center gap-2 text-[#064E3B] font-black text-lg sm:text-xl mb-2">
                      <Sparkles className="w-6 h-6 text-[#10B981]" />
                      <span>Congratulations! You are 100% Eligible!</span>
                    </div>
                    <p className="text-gray-700 text-sm max-w-md mx-auto mb-6 font-medium">
                      Your profile matches the official European Commission criteria. Spots in {quizCountry} are filling up fast.
                    </p>
                    <button
                      onClick={() => {
                        setIsApplyModalOpen(true);
                        setFormData(prev => ({ ...prev, country: quizCountry }));
                      }}
                      className="bg-[#10B981] hover:bg-[#059669] text-white font-black px-8 py-3.5 rounded-full border-b-4 border-[#047857] active:border-b-0 transition-all shadow-md text-sm uppercase tracking-wider cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>Complete Application Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="bg-red-50 border-2 border-red-200 p-6 rounded-3xl text-red-800">
                    <div className="font-black text-lg mb-1 flex items-center justify-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span>Eligibility Notice</span>
                    </div>
                    <p className="text-sm font-medium">
                      {quizCountry === 'OTHER' 
                        ? 'Unfortunately, Erasmus+ funding for this project is restricted to residents of our 6 partner countries.'
                        : !quizAge 
                        ? 'Erasmus+ Youth Exchanges require participants to be aged 18-30. If you are older, check our KA153 Youth Worker training courses!'
                        : 'Active commitment is required for group cohesion. Feel free to reach out to our team if you have concerns!'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-20 max-w-5xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#14B8A6] bg-[#14B8A6]/10 px-4 py-1.5 rounded-full inline-block mb-3">
            Clear Answers
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#064E3B] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mt-3 text-base font-medium">
            Everything you need to know about safety, travel grants, and mental health accommodations.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {['All', 'General', 'Financial', 'Wellbeing'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFaqCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-extrabold uppercase transition-all cursor-pointer ${
                  faqCategory === cat 
                    ? 'bg-[#064E3B] text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl border-2 border-gray-200/80 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-7 py-6 text-left font-black text-lg sm:text-xl text-[#064E3B] flex justify-between items-center gap-4 cursor-pointer hover:bg-gray-50/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#D9F99D] text-[#064E3B] uppercase tracking-wider">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'bg-[#10B981] text-white rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-7 pb-6 pt-2 text-gray-600 font-medium text-base leading-relaxed border-t border-gray-100 bg-[#F0FDF4]/50 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-14 bg-[#10B981] rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h4 className="text-2xl font-black mb-1">Still have questions?</h4>
            <p className="text-white/90 text-sm font-medium">Our coordinator Alessio is answering messages on WhatsApp & Email daily.</p>
          </div>
          <a 
            href="mailto:info@beyondthesmile-exchange.eu"
            className="bg-white text-[#064E3B] hover:bg-[#D9F99D] font-black px-7 py-3 rounded-full text-xs uppercase tracking-wider transition-all shadow shrink-0 flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-[#10B981]" />
            <span>Contact Team</span>
          </a>
        </div>
      </section>

      {/* --- APPLICATION FORM MODAL --- */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-[40px] max-w-2xl w-full p-8 sm:p-10 border-4 border-[#064E3B] shadow-2xl relative my-8">
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-[#10B981] hover:text-white rounded-full flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {formSubmitted ? (
              <div className="text-center py-12 px-4">
                <div className="w-20 h-20 bg-[#10B981] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <span className="bg-[#D9F99D] text-[#064E3B] font-bold text-xs uppercase px-4 py-1 rounded-full mb-3 inline-block">
                  Application Received
                </span>
                <h3 className="text-3xl font-black text-[#064E3B] mb-4">You're On Your Way!</h3>
                <p className="text-gray-600 text-base font-medium max-w-md mx-auto leading-relaxed mb-8">
                  Thank you, <strong>{formData.fullName}</strong>! We have stored your application for the {formData.country} delegation. Our national selection leader will review your motivation and contact you within 5 business days.
                </p>
                <div className="bg-[#F0FDF4] p-6 rounded-3xl border border-gray-200 mb-8 text-left text-xs text-gray-600 space-y-2">
                  <p>📩 <strong>Confirmation sent to:</strong> {formData.email}</p>
                  <p>📅 <strong>Next Step:</strong> Informal 15-minute Zoom chat with team leader</p>
                </div>
                <button
                  onClick={() => setIsApplyModalOpen(false)}
                  className="bg-[#064E3B] hover:bg-[#022C22] text-white font-bold px-8 py-3.5 rounded-full uppercase text-xs tracking-wider transition-colors cursor-pointer"
                >
                  Back to Landing Page
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 bg-[#10B981] text-white rounded-2xl flex items-center justify-center font-black text-lg">
                    E+
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#064E3B]">Participant Application</h3>
                    <p className="text-xs text-gray-500 font-bold">Beyond the Smile Youth Exchange • Nov 10-18, 2025</p>
                  </div>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="Elena García"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-[#F0FDF4] border-2 border-gray-200 focus:border-[#10B981] rounded-2xl px-4 py-3 text-sm font-bold text-[#064E3B] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        required
                        placeholder="elena@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#F0FDF4] border-2 border-gray-200 focus:border-[#10B981] rounded-2xl px-4 py-3 text-sm font-bold text-[#064E3B] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">
                        Sending Country *
                      </label>
                      <select 
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full bg-[#F0FDF4] border-2 border-gray-200 focus:border-[#10B981] rounded-2xl px-4 py-3 text-sm font-bold text-[#064E3B] outline-none cursor-pointer transition-colors"
                      >
                        {PARTNER_COUNTRIES.map(c => (
                          <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">
                        Your Age *
                      </label>
                      <input 
                        type="number" 
                        min="18"
                        max="99"
                        required
                        placeholder="23"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        className="w-full bg-[#F0FDF4] border-2 border-gray-200 focus:border-[#10B981] rounded-2xl px-4 py-3 text-sm font-bold text-[#064E3B] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">
                      Why do you want to join this Mental Health Exchange? *
                    </label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Share your connection to youth wellbeing, what you hope to learn, or how you will contribute to our group positive atmosphere..."
                      value={formData.motivation}
                      onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                      className="w-full bg-[#F0FDF4] border-2 border-gray-200 focus:border-[#10B981] rounded-2xl px-4 py-3 text-sm font-medium text-[#064E3B] outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">
                      Dietary / Accessibility Needs (Optional)
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Vegan, Celiac, allergies, sensory quiet preferences"
                      value={formData.specialNeeds}
                      onChange={(e) => setFormData({...formData, specialNeeds: e.target.value})}
                      className="w-full bg-[#F0FDF4] border-2 border-gray-200 focus:border-[#10B981] rounded-2xl px-4 py-3 text-sm font-medium text-[#064E3B] outline-none transition-colors"
                    />
                  </div>

                  <div className="bg-[#D9F99D]/60 p-4 rounded-2xl flex items-center gap-3 text-xs text-[#064E3B] font-bold">
                    <ShieldCheck className="w-5 h-5 text-[#10B981] shrink-0" />
                    <span>Your data is handled strictly under EU GDPR privacy rules solely for Erasmus+ grant reporting.</span>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsApplyModalOpen(false)}
                      className="px-6 py-3 rounded-full font-bold text-xs uppercase text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#10B981] hover:bg-[#059669] text-white font-black px-8 py-3.5 rounded-full border-b-4 border-[#047857] active:border-b-0 transition-all shadow-md text-sm uppercase tracking-wide cursor-pointer flex items-center gap-2"
                    >
                      <span>Submit Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- FOOTER / PARTNERS --- */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8 pb-8 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#10B981] rounded-full flex items-center justify-center text-white font-black text-xl">E+</div>
              <span className="text-xl sm:text-2xl font-black text-[#064E3B] tracking-tight">BEYOND THE SMILE</span>
            </div>

            {/* Partner Country Colored Blocks */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <span className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Partner Nations</span>
              <div className="flex gap-2.5">
                <div className="w-8 h-5 bg-[#10B981] rounded-md shadow-sm" title="Spain"></div>
                <div className="w-8 h-5 bg-[#14B8A6] rounded-md shadow-sm" title="Italy"></div>
                <div className="w-8 h-5 bg-[#84CC16] rounded-md shadow-sm" title="Germany"></div>
                <div className="w-8 h-5 bg-[#22C55E] rounded-md shadow-sm" title="Poland"></div>
                <div className="w-8 h-5 bg-[#059669] rounded-md shadow-sm" title="Greece"></div>
                <div className="w-8 h-5 bg-[#0D9488] rounded-md shadow-sm" title="Portugal"></div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-gray-100 rounded-xl flex items-center justify-center text-[10px] font-black tracking-widest text-gray-500 border border-gray-200">
                🇪🇺 ERASMUS+
              </div>
              <div className="px-4 py-2 bg-gray-100 rounded-xl flex items-center justify-center text-[10px] font-black tracking-widest text-gray-500 border border-gray-200">
                EU COMMISSION
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-xs text-gray-500 font-medium text-center lg:text-left">
            <p className="max-w-2xl leading-relaxed">
              Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor EACEA can be held responsible for them.
            </p>
            <div className="flex gap-6 font-bold text-[#064E3B] uppercase text-[11px] tracking-wider">
              <a href="#" className="hover:text-[#10B981] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#10B981] transition-colors">Safeguarding</a>
              <a href="#" className="hover:text-[#10B981] transition-colors">Alumni Portal</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Simple helper icon
function BuildingIcon(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}
