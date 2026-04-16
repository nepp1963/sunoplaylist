import { useState, useRef, useCallback, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { fetchSunoTitle } from "../lib/fetchSunoTitle";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, SkipForward, Shuffle, Trash2, GripVertical,
  Plus, Download, Upload, Music, ListMusic, Volume2
} from "lucide-react";

interface Song {
  id: string;
  url: string;
  audioUrl: string;
  title: string;
}

function extractSunoId(url: string): string | null {
  // Support suno.com/song/ID, suno.ai/song/ID, and bare UUIDs
  const match = url.match(/suno\.(?:com|ai)\/(?:song|s)\/([a-f0-9-]+)/i);
  if (match) return match[1];
  // Also accept a bare UUID
  const uuidMatch = url.match(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i);
  return uuidMatch ? uuidMatch[0] : null;
}

function extractSunoTitle(url: string): string {
  const id = extractSunoId(url);
  return id ? `Suno Track — ${id.slice(0, 8)}` : "Unknown Track";
}

export default function SunoPlayer() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentSong = currentIndex >= 0 && currentIndex < songs.length ? songs[currentIndex] : null;

  const addSong = useCallback((url: string) => {
    const trimmed = url.trim();
    const sunoId = extractSunoId(trimmed);
    if (!sunoId) return false;
    const songId = crypto.randomUUID();
    const song: Song = {
      id: songId,
      url: trimmed,
      audioUrl: `https://cdn1.suno.ai/${sunoId}.mp3`,
      title: extractSunoTitle(trimmed),
    };
    setSongs((prev) => [...prev, song]);
    // Fetch real title from Suno in background
    fetchSunoTitle({ data: sunoId }).then((title) => {
      if (title) {
        setSongs((prev) =>
          prev.map((s) => (s.id === songId ? { ...s, title } : s))
        );
      }
    });
    return true;
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddLink = () => {
    // Use both state and ref value as fallback
    const value = linkInput || inputRef.current?.value || "";
    if (addSong(value)) {
      setLinkInput("");
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text/plain").trim();
    if (pasted && extractSunoId(pasted)) {
      e.preventDefault();
      if (addSong(pasted)) {
        setLinkInput("");
        if (inputRef.current) inputRef.current.value = "";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAddLink();
  };

  const removeSong = (id: string) => {
    setSongs((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      const newSongs = prev.filter((s) => s.id !== id);
      if (currentIndex >= newSongs.length) {
        setCurrentIndex(newSongs.length - 1);
      } else if (idx < currentIndex) {
        setCurrentIndex((i) => i - 1);
      } else if (idx === currentIndex) {
        setIsPlaying(false);
      }
      return newSongs;
    });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const from = result.source.index;
    const to = result.destination.index;
    setSongs((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      if (currentIndex === from) setCurrentIndex(to);
      else if (from < currentIndex && to >= currentIndex) setCurrentIndex((i) => i - 1);
      else if (from > currentIndex && to <= currentIndex) setCurrentIndex((i) => i + 1);
      return arr;
    });
  };

  const playSong = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (currentIndex < 0 && songs.length > 0) {
      playSong(0);
      return;
    }
    setIsPlaying((p) => !p);
  };

  const playNext = () => {
    if (songs.length === 0) return;
    const next = (currentIndex + 1) % songs.length;
    playSong(next);
  };

  const shufflePlay = () => {
    if (songs.length === 0) return;
    let next = Math.floor(Math.random() * songs.length);
    if (songs.length > 1) {
      while (next === currentIndex) next = Math.floor(Math.random() * songs.length);
    }
    playSong(next);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (currentSong) {
      if (audio.src !== currentSong.audioUrl) {
        audio.src = currentSong.audioUrl;
        audio.load();
      }
      if (isPlaying) audio.play().catch(() => {});
      else audio.pause();
    } else {
      audio.pause();
      audio.src = "";
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onDur = () => setDuration(audio.duration || 0);
    const onEnd = () => playNext();
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onDur);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onDur);
      audio.removeEventListener("ended", onEnd);
    };
  }, [songs.length, currentIndex]);

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const text = e.dataTransfer.getData("text/plain");
    if (text) {
      text.split(/[\n\r]+/).forEach((line) => addSong(line));
      return;
    }
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        if (file.type === "application/json" || file.name.endsWith(".json")) {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const data = JSON.parse(reader.result as string);
              if (Array.isArray(data)) data.forEach((s: any) => s.url && addSong(s.url));
            } catch { /* ignore */ }
          };
          reader.readAsText(file);
        }
      });
    }
  };

  const savePlaylist = () => {
    const data = JSON.stringify(songs.map((s) => ({ url: s.url, title: s.title })), null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Lovable's_Suno_Playlist.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const loadPlaylist = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        if (Array.isArray(data)) {
          setSongs([]);
          setCurrentIndex(-1);
          setIsPlaying(false);
          data.forEach((s: any) => s.url && addSong(s.url));
        }
      } catch { /* ignore */ }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8 px-4">
      <audio ref={audioRef} preload="auto" />
      <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={loadPlaylist} />

      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Music className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight font-[var(--font-display)]">
            Suno Playlist
          </h1>
        </div>
        <p className="text-muted-foreground text-sm ml-[52px]">
          Drop Suno links or paste them below to build your playlist
        </p>
      </div>

      <AnimatePresence mode="wait">
        {currentSong && (
          <motion.div
            key={currentSong.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-full max-w-2xl mb-6 rounded-2xl bg-card p-5 border border-border"
            style={{ boxShadow: "0 0 40px var(--glow)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Volume2 className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Now Playing</p>
                <p className="text-foreground font-semibold truncate">{currentSong.title}</p>
              </div>
            </div>
            <div className="cursor-pointer" onClick={seekTo}>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-200"
                  style={{ width: duration ? `${(progress / duration) * 100}%` : "0%" }}
                />
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
              <span>{formatTime(progress)}</span>
              <span>{duration ? formatTime(duration) : "--:--"}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-2xl flex items-center justify-center gap-3 mb-6">
        <button onClick={shufflePlay} className="p-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors" title="Shuffle">
          <Shuffle className="w-5 h-5" />
        </button>
        <button onClick={togglePlay} className="p-4 rounded-2xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-lg" style={{ boxShadow: "0 0 24px var(--glow)" }}>
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button onClick={playNext} className="p-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors" title="Next">
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      <div className="w-full max-w-2xl flex gap-2 mb-4">
        <input
          ref={inputRef}
          type="text"
          placeholder="Paste a Suno song link (e.g. https://suno.com/song/...)"
          value={linkInput}
          onChange={(e) => setLinkInput(e.target.value)}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-xl bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-shadow"
        />
        <button onClick={handleAddLink} className="rounded-xl bg-primary text-primary-foreground px-4 py-3 hover:opacity-90 transition-opacity flex items-center gap-2 text-sm font-medium">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="w-full max-w-2xl flex gap-2 mb-6">
        <button onClick={savePlaylist} disabled={songs.length === 0} className="flex-1 rounded-xl bg-secondary text-secondary-foreground px-4 py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-40">
          <Download className="w-4 h-4" /> Save Playlist
        </button>
        <button onClick={() => fileInputRef.current?.click()} className="flex-1 rounded-xl bg-secondary text-secondary-foreground px-4 py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors">
          <Upload className="w-4 h-4" /> Load Playlist
        </button>
      </div>

      <div
        className={`w-full max-w-2xl rounded-2xl border-2 border-dashed transition-colors min-h-[200px] ${
          dragOver ? "border-primary bg-primary/5" : "border-border bg-card/50"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleFileDrop}
      >
        <div className="flex items-center gap-2 px-5 pt-4 pb-2">
          <ListMusic className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            Playlist ({songs.length} {songs.length === 1 ? "track" : "tracks"})
          </span>
        </div>

        {songs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Music className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm">Drop Suno links here or use the input above</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="playlist">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="px-3 pb-3">
                  <AnimatePresence>
                    {songs.map((song, index) => (
                      <Draggable key={song.id} draggableId={song.id} index={index}>
                        {(provided, snapshot) => (
                          <motion.div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl mb-1 group cursor-pointer transition-colors ${
                              index === currentIndex
                                ? "bg-primary/10 border border-primary/20"
                                : snapshot.isDragging
                                  ? "bg-secondary"
                                  : "hover:bg-secondary/60"
                            }`}
                            onClick={() => playSong(index)}
                          >
                            <div {...provided.dragHandleProps} className="text-muted-foreground hover:text-foreground transition-colors cursor-grab">
                              <GripVertical className="w-4 h-4" />
                            </div>
                            <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-xs font-mono text-muted-foreground">
                              {index === currentIndex && isPlaying ? (
                                <div className="flex items-end gap-px h-3">
                                  <span className="w-0.5 bg-primary animate-bounce" style={{ height: "8px", animationDelay: "0ms" }} />
                                  <span className="w-0.5 bg-primary animate-bounce" style={{ height: "12px", animationDelay: "150ms" }} />
                                  <span className="w-0.5 bg-primary animate-bounce" style={{ height: "6px", animationDelay: "300ms" }} />
                                </div>
                              ) : (
                                index + 1
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className={`text-sm truncate ${index === currentIndex ? "text-primary font-medium" : "text-foreground"}`}>
                                {song.title}
                              </p>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); removeSong(song.id); }}
                              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                  </AnimatePresence>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>

      {dragOver && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
          <div className="bg-primary/20 backdrop-blur-sm rounded-3xl px-8 py-6 border-2 border-primary">
            <p className="text-primary font-semibold text-lg">Drop Suno links here</p>
          </div>
        </div>
      )}
    </div>
  );
}
