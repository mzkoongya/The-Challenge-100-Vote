import React, { useState, useEffect } from 'react';
import { ExternalLink, Vote, CheckCircle2, Info, X, Play, Info as InfoIcon, Bell, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Team {
  id: string;
  name: string;
  serviceName: string;
  description: string;
  landingUrl: string;
  imageUrl: string;
  logoUrl?: string;
}

// --- Dummy Data ---
const INITIAL_TEAMS: Team[] = [
  {
    id: '1',
    name: 'Px-Squad',
    serviceName: '고객이 원하는 One-Stop 원료 솔루션',
    description: '',
    landingUrl: 'https://example.com/px-squad',
    imageUrl: 'https://picsum.photos/seed/pxsquad/1280/720',
  },
  {
    id: '2',
    name: 'Re:Food Lab',
    serviceName: '두부 공장의 비지를 업사이클링한 스낵 개발',
    description: '',
    landingUrl: 'https://example.com/refood',
    imageUrl: 'https://picsum.photos/seed/refood/1280/720',
  },
  {
    id: '3',
    name: 'PULSE BOOST',
    serviceName: '파우더 형태의 기능성 음료',
    description: '',
    landingUrl: 'https://gaming-supplement-16.aura.build/',
    imageUrl: 'https://storage.googleapis.com/inventionlab-homepage-assets/%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20%E1%84%8B%E1%85%B3%E1%86%B7%E1%84%85%E1%85%AD.png',
  },
  {
    id: '4',
    name: 'Groundpoly',
    serviceName: '커피박을 활용한 친환경 플라스틱 소재 개발',
    description: '',
    landingUrl: 'https://example.com/groundpoly',
    imageUrl: 'https://picsum.photos/seed/ground/1280/720',
  },
  {
    id: '5',
    name: 'K-Studio',
    serviceName: 'BYO Flavor 시즈닝 키링',
    description: '',
    landingUrl: 'https://example.com/kstudio',
    imageUrl: 'https://picsum.photos/seed/kstudio/1280/720',
  },
  {
    id: '6',
    name: 'Gochujang Bros',
    serviceName: '고추장 기반 크리에이티브 스낵 개발',
    description: '',
    landingUrl: 'https://example.com/gochujang',
    imageUrl: 'https://picsum.photos/seed/gochujang/1280/720',
  },
  {
    id: '7',
    name: 'Seoul Mate',
    serviceName: 'Taste of Seoul touch of soul',
    description: '',
    landingUrl: 'https://example.com/seoulmate',
    imageUrl: 'https://picsum.photos/seed/seoulmate/1280/720',
  },
  {
    id: '8',
    name: 'AFTER',
    serviceName: '카페인 이후의 불편함을 관리하는 음료 개발',
    description: '',
    landingUrl: 'https://example.com/after',
    imageUrl: 'https://picsum.photos/seed/after/1280/720',
  },
];

// --- Shared Layout Constants ---
const CONTAINER_CLASS = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-[100] py-4 bg-gradient-to-b from-black/80 to-transparent transition-all duration-300">
    <div className={`${CONTAINER_CLASS} flex items-center justify-between`}>
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <img src="https://storage.googleapis.com/inventionlab-homepage-assets/project/daesang/logo.png" alt="Logo" className="h-12 sm:h-16 lg:h-20" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-white hover:text-slate-300 transition-colors">
          <Search size={20} />
        </button>
        <button className="text-white hover:text-slate-300 transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-netflix-red text-white text-[10px] flex items-center justify-center rounded-full">3</span>
        </button>
        <div className="w-8 h-8 rounded overflow-hidden cursor-pointer">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" alt="User" />
        </div>
      </div>
    </div>
  </nav>
);

const Hero = ({ featuredTeam, onOpenGuide, onOpenIntro }: { featuredTeam: Team, onOpenGuide: () => void, onOpenIntro: () => void }) => (
  <section className="relative h-[85vh] w-full overflow-hidden bg-netflix-black">
    <div className="absolute inset-0">
      <img 
        src="https://storage.googleapis.com/inventionlab-homepage-assets/project/daesang/bg.png" 
        className="w-full h-full object-cover object-center" 
        alt="Background"
        referrerPolicy="no-referrer"
      />
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
    </div>

    <div className={`relative h-full flex flex-col justify-center ${CONTAINER_CLASS}`}>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <h1 className="text-4xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-6 leading-tight tracking-wider font-bebas whitespace-nowrap">
          The Challenge 100
        </h1>
        
        <p className="text-base sm:text-lg lg:text-xl text-slate-200 mb-8 leading-relaxed font-medium max-w-2xl">
          이번 시즌, 가장 기대되는 팀은? 한 팀씩 랜딩페이지를 확인한 뒤 투표하면 자동 집계됩니다. 최고의 팀을 선택해 다음 라운드에 올려주세요.
        </p>

        <div className="flex flex-row items-center gap-3 sm:gap-4">
          <button 
            onClick={onOpenGuide}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 sm:gap-3 bg-white text-netflix-black px-4 sm:px-8 py-2.5 sm:py-3 rounded font-bold text-sm sm:text-lg hover:bg-white/90 transition-all"
          >
            <Play size={18} className="sm:w-6 sm:h-6" fill="currentColor" />
            투표 방법 안내
          </button>
          <button 
            onClick={onOpenIntro}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 sm:gap-3 bg-slate-500/50 text-white px-4 sm:px-8 py-2.5 sm:py-3 rounded font-bold text-sm sm:text-lg backdrop-blur-md hover:bg-slate-500/70 transition-all"
          >
            <InfoIcon size={18} className="sm:w-6 sm:h-6" />
            상세 정보
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => (
  <motion.div 
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    whileHover={{ scale: 1.05, zIndex: 50, y: -8 }}
    onClick={() => window.open(team.landingUrl, '_blank', 'noopener,noreferrer')}
    className="relative group rounded-md overflow-hidden bg-netflix-dark aspect-video cursor-pointer transition-all duration-300 shadow-lg"
  >
    <img 
      src={team.imageUrl} 
      alt={team.name} 
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      referrerPolicy="no-referrer"
    />
    
    <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <h4 className="text-2xl sm:text-3xl font-black text-white drop-shadow-2xl mb-1">
          {team.name}
        </h4>
        <p className="text-sm sm:text-lg font-normal text-white/90 drop-shadow-lg leading-tight">
          {team.serviceName}
        </p>
      </div>
    </div>
  </motion.div>
);

// --- Modal Components ---

const BaseModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string;
  children: React.ReactNode;
}) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl p-6 sm:p-10 max-w-md w-full shadow-2xl border border-white/10"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
          
          <h3 className="text-2xl font-bold text-slate-900 mb-6">{title}</h3>
          
          <div className="text-slate-600 leading-relaxed mb-8">
            {children}
          </div>
          
          <button 
            onClick={onClose}
            className="w-full py-3 px-6 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
          >
            닫기
          </button>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const VoteConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  teamName 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void; 
  teamName: string;
}) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl p-8 sm:p-10 max-w-md w-full shadow-2xl text-center border border-white/10"
        >
          <div className="w-16 h-16 bg-netflix-red rounded-full flex items-center justify-center text-white mx-auto mb-6">
            <Vote size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">투표하시겠습니까?</h3>
          <p className="text-slate-500 mb-8 leading-relaxed">
            <span className="text-slate-900 font-bold">[{teamName}]</span> 팀에 소중한 한 표를 행사하시겠습니까? 투표 후에는 변경이 불가능합니다.
          </p>
          
          <div className="flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg transition-colors"
            >
              취소
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-3 px-6 bg-netflix-red hover:bg-netflix-red/90 text-white font-bold rounded-lg shadow-lg transition-all"
            >
              확인
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const Toast = ({ 
  message, 
  isVisible 
}: { 
  message: string; 
  isVisible: boolean; 
}) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[210] bg-white text-netflix-black px-8 py-4 rounded shadow-2xl flex items-center gap-4 w-[90%] max-w-sm"
      >
        <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center shrink-0">
          <CheckCircle2 size={14} className="text-white" />
        </div>
        <span className="font-bold text-sm sm:text-base">{message}</span>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Main App ---

export default function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [votedTeamId, setVotedTeamId] = useState<string | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [introModalOpen, setIntroModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const shuffled = [...INITIAL_TEAMS].sort(() => Math.random() - 0.5);
    setTeams(shuffled);
    
    const savedVote = localStorage.getItem('challenge100_vote');
    if (savedVote) {
      setVotedTeamId(savedVote);
    }
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const handleVoteClick = (team: Team) => {
    if (votedTeamId) {
      showToast('이미 투표에 참여하셨습니다.');
      return;
    }
    setSelectedTeam(team);
    setConfirmModalOpen(true);
  };

  const confirmVote = () => {
    if (selectedTeam) {
      setVotedTeamId(selectedTeam.id);
      localStorage.setItem('challenge100_vote', selectedTeam.id);
      setConfirmModalOpen(false);
      showToast(`${selectedTeam.name} 팀에 투표가 완료되었습니다!`);
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black font-sans selection:bg-netflix-red/30 selection:text-netflix-red">
      <Navbar />
      
      {teams.length > 0 && (
        <Hero 
          featuredTeam={teams[0]} 
          onOpenGuide={() => setGuideModalOpen(true)}
          onOpenIntro={() => setIntroModalOpen(true)}
        />
      )}
      
      <main className={`${CONTAINER_CLASS} -mt-10 sm:-mt-20 relative z-20 pb-32`}>
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            참가 팀 프로젝트
            <span className="text-netflix-red text-[10px] sm:text-xs font-black uppercase tracking-widest bg-netflix-red/10 px-2 py-1 rounded">8 Teams</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teams.map((team) => (
              <TeamCard 
                key={team.id} 
                team={team} 
              />
            ))}
          </div>
        </div>
      </main>

      {/* Modals */}
      <VoteConfirmModal 
        isOpen={confirmModalOpen} 
        onClose={() => setConfirmModalOpen(false)} 
        onConfirm={confirmVote} 
        teamName={selectedTeam?.name || ''} 
      />

      <BaseModal 
        isOpen={guideModalOpen} 
        onClose={() => setGuideModalOpen(false)} 
        title="투표 방법 안내"
      >
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-900 shrink-0">1</div>
            <p className="text-slate-600">팀별 카드를 클릭해 랜딩페이지를 방문한 후 각 팀의 아이템을 확인합니다.</p>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-900 shrink-0">2</div>
            <p className="text-slate-600">우측 하단의 투표하기 버튼을 클릭해 가장 응원하고 싶은 팀에게 투표합니다.</p>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-900 shrink-0">3</div>
            <p className="text-slate-600">중복 투표는 불가하며 투표 결과는 집계 후 2차 PT 심사에 활용됩니다.</p>
          </div>
        </div>
      </BaseModal>

      <BaseModal 
        isOpen={introModalOpen} 
        onClose={() => setIntroModalOpen(false)} 
        title="프로그램 소개"
      >
        <p className="text-slate-600 leading-relaxed">
          We대한상상 시즌 3 - The Challenge 100은 대상그룹 임직원들의 창의적인 아이디어를 발굴하고 육성하는 사내벤처 공모전 프로그램입니다. 
          대상 그룹의 미래를 만들어나갈 혁신적인 아이템을 제안한 팀들의 열정과 도전을 확인해보세요.
        </p>
      </BaseModal>
      
      <Toast 
        message={toastMessage} 
        isVisible={toastVisible} 
      />
      
      <footer className="py-12 border-t border-white/10 text-slate-500 text-sm">
        <div className={CONTAINER_CLASS}>
          <div className="space-y-2 opacity-60">
            <p className="font-bold text-slate-300">2026 We대한상상 3기 운영사무국</p>
            <p>문의 번호 : 대상홀딩스 기업문화팀 홍석민 부장(hsm1025@daesang.com / 02-2211-6565)</p>
            <p className="text-xs pt-4">copyright © We대한상상 ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </footer>

      {/* Fixed Tally Voting Button */}
      <button 
        data-tally-open="EkPPb4" 
        data-tally-width="580" 
        data-tally-hide-title="1" 
        data-tally-overlay="1" 
        data-tally-emoji-text="👋" 
        data-tally-emoji-animation="wave" 
        data-tally-auto-close="5000"
        className="fixed bottom-8 right-8 z-[150] bg-netflix-red text-white px-6 py-3 rounded-full font-bold text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
      >
        <Vote size={20} />
        투표하기
      </button>
    </div>
  );
}
