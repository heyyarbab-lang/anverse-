import axios from 'axios';

const AL_QURAN_API = 'https://api.alquran.cloud/v1';

export const quranService = {
  getRecitors: async () => {
    // Fetching from quranicaudio via proxy or using Al Quran Cloud as fallback
    // Using Al Quran Cloud for metadata consistency as requested
    const response = await axios.get(`${AL_QURAN_API}/edition/format/audio`);
    return response.data.data;
  },

  getSurahs: async () => {
    const response = await axios.get(`${AL_QURAN_API}/surah`);
    return response.data.data;
  },

  getAyahs: async (surahNumber: number, recitorId: string) => {
    const response = await axios.get(`${AL_QURAN_API}/surah/${surahNumber}/${recitorId}`);
    return response.data.data;
  },
  
  getTranslation: async (surahNumber: number, langId: string) => {
    const response = await axios.get(`${AL_QURAN_API}/surah/${surahNumber}/${langId}`);
    return response.data.data;
  }
};
