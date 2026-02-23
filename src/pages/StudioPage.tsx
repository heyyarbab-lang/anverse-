import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store';
import { quranService } from '@/services/quran';
import { Search, Mic2, BookOpen, Image as ImageIcon, Layers, Loader2, Sparkles } from 'lucide-react';
import axios from 'axios';
import { cn } from '@/lib/utils';

export function StudioPage() {
  const { 
    selectedRecitor, setRecitor,
    selectedSurah, setSurah,
    ayahRange, setAyahRange,
    backgroundStyle, setBackgroundStyle
  } = useStore();

  const [step, setStep] = useState(1);
  const [recitors, setRecitors] = useState<any[]>([]);
  const [surahs, setSurahs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [recitorsData, surahsData] = await Promise.all([
          quranService.getRecitors(),
          quranService.getSurahs()
        ]);
        // Filter only audio formats that are verse-by-verse if possible, or just take all
        setRecitors(recitorsData);
        setSurahs(surahsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredRecitors = recitors.filter(r => 
    r.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Call backend API
      const response = await axios.post('/api/generate', {
        recitor: selectedRecitor,
        surah: selectedSurah,
        ayahRange,
        backgroundStyle
      });
      console.log("Generation started:", response.data);
      // In a real app, we would poll for status or redirect to a processing page
      alert("Video generation started! (Simulation)");
    } catch (error) {
      console.error("Generation failed", error);
      alert("Failed to start generation");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                step >= s ? "bg-emerald-500 text-white shadow-lg shadow-emerald-900/20" : "bg-slate-800 text-slate-500"
              )}>
                {s}
              </div>
              {s < 4 && (
                <div className={cn(
                  "w-16 h-1 bg-slate-800 mx-2",
                  step > s && "bg-emerald-500"
                )} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Recitor */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Mic2 className="text-emerald-400" /> Select Recitor
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search recitor..." 
                  className="bg-slate-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-emerald-500/50 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {loading ? (
                <div className="col-span-full flex justify-center py-20"><Loader2 className="animate-spin text-emerald-500" /></div>
              ) : (
                filteredRecitors.map((recitor) => (
                  <div key={recitor.identifier}>
                    <GlassCard 
                      className={cn(
                        "cursor-pointer transition-all h-full",
                        selectedRecitor?.identifier === recitor.identifier ? "border-emerald-500 bg-emerald-500/10" : ""
                      )}
                    >
                      <div onClick={() => setRecitor(recitor)}>
                        <h3 className="font-semibold text-lg mb-1">{recitor.englishName}</h3>
                        <p className="text-sm text-slate-400">{recitor.language} • {recitor.format}</p>
                      </div>
                    </GlassCard>
                  </div>
                ))
              )}
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!selectedRecitor}>Next Step</Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Select Surah & Range */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
              <BookOpen className="text-emerald-400" /> Select Surah
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {surahs.map((surah) => (
                  <div 
                    key={surah.number}
                    onClick={() => setSurah(surah)}
                    className={cn(
                      "p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between",
                      selectedSurah?.number === surah.number 
                        ? "bg-emerald-500/10 border-emerald-500" 
                        : "bg-slate-800/30 border-white/5 hover:bg-slate-800/50"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center font-serif text-emerald-500 font-bold">
                        {surah.number}
                      </div>
                      <div>
                        <h3 className="font-semibold">{surah.englishName}</h3>
                        <p className="text-sm text-slate-400">{surah.englishNameTranslation}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-xl text-emerald-400">{surah.name}</span>
                      <p className="text-xs text-slate-500">{surah.numberOfAyahs} Ayahs</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-panel rounded-2xl p-8 h-fit">
                <h3 className="text-xl font-bold mb-6">Ayah Range</h3>
                {selectedSurah ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Start Ayah</label>
                      <input 
                        type="number" 
                        min="1" 
                        max={selectedSurah.numberOfAyahs}
                        value={ayahRange.start}
                        onChange={(e) => setAyahRange(parseInt(e.target.value), ayahRange.end)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">End Ayah</label>
                      <input 
                        type="number" 
                        min={ayahRange.start} 
                        max={selectedSurah.numberOfAyahs}
                        value={ayahRange.end}
                        onChange={(e) => setAyahRange(ayahRange.start, parseInt(e.target.value))}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
                      />
                    </div>
                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      <p className="text-emerald-400 text-sm text-center">
                        Selected: {selectedSurah.englishName} ({ayahRange.start} - {ayahRange.end})
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-slate-500 py-10">
                    Please select a Surah from the list
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)} disabled={!selectedSurah}>Next Step</Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Visuals */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
              <ImageIcon className="text-emerald-400" /> Visual Style
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Nature', 'Desert', 'Sky', 'Mosque', 'Abstract', 'Ocean', 'Space', 'Flowers'].map((style) => (
                <div 
                  key={style}
                  onClick={() => setBackgroundStyle(style.toLowerCase())}
                  className={cn(
                    "aspect-video rounded-xl border-2 cursor-pointer relative overflow-hidden group",
                    backgroundStyle === style.toLowerCase() 
                      ? "border-emerald-500 shadow-lg shadow-emerald-500/20" 
                      : "border-transparent hover:border-white/20"
                  )}
                >
                  <div className={cn(
                    "absolute inset-0 bg-slate-800 transition-transform duration-500 group-hover:scale-110",
                    // Placeholder for actual images
                    "bg-gradient-to-br from-slate-800 to-slate-900"
                  )} />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                    <span className="font-bold text-lg tracking-wide">{style}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={() => setStep(4)}>Next Step</Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Review & Generate */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
              <Layers className="text-emerald-400" /> Review & Generate
            </h2>

            <div className="glass-panel rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-slate-400">Recitor</span>
                  <span className="font-semibold">{selectedRecitor?.englishName}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-slate-400">Surah</span>
                  <span className="font-semibold">{selectedSurah?.englishName}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-slate-400">Ayah Range</span>
                  <span className="font-semibold">{ayahRange.start} - {ayahRange.end}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-slate-400">Background</span>
                  <span className="font-semibold capitalize">{backgroundStyle}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-slate-400">Format</span>
                  <span className="font-semibold">1080p MP4 (H.264)</span>
                </div>
              </div>

              <div className="mt-8">
                <Button 
                  className="w-full py-6 text-lg shadow-emerald-500/20 shadow-2xl" 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin mr-2" /> Generating Video...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" /> Generate Video
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="mt-8 flex justify-start">
              <Button variant="secondary" onClick={() => setStep(3)}>Back</Button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
