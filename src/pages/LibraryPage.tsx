import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Play, Download, Trash2, Loader2 } from 'lucide-react';
import axios from 'axios';

interface Video {
  id: string;
  filename: string;
  url: string;
  createdAt: string;
}

export function LibraryPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('/api/videos');
      setVideos(response.data.videos);
    } catch (error) {
      console.error("Failed to fetch videos", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Your <span className="text-gradient-gold">Library</span></h1>
          <p className="text-slate-400">Access your generated Quran videos.</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-500 w-10 h-10" /></div>
        ) : videos.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-white/5">
            <p className="text-slate-400 mb-6">No videos generated yet.</p>
            <Button onClick={() => window.location.href = '/studio'}>Create Your First Video</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id}>
                <GlassCard className="group overflow-hidden">
                  <div className="aspect-video bg-black rounded-xl mb-4 relative overflow-hidden">
                    <video 
                      src={video.url} 
                      className="w-full h-full object-cover"
                      controls
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-200 mb-1">Video #{video.id.slice(-4)}</h3>
                      <p className="text-xs text-slate-500">{new Date(video.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <a href={video.url} download>
                        <Button size="sm" variant="secondary" className="p-2 h-10 w-10 rounded-full">
                          <Download className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
