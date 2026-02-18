
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Zap, 
  MapPin, 
  Users, 
  Rocket, 
  Sparkles, 
  Coffee, 
  MessageCircle, 
  ChevronRight,
  Maximize2,
  Download,
  X,
  Palette,
  Loader2,
  ChevronDown,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { COLORS, SOCIAL_NOTES, BENEFITS } from './constants';
import { Role } from './types';
import { getInspirationTips, generateCollageImage } from './services/geminiService';

// --- Sub-components ---

const FreshBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-cyan-50 overflow-hidden">
      {/* Global Fresh Gradient matching reference */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E0F7FA] via-[#B2EBF2] to-[#81D4FA] opacity-80" />
      
      {/* Soft Ambient Blobs */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], x: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-200/40 blur-[100px]"
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-teal-200/40 blur-[80px]"
      />
      
      {/* Noise Texture for paper feel */}
      <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden rounded-b-[40px] shadow-2xl z-10 bg-white">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img 
          src="https://picsum.photos/seed/tianmu_lake_hero_bright/1080/1920" 
          alt="Tianmu Lake" 
          className="w-full h-full object-cover"
        />
        {/* Lighter overlay for fresh look */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
      </motion.div>

      <div className="absolute top-[15%] left-0 right-0 p-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="flex flex-col items-center leading-none tracking-tighter drop-shadow-2xl">
            <span className="text-[4rem] font-black text-white drop-shadow-md">天目湖</span>
            <span className="text-[4.5rem] font-black text-[#F2C94C] relative z-10 italic mt-2 drop-shadow-md">
              未知坐标
            </span>
          </h1>
          
          <motion.div 
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ delay: 1, type: "spring" }}
             className="mt-6 bg-white/90 backdrop-blur text-slate-800 px-6 py-2 rounded-full font-black text-lg shadow-xl flex items-center gap-2"
          >
              <Sparkles size={18} className="text-[#F2C94C] fill-[#F2C94C]" />
              <span>等你定义</span>
              <Sparkles size={18} className="text-[#F2C94C] fill-[#F2C94C]" />
          </motion.div>

          <p className="mt-4 text-white font-bold tracking-widest text-sm drop-shadow-md">全球共创招募令</p>
        </motion.div>
      </div>

      <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1, y: [0, 10, 0] }}
           transition={{ delay: 2, duration: 2, repeat: Infinity }}
           className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2"
        >
           <span className="text-xs font-bold opacity-80">向下探索</span>
           <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};

const ManifestoScreen = () => {
  return (
    <section className="py-16 px-6 relative z-10">
      <div className="max-w-md mx-auto">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="bg-white/80 backdrop-blur-sm border border-white inline-block px-4 py-2 rounded-t-2xl rounded-br-2xl shadow-sm mb-4">
            <p className="text-slate-500 text-lg font-bold">这里不缺 <span className="text-teal-600">绝美山水</span></p>
          </div>
          <h2 className="text-4xl font-black text-slate-800 leading-tight">
            缺的是你 <br />
            <span className="text-[#2D9CDB] relative inline-block">
              天马行空
              <motion.div 
                className="absolute -top-6 -right-6 w-10 h-10"
                animate={{ rotate: [0, 15, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Zap fill="#F2C94C" stroke="none" className="drop-shadow-sm" />
              </motion.div>
            </span> <br />
            <span className="flex items-center gap-2">
              的想象力
              <span className="text-2xl">💡</span>
            </span>
          </h2>
        </motion.div>

        {/* --- ADDED: Join Button --- */}
        <motion.button 
           whileTap={{ scale: 0.98 }}
           className="mb-10 w-full bg-gradient-to-r from-[#27AE60] to-[#219150] text-white py-4 rounded-xl font-bold shadow-lg shadow-green-200 flex items-center justify-center gap-2 group overflow-hidden relative"
        >
           <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
           <Rocket size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
           立即报名
        </motion.button>
        
        {/* --- UPDATED: Image Section with Lake View & Better Text --- */}
        <div className="space-y-6">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="relative rounded-[2rem] border-[6px] border-white shadow-xl overflow-hidden bg-white group"
          >
            {/* Image: Lake View */}
            <img 
               src="https://picsum.photos/seed/tianmu_lake_water_scenery/800/600" 
               alt="Tianmu Lake View" 
               className="w-full aspect-[4/3] object-cover" 
            />
            
            {/* Fixed Text Layout - Glass Card at Bottom */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl flex items-center justify-between border border-white/10">
               <div className="flex items-center gap-3">
                 <div className="bg-[#F2C94C] p-1.5 rounded-full">
                    <MapPin size={14} className="text-black" />
                 </div>
                 <div className="text-white">
                   <p className="text-[10px] opacity-80 uppercase tracking-wider">Coordinates</p>
                   <p className="text-sm font-bold">天目湖畔 · 未定义区域</p>
                 </div>
               </div>
            </div>
          </motion.div>
          
          {/* Info Card */}
          <div className="bg-white/90 backdrop-blur p-6 rounded-3xl shadow-lg border border-white">
             <p className="text-xl font-bold tracking-tight text-slate-900 mb-3">
                不做过客，<span className="text-[#27AE60] text-2xl">做合伙人</span>
             </p>
             <p className="text-sm text-slate-500 leading-relaxed font-medium">
               我们将拿出核心地块，邀请全球极客、艺术家、主理人，用你们的脑洞，重塑这片山水。
             </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const RoleSelectionScreen = () => {
  const [flipped, setFlipped] = useState<Role | null>(null);

  const RoleCard = ({ role, title, icon: Icon, tags, core, privilege, color, letter }: any) => (
    <div 
      className={`relative w-full h-[480px] cursor-pointer perspective group`}
      onClick={() => setFlipped(flipped === role ? null : role)}
    >
      <motion.div 
        className={`w-full h-full relative preserve-3d transition-transform duration-700 ${flipped === role ? 'rotate-y-180' : ''}`}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden rounded-[32px] bg-white shadow-xl border-2 border-white overflow-hidden">
          {/* Header Color Block */}
          <div className="h-24 relative overflow-hidden" style={{ backgroundColor: color }}>
             <div className="absolute -bottom-6 -right-6 text-white/20">
                <Icon size={120} />
             </div>
             <div className="absolute top-6 left-6 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-black text-xl backdrop-blur-sm">
               {letter}
             </div>
          </div>
          
          <div className="p-8 pt-6 flex flex-col h-[calc(100%-6rem)] justify-between">
             <div>
               <h3 className="text-2xl font-black text-slate-800 mb-2">{title}</h3>
               <div className="w-12 h-1 rounded-full mb-4" style={{ backgroundColor: color }} />
               
               <div className="flex flex-wrap gap-2 mb-6">
                 {tags.map((t: string) => (
                   <span key={t} className="text-[11px] font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                     {t}
                   </span>
                 ))}
               </div>
               
               <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-start gap-2 mb-2">
                     <span style={{color}}>📝</span>
                     <span className="text-xs font-bold text-slate-400 uppercase">任务</span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{core}</p>
               </div>
             </div>

             <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 mt-4 group-hover:text-slate-600 transition-colors">
               点击翻转查看权益 <ChevronRight size={14} />
             </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[32px] bg-white shadow-xl border-2 border-white overflow-hidden">
           <div className="h-full p-8 flex flex-col items-center justify-center text-center bg-gradient-to-b from-white to-slate-50">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 text-white shadow-lg" style={{ backgroundColor: color }}>
              <span className="text-2xl">🎁</span>
            </div>
            <h4 className="text-xl font-black mb-6 text-slate-800">权益清单</h4>
            <p className="text-base font-bold text-slate-600 leading-relaxed mb-8">
              {privilege}
            </p>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 rounded-xl font-bold text-white shadow-lg"
              style={{ backgroundColor: color }}
            >
              申请{letter}赛道
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <section className="py-16 px-6 flex flex-col items-center relative z-10">
      <div className="bg-white px-8 py-3 rounded-full shadow-lg mb-12 transform rotate-1 border border-blue-100">
         <h2 className="text-2xl font-black text-blue-500 flex items-center gap-2">
           招募赛道 <span className="text-red-500">🎯</span>
         </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <RoleCard 
          role={Role.PLANNER}
          letter="A"
          title="地标焕新策划师"
          icon={Rocket}
          tags={['定位：梦想落地', '寻找共创伙伴']}
          core="针对天目湖全域多处潜力地块，提交包含【梦想愿景 + 运营方案 + 场景描绘】的焕新方案。"
          privilege="长期主理权 + 品牌全案支持 + 资源 All in"
          color="#F2994A"
        />
        <RoleCard 
          role={Role.SPOKESPERSON}
          letter="B"
          title="湖畔坐标发声人"
          icon={MessageCircle}
          tags={['定位：世界听见', '汇聚声量场']}
          core="分享你与天目湖的故事，吐槽痛点，或为一个角落提出微创意。"
          privilege="金点子直达决策层 + 全媒体曝光 + 梦幻联动"
          color="#27AE60"
        />
      </div>
    </section>
  );
};

const BenefitsScreen = () => {
  return (
    <section className="py-16 px-6 relative z-10">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-white/50">
          <div className="text-center mb-10">
            <div className="inline-block bg-[#FDE68A] text-[#92400E] px-4 py-1 rounded-full text-sm font-bold mb-4">
               核心权益 🎁
            </div>
            <h2 className="text-3xl font-black text-slate-800">名利双收</h2>
          </div>
          
          <div className="space-y-4">
            {BENEFITS.map((benefit, idx) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 group hover:bg-white hover:shadow-md transition-all border border-slate-100"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-white shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{benefit.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ActionGuide = ({ onGenerate }: { onGenerate: () => void }) => {
  const [inspirations, setInspirations] = useState<{text: string}[]>([]);
  const [currentTip, setCurrentTip] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sceneryUrl, setSceneryUrl] = useState<string | null>(null);

  const fetchInspirations = async () => {
    const data = await getInspirationTips();
    setInspirations(data);
    setCurrentTip(data[Math.floor(Math.random() * data.length)].text);
  };

  const handleGenScenery = async () => {
    setIsGenerating(true);
    const url = await generateCollageImage(currentTip || "湖畔的创意竹屋");
    if (url) {
      setSceneryUrl(url);
      onGenerate(); 
    }
    setIsGenerating(false);
  };

  useEffect(() => {
    fetchInspirations();
  }, []);

  return (
    <section className="py-16 px-6 relative z-10 pb-32">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border-4 border-white">
          <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-2">
            <span className="bg-blue-500 w-2 h-8 rounded-full"/> 
            参与流程
            <span className="text-2xl">📋</span>
          </h2>
          
          <div className="relative space-y-8">
            <div className="absolute left-[1.2rem] top-2 bottom-2 w-0.5 bg-slate-100 -z-10" />
            {[
              { step: '1', title: '认领坐标', desc: '在线浏览潜力地块，选择你最心动的那个。', color: 'bg-blue-500' },
              { step: '2', title: '提交定义', desc: '专业组上传方案 / 大众组发布笔记。', color: 'bg-green-500' },
              { step: '3', title: '共创未来', desc: '评审打分 + 每周公布幸运奖。', color: 'bg-yellow-400' },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex gap-4 items-start"
              >
                <div className={`w-10 h-10 rounded-xl ${item.color} flex-shrink-0 flex items-center justify-center font-black text-white shadow-md z-10`}>
                  {item.step}
                </div>
                <div className="bg-slate-50 p-4 rounded-xl flex-1 border border-slate-100">
                  <h3 className="text-base font-bold text-slate-800 mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* AI Tool */}
          <div className="mt-12 pt-8 border-t border-slate-100">
             <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
               <Sparkles className="text-yellow-400" size={18} />
               灵感生成器
             </h4>
             <div className="bg-slate-900 rounded-2xl p-1 shadow-inner">
               <div className="bg-slate-800/50 rounded-xl p-4 flex items-center gap-3 mb-1">
                  <input 
                    type="text" 
                    value={currentTip || ""} 
                    onChange={(e) => setCurrentTip(e.target.value)}
                    className="bg-transparent border-none outline-none flex-1 text-sm font-bold text-white placeholder:text-slate-500"
                  />
                  <button onClick={fetchInspirations} className="text-slate-400 hover:text-white">
                    <ChevronDown size={16} />
                  </button>
               </div>
               <motion.button 
                 whileTap={{ scale: 0.98 }}
                 disabled={isGenerating}
                 onClick={handleGenScenery}
                 className="w-full bg-[#F2C94C] text-slate-900 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#E0B83B] transition-colors"
               >
                 {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} fill="black" />}
                 生成海报
               </motion.button>
             </div>
             
             {sceneryUrl && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 className="mt-4 rounded-xl overflow-hidden shadow-lg border-2 border-slate-100"
               >
                 <img src={sceneryUrl} className="w-full h-auto" alt="Generated" />
               </motion.div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();

  // Simple Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <Loader2 className="text-blue-500 animate-spin w-10 h-10" />
    </div>
  );

  return (
    <div className="bg-cyan-50 text-slate-800 font-sans min-h-screen relative selection:bg-yellow-200">
      <FreshBackground />
      
      <main>
         <HeroSection />
         <ManifestoScreen />
         <RoleSelectionScreen />
         <BenefitsScreen />
         <ActionGuide onGenerate={() => {}} />
      </main>
         
      {/* Sticky Bar - Light Mode */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/90 backdrop-blur-xl border-t border-slate-100 flex gap-4 items-center max-w-lg mx-auto md:rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
         <button className="bg-slate-100 p-4 rounded-2xl flex-shrink-0 active:scale-95 transition-transform text-slate-600">
           <MapPin size={24} />
         </button>
         <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform relative overflow-hidden group">
           <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
              🚀 立即报名
           </span>
         </button>
      </div>
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-white/50">
         <motion.div 
           className="h-full bg-gradient-to-r from-blue-400 to-teal-400"
           style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
         />
       </div>
    </div>
  );
}
