import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationControls, useReducedMotion } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolio_data';
import { cn } from '../utils/cn';

const GREETING = {
  role: 'assistant',
  content: `Hi! I'm ${portfolioData.personalInfo.name.split(' ')[0]} — well, an AI version of me. Ask me about my skills, experience, projects, or anything about my work.`,
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showBubble, setShowBubble] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const botControls = useAnimationControls();
  const reduceMotion = useReducedMotion();

  // Periodic attention: wiggle the bot + pop a waving greeting bubble while closed.
  useEffect(() => {
    if (open || reduceMotion) return;
    let alive = true;
    const wiggle = () =>
      botControls.start({
        rotate: [0, -16, 13, -10, 8, 0],
        transition: { duration: 1.1, ease: 'easeInOut' },
      });
    const nudge = () => {
      if (!alive) return;
      wiggle();
      setShowBubble(true);
      setTimeout(() => alive && setShowBubble(false), 3500);
    };
    const first = setTimeout(nudge, 2500);
    const id = setInterval(nudge, 12000);
    return () => { alive = false; clearTimeout(first); clearInterval(id); };
  }, [open, reduceMotion, botControls]);

  const waveOnHover = () => {
    if (reduceMotion) return;
    botControls.start({
      rotate: [0, -16, 13, -10, 8, 0],
      transition: { duration: 0.9, ease: 'easeInOut' },
    });
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError('');
    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // strip the local-only greeting before sending
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Request failed');
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Greeting bubble — periodic attention nudge while closed */}
      <AnimatePresence>
        {showBubble && !open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-[4.75rem] right-5 z-50 cursor-pointer select-none rounded-2xl rounded-br-sm bg-black/85 backdrop-blur-xl border border-white/15 px-3.5 py-2 text-sm text-white shadow-2xl font-['DM_Sans'] print:hidden"
          >
            <span className="inline-flex items-center gap-1.5">
              <motion.span
                aria-hidden="true"
                animate={{ rotate: [0, 20, -8, 20, -8, 0] }}
                transition={{ duration: 1, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6 }}
                style={{ transformOrigin: '70% 80%' }}
              >
                👋
              </motion.span>
              Hi! Ask me anything
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={waveOnHover}
        aria-label={open ? 'Close chat' : 'Chat with Pradeep'}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full glass border border-white/20 text-white shadow-2xl hover:bg-white/10 hover:border-white/40 transition-all print:hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span className="block" animate={botControls} style={{ transformOrigin: '50% 70%' }}>
                <Bot size={26} />
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with Pradeep"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed z-50 flex flex-col bg-black/80 backdrop-blur-2xl border border-white/15 shadow-2xl print:hidden
                       inset-x-4 bottom-24 rounded-2xl
                       sm:inset-x-auto sm:right-5 sm:bottom-24 sm:w-[380px]
                       h-[60vh] sm:h-[520px] max-h-[70vh]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <img
                src="https://github.com/Mpradeep-dev.png"
                alt={portfolioData.personalInfo.name}
                className="w-9 h-9 rounded-full object-cover border border-white/15"
              />
              <div className="min-w-0">
                <p className="text-white font-bold font-['Syne'] leading-tight">Ask Pradeep</p>
                <p className="text-xs text-gray-400 font-['DM_Sans']">AI assistant · answers as me</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      "max-w-[85%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed font-['DM_Sans'] whitespace-pre-wrap break-words",
                      m.role === 'user'
                        ? 'bg-white/15 text-white rounded-br-sm'
                        : 'bg-white/5 text-gray-200 border border-white/10 rounded-bl-sm'
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="px-3.5 py-3 rounded-2xl bg-white/5 border border-white/10 rounded-bl-sm">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" />
                    </span>
                  </div>
                </div>
              )}

              {error && <p className="text-xs text-red-400/90 font-['DM_Sans'] px-1">{error}</p>}
            </div>

            {/* Input */}
            <div className="flex items-end gap-2 p-3 border-t border-white/10">
              <label htmlFor="chat-input" className="sr-only">Your message</label>
              <textarea
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                placeholder="Ask me anything about my work…"
                className="flex-1 resize-none bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-gray-500 font-['DM_Sans'] focus:outline-none focus:border-white/40 max-h-28"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 text-white hover:bg-white/25 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
