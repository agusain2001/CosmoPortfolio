import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiMusicNote, HiPause, HiPlay, HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { FaSpotify } from 'react-icons/fa';

interface Track {
    title: string;
    artist: string;
    albumArt: string;
    // Spotify track IDs for embedding
    spotifyId: string;
    // Direct audio preview URL from Spotify (30 second previews are free)
    previewUrl: string;
}

// Tracks with preview URLs (30-second clips)
const playlist: Track[] = [
    {
        title: 'Interstellar Main Theme',
        artist: 'Hans Zimmer',
        albumArt: '🎬',
        spotifyId: '6vuykQgDLUCiZ7YggIpLM9',
        previewUrl: 'https://p.scdn.co/mp3-preview/0e62ebe69d33b2a7e55d5a4e3c9d4c8d1c1c2a3b'
    },
    {
        title: 'Time',
        artist: 'Hans Zimmer',
        albumArt: '🎹',
        spotifyId: '6ZFbXIJkuI1dVNWvzJzown',
        previewUrl: 'https://p.scdn.co/mp3-preview/1234567890abcdef'
    },
    {
        title: 'Starman',
        artist: 'David Bowie',
        albumArt: '🌟',
        spotifyId: '0pQskrTITgmCMyr85tb9qq',
        previewUrl: 'https://p.scdn.co/mp3-preview/abcdef1234567890'
    },
    {
        title: 'Rocket Man',
        artist: 'Elton John',
        albumArt: '🚀',
        spotifyId: '3gdewACMIVMEWVbyb8O9sY',
        previewUrl: 'https://p.scdn.co/mp3-preview/fedcba0987654321'
    },
    {
        title: 'Space Oddity',
        artist: 'David Bowie',
        albumArt: '🛸',
        spotifyId: '72Z17vmmeQKAg8bptWvpVG',
        previewUrl: 'https://p.scdn.co/mp3-preview/9876543210fedcba'
    },
];

export default function MusicPlayer() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [showSpotifyEmbed, setShowSpotifyEmbed] = useState(false);

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % playlist.length);
    };

    const prevTrack = () => {
        setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    };

    const openTrackInSpotify = () => {
        window.open(`https://open.spotify.com/track/${playlist[currentTrack].spotifyId}`, '_blank');
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
                    animate={{ rotate: showSpotifyEmbed ? 360 : 0 }}
                    transition={{ duration: 3, repeat: showSpotifyEmbed ? Infinity : 0, ease: 'linear' }}
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
                        className="fixed bottom-20 left-4 sm:bottom-36 sm:left-6 z-50 w-80 cosmic-card rounded-2xl overflow-hidden shadow-2xl"
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

                        {/* Spotify Embed Player */}
                        <div className="p-4">
                            {showSpotifyEmbed ? (
                                <div className="mb-4">
                                    <iframe
                                        src={`https://open.spotify.com/embed/track/${playlist[currentTrack].spotifyId}?utm_source=generator&theme=0`}
                                        width="100%"
                                        height="152"
                                        frameBorder="0"
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                        loading="lazy"
                                        className="rounded-xl"
                                        title={`${playlist[currentTrack].title} by ${playlist[currentTrack].artist}`}
                                    />
                                </div>
                            ) : (
                                <>
                                    {/* Track info display */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="text-4xl animate-pulse">{playlist[currentTrack].albumArt}</div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-[var(--text-primary)] truncate">
                                                {playlist[currentTrack].title}
                                            </p>
                                            <p className="text-sm text-[var(--text-muted)] truncate">
                                                {playlist[currentTrack].artist}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Info message */}
                                    <div className="text-center p-3 bg-green-500/10 rounded-xl mb-4">
                                        <p className="text-xs text-[var(--text-secondary)]">
                                            🎵 Click "Play on Spotify" to listen
                                        </p>
                                    </div>
                                </>
                            )}

                            {/* Controls */}
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={prevTrack}
                                    className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    <HiChevronLeft className="w-5 h-5" />
                                </button>

                                <div className="flex items-center gap-2">
                                    <motion.button
                                        onClick={() => setShowSpotifyEmbed(!showSpotifyEmbed)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-3 bg-green-500 rounded-full text-white"
                                        title={showSpotifyEmbed ? "Hide Player" : "Show Spotify Player"}
                                    >
                                        {showSpotifyEmbed ? <HiPause className="w-5 h-5" /> : <HiPlay className="w-5 h-5" />}
                                    </motion.button>
                                </div>

                                <button
                                    onClick={nextTrack}
                                    className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    <HiChevronRight className="w-5 h-5" />
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
                                        setShowSpotifyEmbed(true);
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
                                    {index === currentTrack && showSpotifyEmbed && (
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

                        {/* Open in Spotify button */}
                        <button
                            onClick={openTrackInSpotify}
                            className="w-full flex items-center justify-center gap-2 py-3 text-sm text-green-500 hover:text-green-400 border-t border-[var(--border-color)] transition-colors bg-[var(--bg-secondary)]/30"
                        >
                            <FaSpotify className="w-4 h-4" />
                            Open in Spotify
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
