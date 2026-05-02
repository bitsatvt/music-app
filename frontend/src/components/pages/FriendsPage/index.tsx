'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from 'next-themes';
import {
  Search, UserPlus, Users, X, Check, Trophy,
  ArrowLeft, Filter, Sun, Moon, UserMinus,
} from 'lucide-react';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import {
  getFriends,
  getIncomingRequests,
  getOutgoingRequests,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  cancelFriendRequest,
  removeFriend,
  searchUsers,
} from '@/lib/api';

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Friend {
  user_id: number;
  username: string;
  points?: number;
  level?: number;
  isOnline?: boolean;
  lastActive?: string;
}

interface FriendRequest {
  user_id: number;
  username: string;
  createdAt?: string;
}

// ─── Default Avatar ────────────────────────────────────────────────────────────
function DefaultAvatar({ name = '', size = 40 }: { name?: string; size?: number }) {
  const initials = name.split(' ').slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('');
  const palette = [
    { bg: '#2d2d4e', text: '#a78bfa' },
    { bg: '#1e3a2f', text: '#34d399' },
    { bg: '#2d1f3d', text: '#c084fc' },
    { bg: '#3d2020', text: '#f87171' },
    { bg: '#1e2d3d', text: '#60a5fa' },
    { bg: '#3d3020', text: '#fbbf24' },
  ];
  const color = palette[(name.charCodeAt(0) || 0) % palette.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color.bg, color: color.text,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.35, fontWeight: 600, flexShrink: 0, userSelect: 'none',
      border: '2px solid rgba(255,255,255,0.08)',
    }}>
      {initials || (
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
      )}
    </div>
  );
}

// ─── Online Dot ────────────────────────────────────────────────────────────────
function OnlineDot({ isOnline }: { isOnline?: boolean }) {
  if (!isOnline) return null;
  return (
    <span style={{
      position: 'absolute', bottom: 1, right: 1,
      width: 10, height: 10, borderRadius: '50%',
      background: '#22c55e', border: '2px solid #1a1a2e',
    }} />
  );
}

// ─── Dark Mode Toggle ──────────────────────────────────────────────────────────
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 50,
        width: 52, height: 52, borderRadius: 14,
        background: '#7c3aed', border: 'none', color: '#fff',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(124,58,237,0.4)', transition: 'transform 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

// ─── Request Row ───────────────────────────────────────────────────────────────
function RequestRow({ req, type, onAccept, onDecline }: {
  req: FriendRequest; type: 'incoming' | 'outgoing';
  onAccept: (r: FriendRequest) => void; onDecline: (r: FriendRequest) => void;
}) {
  const [loading, setLoading] = useState<'accept' | 'decline' | null>(null);
  const handle = async (action: 'accept' | 'decline') => {
    setLoading(action);
    try {
      if (type === 'incoming') {
        if (action === 'accept') { await acceptFriendRequest(req.user_id); onAccept(req); }
        else { await declineFriendRequest(req.user_id); onDecline(req); }
      } else { await cancelFriendRequest(req.user_id); onDecline(req); }
    } finally { setLoading(null); }
  };
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
      borderRadius: 10, background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.06)', borderLeft: '3px solid #7c3aed',
    }}>
      <div style={{ position: 'relative' }}><DefaultAvatar name={req.username} size={42} /></div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#f0eff8' }}>{req.username}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
          {req.createdAt ?? (type === 'incoming' ? 'wants to be friends' : 'request pending')}
        </div>
      </div>
      {type === 'incoming' && (
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => handle('accept')} disabled={!!loading} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px',
            borderRadius: 8, background: '#16a34a', border: 'none', color: '#fff',
            fontSize: 13, fontWeight: 600, cursor: loading ? 'default' : 'pointer',
            opacity: loading ? 0.6 : 1, fontFamily: 'inherit',
          }}>
            <Check size={14} />{loading === 'accept' ? '…' : 'Accept'}
          </button>
          <button onClick={() => handle('decline')} disabled={!!loading} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
            borderRadius: 8, background: 'none', border: 'none',
            color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500,
            cursor: loading ? 'default' : 'pointer', fontFamily: 'inherit',
          }}>
            <X size={14} />{loading === 'decline' ? '…' : 'Decline'}
          </button>
        </div>
      )}
      {type === 'outgoing' && (
        <button onClick={() => handle('decline')} disabled={!!loading} style={{
          padding: '7px 14px', borderRadius: 8, background: 'none',
          border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)',
          fontSize: 13, cursor: loading ? 'default' : 'pointer', fontFamily: 'inherit',
        }}>
          {loading ? '…' : 'Cancel'}
        </button>
      )}
    </div>
  );
}

// ─── All Friends View ──────────────────────────────────────────────────────────
function AllFriendsView({ friends, onBack, onRemove }: {
  friends: Friend[]; onBack: () => void; onRemove: (id: number) => void;
}) {
  const { theme } = useTheme();
  const isDark = theme !== 'light';
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'points'>('recent');
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const filtered = [...friends]
    .filter((f) => f.username.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.username.localeCompare(b.username);
      if (sortBy === 'points') return (b.points ?? 0) - (a.points ?? 0);
      return 0;
    });

  const top10 = [...friends].sort((a, b) => (b.points ?? 0) - (a.points ?? 0)).slice(0, 10);
  const rankColor = (i: number) => i === 0 ? '#f59e0b' : i === 1 ? '#9ca3af' : i === 2 ? '#d97706' : 'rgba(255,255,255,0.3)';
  const sortLabels = { recent: 'Recently Added', name: 'Name (A–Z)', points: 'Highest Points' };

  const bg = isDark ? '#1a1a2e' : '#f3f4f6';
  const card = isDark ? 'rgba(255,255,255,0.04)' : '#fff';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const text = isDark ? '#f0eff8' : '#111';
  const muted = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const inputBg = isDark ? 'rgba(255,255,255,0.06)' : '#f9f9f9';

  return (
    <div style={{ minHeight: '100vh', background: bg, color: text, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <NavigationHeader isDarkMode={isDark} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <button onClick={onBack} style={{
          display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none',
          color: muted, cursor: 'pointer', fontSize: 14, fontFamily: 'inherit', marginBottom: '1.5rem',
        }}>
          <ArrowLeft size={16} /> Back to Friends
        </button>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>All Friends</h1>
            <Users size={28} style={{ color: '#a78bfa' }} />
            <span style={{ background: '#7c3aed', color: '#fff', fontSize: 14, fontWeight: 700, borderRadius: 99, padding: '2px 10px' }}>
              {friends.length}
            </span>
          </div>
          <p style={{ color: muted, marginTop: 6, fontSize: 14 }}>View and manage all your friends</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
          {/* Friends list */}
          <div style={{ background: card, borderRadius: 16, border: `1px solid ${border}`, padding: '1.5rem' }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: '1.5rem' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: muted }} />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search friends..."
                  style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: 10, border: `1px solid ${border}`, background: inputBg, color: text, fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div ref={sortRef} style={{ position: 'relative' }}>
                <button onClick={() => setSortOpen((o) => !o)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 10, border: `1px solid ${border}`, background: inputBg, color: text, fontSize: 14, fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  {sortLabels[sortBy]} <Filter size={14} style={{ color: muted }} />
                </button>
                {sortOpen && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 4px)', right: 0, background: isDark ? '#1f2040' : '#fff', border: `1px solid ${border}`, borderRadius: 10, overflow: 'hidden', zIndex: 10, minWidth: 180, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
                    {(['recent', 'name', 'points'] as const).map((opt) => (
                      <button key={opt} onClick={() => { setSortBy(opt); setSortOpen(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', fontSize: 13, border: 'none', background: sortBy === opt ? 'rgba(124,58,237,0.15)' : 'none', color: sortBy === opt ? '#a78bfa' : text, cursor: 'pointer', fontFamily: 'inherit', fontWeight: sortBy === opt ? 600 : 400 }}>
                        {sortLabels[opt]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {filtered.length === 0
                ? <div style={{ textAlign: 'center', padding: '2rem', color: muted, fontSize: 14 }}>No friends found</div>
                : filtered.map((f) => (
                  <div key={f.user_id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}>
                    <div style={{ position: 'relative' }}>
                      <DefaultAvatar name={f.username} size={44} />
                      <OnlineDot isOnline={f.isOnline} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: text }}>{f.username}</div>
                      <div style={{ fontSize: 12, color: muted, marginTop: 2 }}>
                        {f.level ? `Level ${f.level}` : ''}{f.level && f.lastActive ? ' • ' : ''}{f.lastActive ?? ''}
                      </div>
                    </div>
                    {f.points != null && (
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 18, fontWeight: 700, color: text }}>{f.points.toLocaleString()}</div>
                        <div style={{ fontSize: 11, color: muted }}>points</div>
                      </div>
                    )}
                    <button onClick={() => { removeFriend(f.user_id).then(() => onRemove(f.user_id)).catch(() => {}); }}
                      style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)', cursor: 'pointer', padding: 4, borderRadius: 6, display: 'flex', alignItems: 'center' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}>
                      <UserMinus size={16} />
                    </button>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Top 10 leaderboard */}
          <div style={{ background: card, borderRadius: 16, border: `1px solid ${border}`, padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
              <Trophy size={20} style={{ color: '#f59e0b' }} />
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Top 10 Friends</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {top10.length === 0
                ? <div style={{ color: muted, fontSize: 14, textAlign: 'center', padding: '1rem' }}>No data yet</div>
                : top10.map((f, i) => (
                  <div key={f.user_id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, background: i < 3 ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.03)', border: i < 3 ? '1px solid rgba(245,158,11,0.2)' : `1px solid ${border}` }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: rankColor(i), minWidth: 20, textAlign: 'center' }}>{i + 1}</span>
                    <DefaultAvatar name={f.username} size={36} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: text }}>{f.username}</div>
                      {f.points != null && <div style={{ fontSize: 12, color: muted }}>{f.points.toLocaleString()} pts</div>}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <ThemeToggle />
    </div>
  );
}

// ─── Main Friends Page ─────────────────────────────────────────────────────────
export default function FriendsPage() {
  const { theme } = useTheme();
  const isDark = theme !== 'light';

  const [showAllFriends, setShowAllFriends] = useState(false);
  const [requestTab, setRequestTab] = useState<'incoming' | 'outgoing'>('incoming');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [incoming, setIncoming] = useState<FriendRequest[]>([]);
  const [outgoing, setOutgoing] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [friendSearch, setFriendSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ user_id: number; username: string }[]>([]);
  const [searching, setSearching] = useState(false);
  const [sent, setSent] = useState(new Set<number>());
  const [searchError, setSearchError] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // TODO: replace mock data with real API calls when backend is running
    // (async () => {
    //   setLoading(true);
    //   try {
    //     const [f, inc, out] = await Promise.all([getFriends(), getIncomingRequests(), getOutgoingRequests()]);
    //     setFriends(f); setIncoming(inc); setOutgoing(out);
    //   } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Failed to load'); }
    //   finally { setLoading(false); }
    // })();
    setFriends([
      { user_id: 1, username: 'sarah_j', points: 24891, level: 15, isOnline: true, lastActive: 'now' },
      { user_id: 2, username: 'milo_t', points: 23456, level: 14, lastActive: '2h ago' },
      { user_id: 3, username: 'saoirse_r', points: 20964, level: 13, isOnline: true, lastActive: 'now' },
      { user_id: 4, username: 'tiago_d', points: 18543, level: 12, lastActive: '1 day ago' },
      { user_id: 5, username: 'jessica_w', points: 17234, level: 11, isOnline: true, lastActive: 'now' },
    ]);
    setIncoming([
      { user_id: 6, username: 'Lucas Wright', createdAt: '5 hours ago' },
      { user_id: 7, username: 'Sophie Anderson', createdAt: '2 days ago' },
    ]);
    setOutgoing([{ user_id: 8, username: 'lucy_m', createdAt: '1 week ago' }]);
    setLoading(false);
  }, []);

  const handleSearch = useCallback((val: string) => {
    setSearchQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!val.trim()) { setSearchResults([]); return; }
    debounceRef.current = setTimeout(async () => {
      setSearching(true); setSearchError('');
      try { const users = await searchUsers(val); setSearchResults(users); }
      catch (e: unknown) { setSearchError(e instanceof Error ? e.message : 'Search failed'); }
      finally { setSearching(false); }
    }, 350);
  }, []);

  const handleSend = async (user: { user_id: number; username: string }) => {
    try { await sendFriendRequest(user.user_id); setSent((prev) => new Set(prev).add(user.user_id)); }
    catch (e: unknown) { setSearchError(e instanceof Error ? e.message : 'Failed to send'); }
  };

  const filteredFriends = friends.filter((f) => f.username.toLowerCase().includes(friendSearch.toLowerCase()));

  // TODO: replace with real suggestions endpoint
  const suggested = [
    { user_id: 99, username: 'Jane Doe', level: 9 },
    { user_id: 98, username: 'Bob Clark', level: 11 },
  ];

  if (showAllFriends) {
    return <AllFriendsView friends={friends} onBack={() => setShowAllFriends(false)} onRemove={(id) => setFriends((prev) => prev.filter((f) => f.user_id !== id))} />;
  }

  const bg = isDark ? '#1a1a2e' : '#f3f4f6';
  const card = isDark ? 'rgba(255,255,255,0.04)' : '#fff';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const text = isDark ? '#f0eff8' : '#111';
  const muted = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const inputBg = isDark ? 'rgba(255,255,255,0.06)' : '#f9f9f9';
  const rowBg = isDark ? 'rgba(255,255,255,0.04)' : '#f9f9f9';
  const rowBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  return (
    <div style={{ minHeight: '100vh', background: bg, color: text, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <NavigationHeader isDarkMode={isDark} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Page header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>Friends</h1>
            <Users size={28} style={{ color: '#a78bfa' }} />
          </div>
          <p style={{ color: muted, marginTop: 6, fontSize: 14 }}>Connect with other musicians and compete on the leaderboard</p>
        </div>

        {error && <div style={{ fontSize: 13, color: '#f87171', marginBottom: 16 }}>{error}</div>}
        {loading && <div style={{ textAlign: 'center', color: muted, padding: '3rem' }}>Loading…</div>}

        {!loading && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>

            {/* ── Left column ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Friend Requests */}
              <div style={{ background: card, borderRadius: 16, border: `1px solid ${border}`, padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <UserPlus size={20} style={{ color: '#a78bfa' }} />
                    <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Friend Requests</h2>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => setRequestTab('incoming')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 99, background: requestTab === 'incoming' ? '#16a34a' : 'transparent', border: requestTab === 'incoming' ? 'none' : `1px solid ${border}`, color: requestTab === 'incoming' ? '#fff' : muted, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Received
                      {incoming.length > 0 && <span style={{ background: requestTab === 'incoming' ? 'rgba(255,255,255,0.3)' : '#7c3aed', color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 99, padding: '1px 7px' }}>{incoming.length}</span>}
                    </button>
                    <button onClick={() => setRequestTab('outgoing')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 99, background: 'transparent', border: `1px solid ${border}`, color: muted, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Sent
                      {outgoing.length > 0 && <span style={{ background: '#e24b4a', color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 99, padding: '1px 7px' }}>{outgoing.length}</span>}
                    </button>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: muted, marginBottom: '1rem' }}>
                  {requestTab === 'incoming' ? 'People who want to be your friend' : 'Your pending outgoing requests'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {requestTab === 'incoming' && (
                    incoming.length === 0
                      ? <div style={{ color: muted, fontSize: 14, textAlign: 'center', padding: '1rem' }}>No incoming requests</div>
                      : incoming.map((req) => (
                        <RequestRow key={req.user_id} req={req} type="incoming"
                          onAccept={(r) => { setIncoming((p) => p.filter((x) => x.user_id !== r.user_id)); setFriends((p) => [...p, { user_id: r.user_id, username: r.username }]); }}
                          onDecline={(r) => setIncoming((p) => p.filter((x) => x.user_id !== r.user_id))} />
                      ))
                  )}
                  {requestTab === 'outgoing' && (
                    outgoing.length === 0
                      ? <div style={{ color: muted, fontSize: 14, textAlign: 'center', padding: '1rem' }}>No outgoing requests</div>
                      : outgoing.map((req) => (
                        <RequestRow key={req.user_id} req={req} type="outgoing"
                          onAccept={() => {}}
                          onDecline={(r) => setOutgoing((p) => p.filter((x) => x.user_id !== r.user_id))} />
                      ))
                  )}
                </div>
              </div>

              {/* My Friends */}
              <div style={{ background: card, borderRadius: 16, border: `1px solid ${border}`, padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
                  <Users size={20} style={{ color: '#a78bfa' }} />
                  <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>My Friends</h2>
                  <button onClick={() => setShowAllFriends(true)} style={{ background: '#7c3aed', color: '#fff', fontSize: 13, fontWeight: 700, borderRadius: 99, padding: '2px 10px', border: 'none', cursor: 'pointer' }}>
                    {friends.length}
                  </button>
                </div>
                <div style={{ position: 'relative', marginBottom: '1rem' }}>
                  <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: muted }} />
                  <input value={friendSearch} onChange={(e) => setFriendSearch(e.target.value)} placeholder="Search friends..."
                    style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: 10, border: `1px solid ${border}`, background: inputBg, color: text, fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {filteredFriends.length === 0
                    ? <div style={{ color: muted, fontSize: 14, textAlign: 'center', padding: '1rem' }}>No friends found</div>
                    : filteredFriends.slice(0, 5).map((f) => (
                      <div key={f.user_id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, background: rowBg, border: `1px solid ${rowBorder}` }}>
                        <div style={{ position: 'relative' }}>
                          <DefaultAvatar name={f.username} size={38} />
                          <OnlineDot isOnline={f.isOnline} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: text }}>{f.username}</div>
                          <div style={{ fontSize: 12, color: muted }}>{f.level ? `Level ${f.level}` : ''}{f.level && f.lastActive ? ' • ' : ''}{f.lastActive ?? ''}</div>
                        </div>
                        {f.points != null && (
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 15, fontWeight: 700, color: text }}>{f.points.toLocaleString()}</div>
                            <div style={{ fontSize: 11, color: muted }}>pts</div>
                          </div>
                        )}
                      </div>
                    ))
                  }
                  {friends.length > 5 && (
                    <button onClick={() => setShowAllFriends(true)} style={{ width: '100%', padding: '10px', borderRadius: 10, background: 'none', border: `1px solid ${border}`, color: '#a78bfa', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginTop: 4 }}>
                      View all {friends.length} friends →
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── Right column — Add Friends ── */}
            <div style={{ background: card, borderRadius: 16, border: `1px solid ${border}`, padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
                <UserPlus size={20} style={{ color: '#a78bfa' }} />
                <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Add Friends</h2>
              </div>
              <input value={searchQuery} onChange={(e) => handleSearch(e.target.value)} placeholder="Search by username..."
                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `1px solid ${border}`, background: inputBg, color: text, fontSize: 14, fontFamily: 'inherit', outline: 'none', marginBottom: 10, boxSizing: 'border-box' }} />
              <button onClick={() => handleSearch(searchQuery)} style={{ width: '100%', padding: '11px', borderRadius: 10, background: '#7c3aed', border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Search size={16} /> Search
              </button>
              {searchError && <div style={{ fontSize: 12, color: '#f87171', marginBottom: 8 }}>{searchError}</div>}
              {searching && <div style={{ fontSize: 13, color: muted, textAlign: 'center', padding: '0.5rem' }}>Searching…</div>}
              {searchResults.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  {searchResults.map((user) => (
                    <div key={user.user_id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${border}` }}>
                      <DefaultAvatar name={user.username} size={36} />
                      <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: text }}>{user.username}</div>
                      <button onClick={() => handleSend(user)} disabled={sent.has(user.user_id)} style={{ padding: '6px 14px', borderRadius: 8, background: sent.has(user.user_id) ? 'none' : '#7c3aed', border: sent.has(user.user_id) ? `1px solid ${border}` : 'none', color: sent.has(user.user_id) ? muted : '#fff', fontSize: 12, fontWeight: 600, cursor: sent.has(user.user_id) ? 'default' : 'pointer', fontFamily: 'inherit' }}>
                        {sent.has(user.user_id) ? 'Sent' : 'Add'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: text, marginBottom: '0.75rem' }}>Suggested friends</div>
                {/* TODO: replace with real suggestions endpoint */}
                {suggested.map((user) => (
                  <div key={user.user_id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${border}` }}>
                    <DefaultAvatar name={user.username} size={40} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: text }}>{user.username}</div>
                      <div style={{ fontSize: 12, color: muted }}>Level {user.level}</div>
                    </div>
                    <button onClick={() => handleSend(user)} disabled={sent.has(user.user_id)} style={{ background: 'none', border: 'none', color: sent.has(user.user_id) ? muted : '#a78bfa', cursor: sent.has(user.user_id) ? 'default' : 'pointer', display: 'flex', alignItems: 'center' }}>
                      {sent.has(user.user_id) ? <Check size={18} /> : <UserPlus size={18} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <ThemeToggle />
    </div>
  );
}