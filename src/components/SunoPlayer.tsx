import { useState, useRef, useCallback, useEffect } from "react";
import { fetchSunoMeta } from "../lib/fetchSunoTitle";
import { useI18n } from "../lib/i18n";
import nepp1963Logo from "../assets/nepp1963-logo.webp";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Trash2, ChevronUp,
  Plus, Download, Upload, Music, ListMusic, ExternalLink,
  ArrowDownAZ, ArrowUpZA, RotateCcw, FolderPlus, FolderOpen, ChevronDown, ChevronRight, X,
  Pencil, Check, Undo2, Volume2, VolumeX, Volume1, Lock, Unlock
} from "lucide-react";

type PendingUndo =
  | { kind: "song"; song: Song; index: number; orderIndex: number; label: string }
  | { kind: "folder"; name: string; affectedSongIds: string[]; folderIndex: number; folderOrderIndex: number; label: string };

const STORAGE_KEY = "suno-playlist-v1";
const RESUME_KEY = "suno-resume-v1";

interface Song {
  id: string;
  url: string;
  audioUrl: string;
  title: string;
  image?: string;
  folder?: string;
}

type SortMode = "original" | "az" | "za";
type FolderSortMode = "original" | "az" | "za";

function extractSunoId(url: string): string | null {
  const match = url.match(/suno\.(?:com|ai)\/(?:song|s)\/([a-f0-9-]+)/i);
  if (match) return match[1];
  const uuidMatch = url.match(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i);
  return uuidMatch ? uuidMatch[0] : null;
}

function extractSunoLinks(text: string): string[] {
  const links = new Set<string>();
  const urlPattern = /https?:\/\/suno\.(?:com|ai)\/(?:song|s)\/[a-f0-9-]+(?:[^\s,]*)?/gi;
  const idPattern = /\b[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\b/gi;
  for (const match of text.matchAll(urlPattern)) links.add(match[0]);
  if (links.size === 0) {
    for (const match of text.matchAll(idPattern)) links.add(match[0]);
  }
  return [...links];
}

function extractSunoTitle(url: string): string {
  const id = extractSunoId(url);
  return id ? `SUNO Track — ${id.slice(0, 8)}` : "Unknown Track";
}

export default function SunoPlayer() {
  const { t } = useI18n();
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sortMode, setSortMode] = useState<SortMode>("original");
  const [originalOrder, setOriginalOrder] = useState<string[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [folderOrder, setFolderOrder] = useState<string[]>([]);
  const [folderSortMode, setFolderSortMode] = useState<FolderSortMode>("original");
  const [lockedFolders, setLockedFolders] = useState<string[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderParent, setNewFolderParent] = useState<string>("");
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [pasteMode, setPasteMode] = useState<"auto" | "manual">("auto");
  const [assignFolderSongId, setAssignFolderSongId] = useState<string | null>(null);
  const [editingSongId, setEditingSongId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const [editingFolderName, setEditingFolderName] = useState("");
  const [repeat, setRepeat] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [pendingUndo, setPendingUndo] = useState<PendingUndo | null>(null);
  const [infoModal, setInfoModal] = useState<null | "about" | "disclaimer">(null);
  const undoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [volume, setVolume] = useState<number>(() => {
    if (typeof window === "undefined") return 1;
    const v = parseFloat(localStorage.getItem("suno-volume") || "1");
    return isNaN(v) ? 1 : Math.min(1, Math.max(0, v));
  });
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("suno-muted") === "1";
  });
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeTimeRef = useRef<number | null>(null);

  const currentSong = currentIndex >= 0 && currentIndex < songs.length ? songs[currentIndex] : null;

  const addSong = useCallback((url: string) => {
    const trimmed = url.trim();
    const sunoId = extractSunoId(trimmed);
    if (!sunoId) return false;
    const songId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const song: Song = {
      id: songId,
      url: trimmed,
      audioUrl: `https://cdn1.suno.ai/${sunoId}.mp3`,
      title: extractSunoTitle(trimmed),
    };
    setSongs((prev) => [...prev, song]);
    setOriginalOrder((prev) => [...prev, songId]);
    fetchSunoMeta({ data: sunoId }).then((meta) => {
      if (meta) {
        setSongs((prev) =>
          prev.map((s) =>
            s.id === songId
              ? { ...s, ...(meta.title ? { title: meta.title } : {}), ...(meta.image ? { image: meta.image } : {}) }
              : s
          )
        );
      }
    });
    return true;
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const addSongsFromText = useCallback((text: string) => {
    const links = extractSunoLinks(text);
    if (links.length === 0) return false;
    links.forEach((link) => addSong(link));
    return true;
  }, [addSong]);

  const clearLinkInput = useCallback(() => {
    setLinkInput("");
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const handleAddLink = () => {
    const value = linkInput || inputRef.current?.value || "";
    if (addSongsFromText(value)) clearLinkInput();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAddLink();
  };

  const showUndo = (undo: PendingUndo) => {
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setPendingUndo(undo);
    undoTimerRef.current = setTimeout(() => setPendingUndo(null), 8000);
  };

  const removeSong = (id: string) => {
    const idx = songs.findIndex((s) => s.id === id);
    if (idx < 0) return;
    const song = songs[idx];
    const orderIndex = originalOrder.indexOf(id);
    setSongs((prev) => {
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
    setOriginalOrder((prev) => prev.filter((sid) => sid !== id));
    showUndo({ kind: "song", song, index: idx, orderIndex, label: `${t("deletedSong")} "${song.title}"` });
  };

  const undoDelete = () => {
    if (!pendingUndo) return;
    if (pendingUndo.kind === "song") {
      const { song, index, orderIndex } = pendingUndo;
      setSongs((prev) => {
        const next = [...prev];
        next.splice(Math.min(index, next.length), 0, song);
        return next;
      });
      setOriginalOrder((prev) => {
        if (prev.includes(song.id)) return prev;
        const next = [...prev];
        next.splice(Math.min(orderIndex < 0 ? next.length : orderIndex, next.length), 0, song.id);
        return next;
      });
    } else {
      const { name, affectedSongIds, folderIndex, folderOrderIndex } = pendingUndo;
      setFolders((prev) => {
        if (prev.includes(name)) return prev;
        const next = [...prev];
        next.splice(Math.min(folderIndex, next.length), 0, name);
        return next;
      });
      setFolderOrder((prev) => {
        if (prev.includes(name)) return prev;
        const next = [...prev];
        next.splice(Math.min(folderOrderIndex < 0 ? next.length : folderOrderIndex, next.length), 0, name);
        return next;
      });
      setExpandedFolders((prev) => new Set([...prev, name]));
      setSongs((prev) =>
        prev.map((s) => (affectedSongIds.includes(s.id) ? { ...s, folder: name } : s))
      );
    }
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setPendingUndo(null);
  };

  const moveSong = (id: string, direction: -1 | 1) => {
    let movedToIdx: number | null = null;
    let movedFromIdx: number | null = null;
    setSongs((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx < 0) return prev;
      const song = prev[idx];
      const groupKey = song.folder ?? null;
      const groupIndices = prev
        .map((s, i) => ({ s, i }))
        .filter(({ s }) => (s.folder ?? null) === groupKey)
        .map(({ i }) => i);
      const posInGroup = groupIndices.indexOf(idx);
      const newPosInGroup = posInGroup + direction;
      if (newPosInGroup < 0 || newPosInGroup >= groupIndices.length) return prev;
      const swapWithIdx = groupIndices[newPosInGroup];
      movedFromIdx = idx;
      movedToIdx = swapWithIdx;
      const next = [...prev];
      [next[idx], next[swapWithIdx]] = [next[swapWithIdx], next[idx]];
      return next;
    });
    if (movedFromIdx !== null && movedToIdx !== null) {
      if (currentIndex === movedFromIdx) setCurrentIndex(movedToIdx);
      else if (currentIndex === movedToIdx) setCurrentIndex(movedFromIdx);
    }
    setSortMode("original");
    setOriginalOrder((prev) => {
      const a = prev.indexOf(id);
      if (a < 0) return prev;
      const target = a + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[a], next[target]] = [next[target], next[a]];
      return next;
    });
  };

  const sortSongs = (mode: SortMode) => {
    setSortMode(mode);
    const currentSongId = currentSong?.id;
    setSongs((prev) => {
      let sorted: Song[];
      if (mode === "az") {
        sorted = [...prev].sort((a, b) => a.title.localeCompare(b.title));
      } else if (mode === "za") {
        sorted = [...prev].sort((a, b) => b.title.localeCompare(a.title));
      } else {
        sorted = [...prev].sort((a, b) => originalOrder.indexOf(a.id) - originalOrder.indexOf(b.id));
      }
      if (currentSongId) {
        const newIdx = sorted.findIndex((s) => s.id === currentSongId);
        if (newIdx >= 0) setCurrentIndex(newIdx);
      }
      return sorted;
    });
  };

  const playSong = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
    const targetFolder = songs[index]?.folder;
    if (targetFolder) {
      setExpandedFolders((prev) => (prev.has(targetFolder) ? prev : new Set([...prev, targetFolder])));
    }
  };

  const togglePlay = () => {
    if (currentIndex < 0 && songs.length > 0) {
      const targetFolder = songs[0]?.folder;
      setExpandedFolders(targetFolder ? new Set([targetFolder]) : new Set());
      playSong(0);
      return;
    }
    setIsPlaying((p) => {
      const next = !p;
      if (next) {
        const targetFolder = songs[currentIndex]?.folder;
        setExpandedFolders(targetFolder ? new Set([targetFolder]) : new Set());
      }
      return next;
    });
  };

  // Focus the now-playing song's folder (collapse others) — used when tapping the player
  const focusCurrentFolder = () => {
    const targetFolder = songs[currentIndex]?.folder;
    setExpandedFolders(targetFolder ? new Set([targetFolder]) : new Set());
  };

  // Display order: folders (in folder order) then unfoldered
  const displayOrder = (() => {
    const list: number[] = [];
    folders.forEach((f) => {
      songs.forEach((s, i) => { if (s.folder === f) list.push(i); });
    });
    songs.forEach((s, i) => { if (!s.folder) list.push(i); });
    return list;
  })();

  const playNext = () => {
    if (songs.length === 0) return;
    const order = displayOrder;
    const pos = order.indexOf(currentIndex);
    const next = pos < 0 ? order[0] : order[(pos + 1) % order.length];
    playSong(next);
  };

  const playPrev = () => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setProgress(0);
      return;
    }
    if (songs.length === 0) return;
    const order = displayOrder;
    const pos = order.indexOf(currentIndex);
    const prev = pos <= 0 ? order[order.length - 1] : order[pos - 1];
    playSong(prev);
  };

  const playNextFolder = () => {
    if (songs.length === 0) return;
    const currentFolder = songs[currentIndex]?.folder ?? null;
    // Build ordered folder list including null (unfoldered) at end
    const ordered: (string | null)[] = [...folders, null];
    const idx = ordered.indexOf(currentFolder);
    for (let i = 1; i <= ordered.length; i++) {
      const f = ordered[(idx + i) % ordered.length];
      const firstSongIdx = songs.findIndex((s) => (s.folder ?? null) === f);
      if (firstSongIdx >= 0) { playSong(firstSongIdx); return; }
    }
  };

  const playPrevFolder = () => {
    if (songs.length === 0) return;
    const currentFolder = songs[currentIndex]?.folder ?? null;
    const ordered: (string | null)[] = [...folders, null];
    const idx = ordered.indexOf(currentFolder);
    const start = idx < 0 ? 0 : idx;
    for (let i = 1; i <= ordered.length; i++) {
      const f = ordered[(start - i + ordered.length) % ordered.length];
      const firstSongIdx = songs.findIndex((s) => (s.folder ?? null) === f);
      if (firstSongIdx >= 0) { playSong(firstSongIdx); return; }
    }
  };

  const shufflePlay = () => {
    if (songs.length === 0) return;
    let next = Math.floor(Math.random() * songs.length);
    if (songs.length > 1) {
      while (next === currentIndex) next = Math.floor(Math.random() * songs.length);
    }
    // Collapse all folders, then expand only the one containing the song
    const targetFolder = songs[next]?.folder;
    setExpandedFolders(targetFolder ? new Set([targetFolder]) : new Set());
    playSong(next);
  };

  // Folder management
  const buildFolderName = (parent: string, leaf: string) =>
    parent ? `${parent}/${leaf}` : leaf;
  const folderLeaf = (full: string) => full.split("/").pop() || full;
  const folderDepth = (full: string) => full.split("/").length - 1;
  const folderParent = (full: string) => {
    const parts = full.split("/");
    parts.pop();
    return parts.join("/");
  };

  const addFolder = () => {
    const leaf = newFolderName.trim();
    if (!leaf || leaf.includes("/")) {
      setNewFolderName("");
      setShowFolderInput(false);
      return;
    }
    if (!folders.includes(leaf)) {
      setFolders((prev) => [...prev, leaf]);
      setFolderOrder((prev) => [...prev, leaf]);
      setExpandedFolders((prev) => new Set([...prev, leaf]));
    }
    setNewFolderName("");
    setShowFolderInput(false);
  };

  const collapseAllFolders = () => setExpandedFolders(new Set());

  const removeFolder = (name: string) => {
    if (lockedFolders.includes(name)) return;
    // Collect this folder + all descendants
    const affectedFolders = folders.filter((f) => f === name || f.startsWith(name + "/"));
    const affectedSongs = songs.filter((s) => s.folder && affectedFolders.includes(s.folder));
    const songCount = affectedSongs.length;
    const confirmMsg =
      `⚠️ DELETE FOLDER "${folderLeaf(name)}"?\n\n` +
      `This action is IRREVERSIBLE once the page is reloaded.\n` +
      `${songCount > 0 ? `${songCount} song${songCount === 1 ? "" : "s"} inside will be moved out of this folder.\n` : ""}` +
      `\nMake sure you have SAVED your playlist to a file first, or you may lose your folder structure for good.\n\n` +
      `Continue with deletion?`;
    if (typeof window !== "undefined" && !window.confirm(confirmMsg)) return;
    const affectedSongIds = affectedSongs.map((s) => s.id);
    const folderIndex = folders.indexOf(name);
    const folderOrderIndex = folderOrder.indexOf(name);
    setFolders((prev) => prev.filter((f) => !affectedFolders.includes(f)));
    setFolderOrder((prev) => prev.filter((f) => !affectedFolders.includes(f)));
    setSongs((prev) => prev.map((s) => (s.folder && affectedFolders.includes(s.folder) ? { ...s, folder: undefined } : s)));
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      affectedFolders.forEach((f) => next.delete(f));
      return next;
    });
    showUndo({ kind: "folder", name, affectedSongIds, folderIndex, folderOrderIndex, label: `${t("deletedFolder")} "${folderLeaf(name)}"` });
  };

  const toggleLockFolder = (name: string) => {
    setLockedFolders((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  };

  const moveFolder = (name: string, direction: -1 | 1) => {
    setFolderSortMode("original");
    setFolders((prev) => {
      // Move within same parent group
      const parent = folderParent(name);
      const siblings = prev.filter((f) => folderParent(f) === parent);
      const i = siblings.indexOf(name);
      const target = i + direction;
      if (target < 0 || target >= siblings.length) return prev;
      const swapName = siblings[target];
      // Find indices in prev and swap
      const next = [...prev];
      const a = next.indexOf(name);
      const b = next.indexOf(swapName);
      [next[a], next[b]] = [next[b], next[a]];
      return next;
    });
    setFolderOrder((prev) => {
      const parent = folderParent(name);
      const siblings = prev.filter((f) => folderParent(f) === parent);
      const i = siblings.indexOf(name);
      const target = i + direction;
      if (target < 0 || target >= siblings.length) return prev;
      const swapName = siblings[target];
      const next = [...prev];
      const a = next.indexOf(name);
      const b = next.indexOf(swapName);
      [next[a], next[b]] = [next[b], next[a]];
      return next;
    });
  };

  const sortFolders = (mode: FolderSortMode) => {
    setFolderSortMode(mode);
    setFolders((prev) => {
      if (mode === "original") {
        return [...prev].sort((a, b) => folderOrder.indexOf(a) - folderOrder.indexOf(b));
      }
      // Sort hierarchically: keep parent before children, sort siblings by leaf name
      const sorted = [...prev].sort((a, b) => {
        const da = folderDepth(a);
        const db = folderDepth(b);
        if (da !== db) {
          // If different depths, sort by full path so parents come before children
          return a.localeCompare(b);
        }
        const cmp = folderLeaf(a).localeCompare(folderLeaf(b));
        return mode === "az" ? cmp : -cmp;
      });
      return sorted;
    });
  };

  const startEditFolder = (name: string) => {
    setEditingFolder(name);
    setEditingFolderName(folderLeaf(name));
  };

  const commitEditFolder = () => {
    if (!editingFolder) return;
    const oldName = editingFolder;
    const newLeaf = editingFolderName.trim();
    setEditingFolder(null);
    setEditingFolderName("");
    if (!newLeaf || newLeaf.includes("/") || newLeaf === folderLeaf(oldName)) return;
    const parent = folderParent(oldName);
    const newName = buildFolderName(parent, newLeaf);
    if (folders.includes(newName)) return;
    const renameOne = (f: string) =>
      f === oldName ? newName : f.startsWith(oldName + "/") ? newName + f.slice(oldName.length) : f;
    setFolders((prev) => prev.map(renameOne));
    setFolderOrder((prev) => prev.map(renameOne));
    setSongs((prev) => prev.map((s) => (s.folder ? { ...s, folder: renameOne(s.folder) } : s)));
    setLockedFolders((prev) => prev.map(renameOne));
    setExpandedFolders((prev) => {
      const next = new Set<string>();
      prev.forEach((f) => next.add(renameOne(f)));
      return next;
    });
  };

  const toggleFolder = (name: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const assignToFolder = (songId: string, folder: string | undefined) => {
    setSongs((prev) => prev.map((s) => (s.id === songId ? { ...s, folder } : s)));
    setAssignFolderSongId(null);
  };

  const startEditTitle = (song: Song) => {
    setEditingSongId(song.id);
    setEditingTitle(song.title);
  };

  const commitEditTitle = () => {
    if (!editingSongId) return;
    const newTitle = editingTitle.trim();
    if (newTitle) {
      setSongs((prev) => prev.map((s) => (s.id === editingSongId ? { ...s, title: newTitle } : s)));
    }
    setEditingSongId(null);
    setEditingTitle("");
  };

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      let loadedSongs: Song[] = [];
      if (raw) {
        const data = JSON.parse(raw);
        if (data && Array.isArray(data.songs)) {
          loadedSongs = data.songs;
          setSongs(data.songs);
          setOriginalOrder(data.originalOrder || data.songs.map((s: Song) => s.id));
          if (Array.isArray(data.folders)) setFolders(data.folders);
          if (Array.isArray(data.folderOrder)) setFolderOrder(data.folderOrder);
          else if (Array.isArray(data.folders)) setFolderOrder(data.folders);
          if (Array.isArray(data.lockedFolders)) setLockedFolders(data.lockedFolders);
        }
      }
      // Restore last played song + position
      const resumeRaw = localStorage.getItem(RESUME_KEY);
      if (resumeRaw && loadedSongs.length > 0) {
        const resume = JSON.parse(resumeRaw);
        if (resume?.songId) {
          const idx = loadedSongs.findIndex((s) => s.id === resume.songId);
          if (idx >= 0) {
            setCurrentIndex(idx);
            resumeTimeRef.current = typeof resume.time === "number" ? resume.time : 0;
            const f = loadedSongs[idx]?.folder;
            if (f) setExpandedFolders(new Set([f]));
          }
        }
      }
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever playlist or folders change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ songs, folders, folderOrder, lockedFolders, originalOrder })
      );
    } catch { /* ignore */ }
  }, [songs, folders, folderOrder, lockedFolders, originalOrder, hydrated]);

  // Persist current playback position (throttled by timeupdate firing rate)
  useEffect(() => {
    if (!hydrated) return;
    if (!currentSong) {
      try { localStorage.removeItem(RESUME_KEY); } catch { /* ignore */ }
      return;
    }
    try {
      localStorage.setItem(RESUME_KEY, JSON.stringify({ songId: currentSong.id, time: progress }));
    } catch { /* ignore */ }
  }, [currentSong, progress, hydrated]);

  // Warn before exit
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (songs.length > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [songs.length]);

  const currentAudioUrl = currentSong?.audioUrl ?? "";
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (currentAudioUrl) {
      const sameSrc = audio.src.endsWith(currentAudioUrl) || audio.src === currentAudioUrl;
      if (!sameSrc) {
        audio.src = currentAudioUrl;
        audio.load();
        if (resumeTimeRef.current && resumeTimeRef.current > 0) {
          const target = resumeTimeRef.current;
          resumeTimeRef.current = null;
          const onLoaded = () => {
            try { audio.currentTime = target; setProgress(target); } catch { /* ignore */ }
            audio.removeEventListener("loadedmetadata", onLoaded);
          };
          audio.addEventListener("loadedmetadata", onLoaded);
        }
      }
      if (isPlaying) {
        if (audio.paused) audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    } else {
      audio.pause();
      audio.src = "";
    }
  }, [currentAudioUrl, isPlaying]);

  // Apply & persist volume / mute
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.muted = muted;
    }
    try {
      localStorage.setItem("suno-volume", String(volume));
      localStorage.setItem("suno-muted", muted ? "1" : "0");
    } catch { /* ignore */ }
  }, [volume, muted, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onDur = () => setDuration(audio.duration || 0);
    const onEnd = () => {
      if (repeat && audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
        return;
      }
      playNext();
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onDur);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onDur);
      audio.removeEventListener("ended", onEnd);
    };
  }, [songs.length, currentIndex, repeat]);

  // Keep the folder of the currently playing song open at all times
  useEffect(() => {
    if (!isPlaying || currentIndex < 0) return;
    const targetFolder = songs[currentIndex]?.folder;
    if (!targetFolder) return;
    setExpandedFolders((prev) => (prev.has(targetFolder) ? prev : new Set([...prev, targetFolder])));
  }, [isPlaying, currentIndex, songs]);


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
    const payload = {
      version: 2,
      songs: songs.map((s) => ({ url: s.url, title: s.title, folder: s.folder })),
      folders,
      folderOrder,
      lockedFolders,
    };
    const data = JSON.stringify(payload, null, 2);
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
        const raw = JSON.parse(reader.result as string);
        const songList: any[] = Array.isArray(raw) ? raw : Array.isArray(raw?.songs) ? raw.songs : [];
        const explicitFolders: string[] | null = !Array.isArray(raw) && Array.isArray(raw?.folders) ? raw.folders : null;
        const explicitFolderOrder: string[] | null = !Array.isArray(raw) && Array.isArray(raw?.folderOrder) ? raw.folderOrder : null;
        const explicitLocked: string[] | null = !Array.isArray(raw) && Array.isArray(raw?.lockedFolders) ? raw.lockedFolders : null;

        setSongs([]);
        setCurrentIndex(-1);
        setIsPlaying(false);
        setOriginalOrder([]);
        const loadedFolders = new Set<string>();
        songList.forEach((s: any) => {
          if (s?.folder) loadedFolders.add(s.folder);
          if (s?.url) addSong(s.url);
        });
        // Merge song-derived folders with explicitly saved (possibly empty) folders
        const allFolders = new Set<string>([
          ...loadedFolders,
          ...(explicitFolders ?? []),
        ]);
        if (allFolders.size > 0) {
          setFolders((prev) => [...new Set([...prev, ...allFolders])]);
          const orderSeed = explicitFolderOrder ?? [...allFolders];
          setFolderOrder((prev) => [...new Set([...prev, ...orderSeed, ...allFolders])]);
        }
        if (explicitLocked && explicitLocked.length > 0) {
          setLockedFolders((prev) => [...new Set([...prev, ...explicitLocked])]);
        }
        // Assign folders after songs are added
        setTimeout(() => {
          setSongs((prev) =>
            prev.map((song, i) => {
              const matchingData = songList[i];
              if (matchingData?.folder) return { ...song, folder: matchingData.folder };
              return song;
            })
          );
        }, 100);
      } catch { /* ignore */ }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Group songs by folder for display
  const unfoldered = songs.filter((s) => !s.folder);
  const songsByFolder = folders.map((f) => ({
    name: f,
    songs: songs.filter((s) => s.folder === f),
  }));

  // Hide folder rows whose ancestor is collapsed
  const isFolderVisible = (name: string): boolean => {
    let parent = folderParent(name);
    while (parent) {
      if (!expandedFolders.has(parent)) return false;
      parent = folderParent(parent);
    }
    return true;
  };

  // Position-in-siblings helpers for the per-folder up/down buttons
  const siblingPos = (name: string): { idx: number; total: number } => {
    const parent = folderParent(name);
    const siblings = folders.filter((f) => folderParent(f) === parent);
    return { idx: siblings.indexOf(name), total: siblings.length };
  };

  const renderSongItem = (song: Song, posInGroup: number, groupSize: number) => {
    const globalIndex = songs.indexOf(song);
    const isFirst = posInGroup === 0;
    const isLast = posInGroup === groupSize - 1;
    return (
      <motion.div
        key={song.id}
        layout
        initial={hydrated ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ layout: { type: "spring", stiffness: 500, damping: 40 } }}
        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl mb-1 group cursor-pointer transition-colors ${
          globalIndex === currentIndex
            ? "bg-primary/10 border border-primary/20"
            : "hover:bg-secondary/60"
        }`}
        onClick={() => playSong(globalIndex)}
      >
        {/* Up/Down move buttons */}
        <div className="flex flex-col gap-0.5 shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); moveSong(song.id, -1); }}
            disabled={isFirst}
            className="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title={t("moveUp")}
            aria-label={t("moveUp")}
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); moveSong(song.id, 1); }}
            disabled={isLast}
            className="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title={t("moveDown")}
            aria-label={t("moveDown")}
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 overflow-hidden">
          {globalIndex === currentIndex && isPlaying ? (
            <div className="relative w-full h-full flex items-center justify-center">
              {song.image ? (
                <img src={song.image} alt="" className="w-full h-full object-cover" />
              ) : null}
              <div className="absolute inset-0 flex items-end justify-center gap-px pb-1 bg-black/30">
                <span className="w-0.5 bg-white animate-bounce" style={{ height: "8px", animationDelay: "0ms" }} />
                <span className="w-0.5 bg-white animate-bounce" style={{ height: "12px", animationDelay: "150ms" }} />
                <span className="w-0.5 bg-white animate-bounce" style={{ height: "6px", animationDelay: "300ms" }} />
              </div>
            </div>
          ) : song.image ? (
            <img src={song.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs font-mono text-muted-foreground">{globalIndex + 1}</span>
          )}
        </div>
        <div className="min-w-0 flex-1" onClick={(e) => editingSongId === song.id && e.stopPropagation()}>
          {editingSongId === song.id ? (
            <input
              autoFocus
              type="text"
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitEditTitle();
                if (e.key === "Escape") { setEditingSongId(null); setEditingTitle(""); }
              }}
              onBlur={commitEditTitle}
              onClick={(e) => e.stopPropagation()}
              className="w-full rounded-md bg-input px-2 py-1 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          ) : (
            <p className={`text-sm truncate ${globalIndex === currentIndex ? "text-primary font-medium" : "text-foreground"}`}>
              {song.title}
            </p>
          )}
          {song.folder && !editingSongId && (
            <p className="text-[10px] text-muted-foreground truncate">{song.folder}</p>
          )}
        </div>
        {folders.length > 0 && (
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setAssignFolderSongId(assignFolderSongId === song.id ? null : song.id); }}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              title={t("assignToFolder")}
            >
              <FolderOpen className="w-3.5 h-3.5" />
            </button>
            {assignFolderSongId === song.id && (
              <div className="absolute right-0 top-8 z-50 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[140px]">
                <button
                  onClick={(e) => { e.stopPropagation(); assignToFolder(song.id, undefined); }}
                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-secondary transition-colors text-muted-foreground"
                >
                  {t("noFolder")}
                </button>
                {folders.map((f) => (
                  <button
                    key={f}
                    onClick={(e) => { e.stopPropagation(); assignToFolder(song.id, f); }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-secondary transition-colors ${song.folder === f ? "text-primary font-medium" : "text-foreground"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {editingSongId === song.id ? (
          <button
            onClick={(e) => { e.stopPropagation(); commitEditTitle(); }}
            className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-all"
            title={t("saveTitle")}
          >
            <Check className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={(e) => { e.stopPropagation(); startEditTitle(song); }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
            title={t("editTitle")}
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        )}
        <a
          href={song.url.startsWith("http") ? song.url : `https://suno.com/song/${extractSunoId(song.url)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
          title={t("openOnSuno")}
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <button
          onClick={(e) => { e.stopPropagation(); removeSong(song.id); }}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
          title={t("removeSong")}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8 px-4">
      <audio ref={audioRef} preload="auto" />
      <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={loadPlaylist} />

      <div className="w-full max-w-2xl mb-8 mt-12 sm:mt-8">
        <div className="flex items-center gap-3 mb-2">
          <a
            href="https://suno.com/@nepp1963"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:opacity-90 transition-opacity"
            title="Open nepp1963 on SUNO"
            aria-label="Open nepp1963 on SUNO in a new tab"
          >
            <img
              src={nepp1963Logo}
              alt="nepp1963 logo"
              className="w-9 h-9 rounded-md object-cover ring-1 ring-border"
            />
          </a>
          <h1 className="text-2xl font-bold text-foreground tracking-tight font-[var(--font-display)]">
            <a
              href="https://suno.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              title="Open SUNO home"
            >
              SUNO
            </a>{" "}
            {t("title").replace(/^SUNO\s*/i, "")}
          </h1>
        </div>
        <p className="text-muted-foreground text-sm ml-[52px]">
          {t("subtitle")}
        </p>
      </div>

      <div
        className="w-full max-w-2xl mb-6 rounded-2xl bg-card p-5 border border-border"
        style={{ boxShadow: "0 0 40px var(--glow)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            type="button"
            onClick={() => currentSong && focusCurrentFolder()}
            className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden relative focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            title={currentSong ? "Show this song's folder" : undefined}
            aria-label={currentSong ? "Show this song's folder" : "Now playing"}
          >
            {currentSong?.image ? (
              <img src={currentSong.image} alt={currentSong.title} className="w-full h-full object-cover" />
            ) : (
              <Music className="w-6 h-6 text-primary/40" />
            )}
            {currentSong && (
              <div className="absolute inset-0 flex items-end justify-center gap-[3px] pb-1 bg-black/30">
                <span className="w-[3px] bg-white rounded-full animate-[playbar1_0.8s_ease-in-out_infinite]" />
                <span className="w-[3px] bg-white rounded-full animate-[playbar2_0.8s_ease-in-out_infinite_0.2s]" />
                <span className="w-[3px] bg-white rounded-full animate-[playbar3_0.8s_ease-in-out_infinite_0.4s]" />
                <span className="w-[3px] bg-white rounded-full animate-[playbar4_0.8s_ease-in-out_infinite_0.1s]" />
              </div>
            )}
          </button>
          <button
            type="button"
            onClick={() => currentSong && focusCurrentFolder()}
            className="min-w-0 flex-1 text-left focus:outline-none"
            aria-label={currentSong ? "Show this song's folder" : "Now playing"}
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {t("nowPlaying")}
              {currentSong?.folder && (
                <span className="ml-2 normal-case tracking-normal text-primary/80">📁 {currentSong.folder}</span>
              )}
            </p>
            {currentSong ? (
              <div className="marquee-mask">
                <span className={isPlaying ? "marquee-track text-foreground font-semibold" : "inline-block text-foreground font-semibold whitespace-nowrap"}>
                  {currentSong.title}
                  {isPlaying && <span aria-hidden="true">{"   •   "}{currentSong.title}</span>}
                </span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic truncate">—</p>
            )}
          </button>
          {currentSong && (
            <>
              <a
                href={currentSong.url.startsWith("http") ? currentSong.url : `https://suno.com/song/${extractSunoId(currentSong.url)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors shrink-0"
                title={t("openOnSuno")}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentIndex(-1);
                  setProgress(0);
                  setExpandedFolders(new Set());
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                  }
                }}
                className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                title={t("clearCurrentSong")}
                aria-label={t("clearCurrentSong")}
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
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
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => setMuted((m) => !m)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors shrink-0"
            title={muted ? t("unmute") : t("mute")}
          >
            {muted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : volume < 0.5 ? (
              <Volume1 className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setVolume(v);
              if (muted && v > 0) setMuted(false);
            }}
            className="flex-1 h-1.5 accent-primary cursor-pointer"
            aria-label={t("volume")}
          />
          <span className="text-[10px] text-muted-foreground tabular-nums w-8 text-right">
            {Math.round((muted ? 0 : volume) * 100)}%
          </span>
        </div>
      </div>

      <div className="w-full max-w-2xl flex items-center justify-center gap-2 sm:gap-3 mb-6 flex-wrap">
        <button onClick={shufflePlay} className="p-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors" title={t("shuffle")}>
          <Shuffle className="w-5 h-5" />
        </button>
        <button onClick={playPrev} className="p-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors" title={t("back")}>
          <SkipBack className="w-5 h-5" />
        </button>
        <button onClick={togglePlay} className="p-4 rounded-2xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-lg" style={{ boxShadow: "0 0 24px var(--glow)" }} title={isPlaying ? t("pause") : t("play")}>
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button onClick={playNext} className="p-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors" title={t("next")}>
          <SkipForward className="w-5 h-5" />
        </button>
        {folders.length > 0 && (
          <button
            onClick={playNextFolder}
            className="p-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-1"
            title={t("nextFolder")}
            aria-label={t("nextFolder")}
          >
            <FolderOpen className="w-4 h-4" />
            <SkipForward className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={() => setRepeat((r) => !r)}
          className={`p-3 rounded-xl transition-colors ${repeat ? "bg-primary/20 text-primary ring-2 ring-primary/40" : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"}`}
          title={repeat ? t("repeatOn") : t("repeatOff")}
          aria-pressed={repeat}
        >
          <Repeat className="w-5 h-5" />
        </button>
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-2 mb-4">
        <div className="flex gap-2">
          <div className="flex-1 min-w-0 relative">
            <input
              ref={inputRef}
              type="url"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder={t("pasteLink")}
              value={linkInput}
              onChange={(e) => {
                const val = e.target.value;
                setLinkInput(val);
                // Mobile fallback: onPaste sometimes lacks clipboardData on phones.
                // If auto-mode and value already contains a valid SUNO link, add it.
                if (pasteMode === "auto") {
                  const lines = val.split(/[\s,]+/).filter(Boolean);
                  const sunoLines = lines.filter((l) => extractSunoId(l));
                  if (sunoLines.length > 0 && sunoLines.length === lines.length) {
                    sunoLines.forEach((l) => addSong(l));
                    window.setTimeout(() => {
                      setLinkInput("");
                      if (inputRef.current) inputRef.current.value = "";
                    }, 1200);
                  }
                }
              }}
              onKeyDown={handleKeyDown}
              onPaste={(e) => {
                const text = e.clipboardData?.getData("text") || "";
                if (!text) return; // let default paste happen (mobile fallback handled by onChange)
                e.preventDefault();
                setLinkInput(text);
                if (inputRef.current) inputRef.current.value = text;
                if (pasteMode === "auto") {
                  const lines = text.split(/[\s,]+/).filter(Boolean);
                  const sunoLines = lines.filter((l) => extractSunoId(l));
                  if (sunoLines.length > 0) {
                    sunoLines.forEach((l) => addSong(l));
                    window.setTimeout(() => {
                      setLinkInput("");
                      if (inputRef.current) inputRef.current.value = "";
                    }, 1800);
                  }
                }
              }}
              className="w-full rounded-xl bg-input pl-4 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-shadow text-ellipsis"
            />
            {linkInput && (
              <button
                type="button"
                onClick={() => {
                  setLinkInput("");
                  if (inputRef.current) inputRef.current.value = "";
                  inputRef.current?.focus();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                title={t("clearInput")}
                aria-label={t("clearInput")}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button onClick={handleAddLink} className="rounded-xl bg-primary text-primary-foreground px-4 py-3 hover:opacity-90 transition-opacity flex items-center gap-2 text-sm font-medium">
            <Plus className="w-4 h-4" /> {t("add")}
          </button>
        </div>
        <div className="flex items-center justify-end gap-1 text-[11px]">
          <span className="text-muted-foreground mr-1">{t("onPaste")}</span>
          <button
            type="button"
            onClick={() => setPasteMode("auto")}
            className={`px-2 py-0.5 rounded-md transition-colors ${pasteMode === "auto" ? "bg-primary/20 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
            title={t("autoLoad")}
            aria-pressed={pasteMode === "auto"}
          >
            {t("autoLoad")}
          </button>
          <button
            type="button"
            onClick={() => setPasteMode("manual")}
            className={`px-2 py-0.5 rounded-md transition-colors ${pasteMode === "manual" ? "bg-primary/20 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
            title={t("manualMode")}
            aria-pressed={pasteMode === "manual"}
          >
            {t("manualMode")}
          </button>
        </div>
      </div>

      <div className="w-full max-w-2xl flex gap-2 mb-6">
        <button onClick={savePlaylist} disabled={songs.length === 0} className="flex-1 rounded-xl bg-secondary text-secondary-foreground px-4 py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-40">
          <Download className="w-4 h-4" /> {t("savePlaylist")}
        </button>
        <button onClick={() => fileInputRef.current?.click()} className="flex-1 rounded-xl bg-secondary text-secondary-foreground px-4 py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors">
          <Upload className="w-4 h-4" /> {t("loadPlaylist")}
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
        <div className="flex items-center gap-2 px-5 pt-4 pb-2 flex-wrap">
          <ListMusic className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            {t("playlist")} ({songs.length} {songs.length === 1 ? t("track") : t("tracks")})
          </span>
          <div className="flex-1" />
          {/* Sort buttons */}
          {songs.length > 1 && (
            <div className="flex gap-1">
              <button
                onClick={() => sortSongs("az")}
                className={`p-1.5 rounded-lg transition-colors ${sortMode === "az" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                title={t("sortAZ")}
              >
                <ArrowDownAZ className="w-4 h-4" />
              </button>
              <button
                onClick={() => sortSongs("za")}
                className={`p-1.5 rounded-lg transition-colors ${sortMode === "za" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                title={t("sortZA")}
              >
                <ArrowUpZA className="w-4 h-4" />
              </button>
              <button
                onClick={() => sortSongs("original")}
                className={`p-1.5 rounded-lg transition-colors ${sortMode === "original" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                title={t("originalOrder")}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}
          {/* Folder sort buttons */}
          {folders.length > 1 && (
            <div className="flex gap-1">
              <button
                onClick={() => sortFolders("az")}
                className={`p-1.5 rounded-lg transition-colors ${folderSortMode === "az" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                title={t("sortFoldersAZ")}
              >
                <FolderOpen className="w-3.5 h-3.5 inline" />
                <ArrowDownAZ className="w-3 h-3 inline -ml-0.5" />
              </button>
              <button
                onClick={() => sortFolders("za")}
                className={`p-1.5 rounded-lg transition-colors ${folderSortMode === "za" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                title={t("sortFoldersZA")}
              >
                <FolderOpen className="w-3.5 h-3.5 inline" />
                <ArrowUpZA className="w-3 h-3 inline -ml-0.5" />
              </button>
              <button
                onClick={() => sortFolders("original")}
                className={`p-1.5 rounded-lg transition-colors ${folderSortMode === "original" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                title={t("originalFolderOrder")}
              >
                <FolderOpen className="w-3.5 h-3.5 inline" />
                <RotateCcw className="w-3 h-3 inline -ml-0.5" />
              </button>
            </div>
          )}
          {/* Collapse all folders */}
          {folders.length > 0 && expandedFolders.size > 0 && (
            <button
              onClick={collapseAllFolders}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              title={t("collapseAll")}
              aria-label={t("collapseAll")}
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          )}
          {/* Folder create button */}
          <button
            onClick={() => setShowFolderInput(!showFolderInput)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            title={t("createFolder")}
          >
            <FolderPlus className="w-4 h-4" />
          </button>
        </div>

        {/* Folder creation input */}
        {showFolderInput && (
          <div className="flex flex-col sm:flex-row gap-2 px-5 pb-2">
            <input
              autoFocus
              type="text"
              placeholder={t("folderPlaceholder")}
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addFolder();
                if (e.key === "Escape") { setNewFolderName(""); setShowFolderInput(false); }
              }}
              className="flex-1 rounded-lg bg-input px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
            />
            <div className="flex gap-2">
              <button onClick={addFolder} className="flex-1 sm:flex-none rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs font-medium hover:opacity-90">
                {t("create")}
              </button>
              <button
                onClick={() => { setNewFolderName(""); setShowFolderInput(false); }}
                className="flex-1 sm:flex-none rounded-lg bg-secondary text-secondary-foreground px-3 py-1.5 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        )}

        {songs.length === 0 && folders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Music className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm">{t("dropHint")}</p>
          </div>
        ) : (
          <>
            {/* Folder sections (hierarchical) */}
            {songsByFolder.map(({ name, songs: folderSongs }) => {
              if (!isFolderVisible(name)) return null;
              const depth = folderDepth(name);
              const { idx: sIdx, total: sTotal } = siblingPos(name);
              const isLocked = lockedFolders.includes(name);
              const leaf = folderLeaf(name);
              return (
                <motion.div
                  key={name}
                  layout
                  transition={{ layout: { type: "spring", stiffness: 500, damping: 40 } }}
                  className="px-3 mb-1"
                  style={{ paddingLeft: `${12 + depth * 16}px` }}
                >
                  <div
                    className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-secondary/40 transition-colors cursor-pointer group"
                    onClick={() => editingFolder !== name && toggleFolder(name)}
                  >
                    {/* Move buttons for folders */}
                    <div className="flex flex-col gap-0.5 shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); moveFolder(name, -1); }}
                        disabled={sIdx === 0}
                        className="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title={t("moveFolderUp")}
                        aria-label={t("moveFolderUp")}
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); moveFolder(name, 1); }}
                        disabled={sIdx === sTotal - 1}
                        className="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title={t("moveFolderDown")}
                        aria-label={t("moveFolderDown")}
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                    {expandedFolders.has(name) ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
                    <FolderOpen className="w-3.5 h-3.5 text-primary shrink-0" />
                    {editingFolder === name ? (
                      <input
                        autoFocus
                        type="text"
                        value={editingFolderName}
                        onChange={(e) => setEditingFolderName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") commitEditFolder();
                          if (e.key === "Escape") { setEditingFolder(null); setEditingFolderName(""); }
                        }}
                        onBlur={commitEditFolder}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 min-w-0 rounded-md bg-input px-2 py-0.5 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring"
                      />
                    ) : (
                      <>
                        <span className="text-xs font-medium text-foreground truncate">{leaf}</span>
                        <span className="text-[10px] text-muted-foreground">({folderSongs.length})</span>
                      </>
                    )}
                    <div className="flex-1" />
                    {/* Lock toggle */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLockFolder(name); }}
                      className={`p-1 rounded transition-all ${isLocked ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                      title={isLocked ? t("unlockFolder") : t("lockFolder")}
                      aria-pressed={isLocked}
                    >
                      {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                    </button>
                    {editingFolder === name ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); commitEditFolder(); }}
                        className="p-1 rounded text-primary hover:bg-primary/10 transition-all"
                        title={t("saveFolderName")}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); startEditFolder(name); }}
                        className="p-1 rounded text-muted-foreground hover:text-primary transition-all"
                        title={t("renameFolder")}
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); removeFolder(name); }}
                      disabled={isLocked}
                      className="p-1 rounded text-muted-foreground hover:text-destructive transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      title={isLocked ? t("lockedFolderHint") : t("removeFolder")}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className={`pl-4 ${expandedFolders.has(name) ? "min-h-[12px]" : "min-h-0"}`}>
                    {expandedFolders.has(name) && (
                      <AnimatePresence>
                        {folderSongs.length === 0 ? (
                          <p className="text-[11px] text-muted-foreground italic px-2 py-1.5">{t("emptyFolder")}</p>
                        ) : (
                          folderSongs.map((song, index) => renderSongItem(song, index, folderSongs.length))
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                </motion.div>
              );
            })}


            {/* Unfoldered songs */}
            <div className="px-3 pb-3 min-h-[12px]">
              <AnimatePresence>
                {(folders.length > 0 ? unfoldered : songs).map((song, index, arr) =>
                  renderSongItem(song, index, arr.length)
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      <p className="w-full max-w-2xl mt-3 text-xs text-muted-foreground text-center px-2">
        {t("autosaveNote")}
        <br />
        {t("warnSaveNote").split("{save}").map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 && <span className="font-medium text-foreground">{t("saveLabel")}</span>}
          </span>
        ))}
      </p>

      {/* About + Disclaimer links */}
      <div className="w-full max-w-2xl mt-2 flex justify-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => setInfoModal("about")}
          className="rounded-lg bg-secondary text-secondary-foreground px-3 py-1.5 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {t("aboutLink")}
        </button>
        <button
          type="button"
          onClick={() => setInfoModal("disclaimer")}
          className="rounded-lg bg-secondary text-secondary-foreground px-3 py-1.5 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {t("disclaimerLink")}
        </button>
      </div>

      <AnimatePresence>
        {infoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setInfoModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-card border border-border rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                <h2 className="text-base font-semibold text-foreground">
                  {infoModal === "about" ? t("aboutTitle") : t("disclaimerTitle")}
                </h2>
                <button
                  onClick={() => setInfoModal(null)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  aria-label={t("close")}
                  title={t("close")}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="px-5 py-4 overflow-y-auto text-sm text-foreground whitespace-pre-line leading-relaxed">
                {infoModal === "about" ? t("aboutBody") : t("disclaimerBody")}
              </div>
              <div className="px-5 py-3 border-t border-border flex justify-end">
                <button
                  onClick={() => setInfoModal(null)}
                  className="rounded-lg bg-primary text-primary-foreground px-4 py-1.5 text-xs font-medium hover:opacity-90 transition-opacity"
                >
                  {t("close")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {dragOver && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
          <div className="bg-primary/20 backdrop-blur-sm rounded-3xl px-8 py-6 border-2 border-primary">
            <p className="text-primary font-semibold text-lg">{t("dropOverlay")}</p>
          </div>
        </div>
      )}

      <AnimatePresence>
        {pendingUndo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-xl bg-card border border-border shadow-lg px-4 py-2.5"
          >
            <span className="text-sm text-foreground">{pendingUndo.label}</span>
            <button
              onClick={undoDelete}
              className="flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <Undo2 className="w-3.5 h-3.5" /> {t("undo")}
            </button>
            <button
              onClick={() => { if (undoTimerRef.current) clearTimeout(undoTimerRef.current); setPendingUndo(null); }}
              className="p-1 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              title={t("dismiss")}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-6 mb-0 text-sm text-muted-foreground text-center">
        {t("playerBy")}{" "}
        <a
          href="https://suno.com/@nepp1963"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          nepp1963
        </a>{" "}
        {t("playsMusicFrom")}{" "}
        <a
          href="https://suno.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          suno.com
        </a>
      </footer>
    </div>
  );
}
