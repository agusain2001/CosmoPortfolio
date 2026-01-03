import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiMusicNote, HiPause, HiPlay, HiVolumeUp, HiVolumeOff, HiX } from 'react-icons/hi';
import { FaSpotify } from 'react-icons/fa';

interface Track {
    title: string;
    artist: string;
    albumArt: string;
    spotifyUrl: string;
}

// Coding/focus music playlist
const playlist: Track[] = [
    { title: 'Interstellar Main Theme', artist: 'Hans Zimmer', albumArt: '🎬', spotifyUrl: 'https://open.spotify.com/track/6vuykQgDLUCiZ7YggIpLM9' },
    { title: 'Time', artist: 'Hans Zimmer', albumArt: '🎹', spotifyUrl: 'https://open.spotify.com/track/6ZFbXIJkuI1dVNWvzJzown' },
    { title: 'Starman', artist: 'David Bowie', albumArt: '🌟', spotifyUrl: 'https://open.spotify.com/track/0pQskrTITgmCMyr85tb9qq' },
    { title: 'Rocket Man', artist: 'Elton John', albumArt: '🚀', spotifyUrl: 'https://open.spotify.com/track/3gdewACMIVMEWVbyb8O9sY' },
    { title: 'Space Oddity', artist: 'David Bowie', albumArt: '🛸', spotifyUrl: 'https://open.spotify.com/track/72Z17vmmeQKAg8bptWvpVG' },
];

export default function MusicPlayer() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);

    const togglePlay = () => setIsPlaying(!isPlaying);
    const toggleMute = () => setIsMuted(!isMuted);

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % playlist.length);
    };

    const openInSpotify = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <>
            {/* Floating music button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-4 left-4 sm:bottom-20 sm:left-6 z-50 p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full text-white shadow-lg"
                aria-label="Toggle music player"
            >
                <motion.div
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
                >
                    <HiMusicNote className="w-5 h-5" />
                </motion.div>
            </motion.button>

            {/* Music player panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-20 left-4 sm:bottom-36 sm:left-6 z-50 w-72 cosmic-card rounded-2xl overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/20 to-green-600/20 border-b border-[var(--border-color)]">
                            <div className="flex items-center gap-2">
                                <FaSpotify className="w-5 h-5 text-green-500" />
                                <span className="text-sm font-medium text-[var(--text-primary)]">Cosmic Playlist</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-[var(--bg-secondary)] rounded transition-colors"
                            >
                                <HiX className="w-4 h-4 text-[var(--text-muted)]" />
                            </button>
                        </div>

                        {/* Current track */}
                        <div className="p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="text-3xl">{playlist[currentTrack].albumArt}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-[var(--text-primary)] truncate">
                                        {playlist[currentTrack].title}
                                    </p>
                                    <p className="text-sm text-[var(--text-muted)] truncate">
                                        {playlist[currentTrack].artist}
                                    </p>
                                </div>
                            </div>

                            {/* Fake progress bar */}
                            <div className="h-1 bg-[var(--bg-secondary)] rounded-full mb-4 overflow-hidden">
                                <motion.div
                                    className="h-full bg-green-500"
                                    animate={{ width: isPlaying ? '100%' : '0%' }}
                                    transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
                                />
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={toggleMute}
                                    className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    {isMuted ? <HiVolumeOff className="w-5 h-5" /> : <HiVolumeUp className="w-5 h-5" />}
                                </button>

                                <div className="flex items-center gap-2">
                                    <motion.button
                                        onClick={togglePlay}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-3 bg-green-500 rounded-full text-white"
                                    >
                                        {isPlaying ? <HiPause className="w-5 h-5" /> : <HiPlay className="w-5 h-5" />}
                                    </motion.button>
                                </div>

                                <button
                                    onClick={() => openInSpotify(playlist[currentTrack].spotifyUrl)}
                                    className="p-2 text-green-500 hover:text-green-400 transition-colors"
                                >
                                    <FaSpotify className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Playlist */}
                        <div className="border-t border-[var(--border-color)] max-h-40 overflow-y-auto">
                            {playlist.map((track, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentTrack(index);
                                        setIsPlaying(true);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-[var(--bg-secondary)] transition-colors ${index === currentTrack ? 'bg-green-500/10' : ''
                                        }`}
                                >
                                    <span className="text-lg">{track.albumArt}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm truncate ${index === currentTrack ? 'text-green-500 font-medium' : 'text-[var(--text-primary)]'}`}>
                                            {track.title}
                                        </p>
                                        <p className="text-xs text-[var(--text-muted)] truncate">{track.artist}</p>
                                    </div>
                                    {index === currentTrack && isPlaying && (
                                        <div className="flex gap-0.5">
                                            {[...Array(3)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-0.5 bg-green-500"
                                                    animate={{ height: [4, 12, 4] }}
                                                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Open in Spotify */}
                        <a
                            href="https://open.spotify.com/playlist/37i9dQZF1DX5trt9i14X7j"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-center py-2 text-xs text-green-500 hover:text-green-400 border-t border-[var(--border-color)] transition-colors"
                        >
                            Open Full Playlist on Spotify
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
