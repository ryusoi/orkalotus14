import React, { useState, useEffect } from "react";
import {
  Database,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Copy,
  Check,
  X,
  ShieldAlert,
  Radio,
} from "lucide-react";

interface FirebaseStatusResponse {
  connected: boolean;
  databaseUrl: string;
  hasSecret: boolean;
  rulesStatus: "open" | "permission_denied" | "unknown";
  writeAllowed: boolean;
  message: string;
  recentCount: number;
}

interface FirebaseSyncStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseSyncStatusModal: React.FC<FirebaseSyncStatusModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [status, setStatus] = useState<FirebaseStatusResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const RULES_SNIPPET = `{
  "rules": {
    ".read": true,
    ".write": true
  }
}`;

  const fetchStatus = async () => {
    setLoading(true);
    setSyncMessage(null);
    try {
      const res = await fetch("/api/ratings/status");
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch {
      // Keep existing state or display offline
    } finally {
      setLoading(false);
    }
  };

  const handleManualSync = async () => {
    setSyncing(true);
    setSyncMessage(null);
    try {
      const res = await fetch("/api/ratings/sync", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        if (data.status) {
          setStatus(data.status);
        }
        if (data.flushedCount !== undefined) {
          if (data.flushedCount > 0) {
            setSyncMessage(`Successfully flushed and synchronized ${data.flushedCount} review(s) to Firebase Realtime Database!`);
          } else if (data.status?.writeAllowed) {
            setSyncMessage("Firebase Realtime Database is in sync! All reviews are present.");
          } else {
            setSyncMessage("Firebase database connected, but write access is currently restricted by security rules.");
          }
        }
      }
    } catch (err: any) {
      setSyncMessage(`Sync check error: ${err?.message || "Could not complete request"}`);
    } finally {
      setSyncing(false);
    }
  };

  const handleCopyRules = () => {
    navigator.clipboard.writeText(RULES_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isWriteOpen = status?.writeAllowed || status?.rulesStatus === "open";

  return (
    <div
      id="firebase-status-modal-backdrop"
      className="fixed inset-0 z-[10010] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="firebase-status-modal-container"
        className="relative w-full max-w-lg bg-gradient-to-b from-[#0b1b2b] via-[#0d2235] to-[#081523] border-2 border-[#d4af37] rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-4 sm:p-6 text-white max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-[#e4bd77] border border-[#d4af37]/30">
              <Database size={20} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-serif flex items-center gap-2">
                Firebase Realtime Database
              </h3>
              <p className="text-xs text-[#c5a880]">orka-lotus-beach-marinaryu</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Live Status Card */}
        <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Regional Endpoint:</span>
            <span className="font-mono text-[#e4bd77] text-[11px] truncate max-w-[260px]">
              europe-west1.firebasedatabase.app
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Connection:</span>
            {loading ? (
              <span className="inline-flex items-center gap-1.5 text-slate-300 text-xs">
                <RefreshCw size={12} className="animate-spin text-amber-400" /> Checking...
              </span>
            ) : status?.connected ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Radio size={12} className="text-emerald-400 animate-pulse" /> Active (200 OK)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-rose-400 font-semibold">
                <AlertTriangle size={12} /> Disconnected
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Database Write Mode:</span>
            {loading ? (
              <span className="text-slate-400 text-xs">Verifying rules...</span>
            ) : isWriteOpen ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle2 size={13} /> Live Write Allowed (.write: true)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-amber-300 font-bold">
                <ShieldAlert size={13} /> Restricted by Rules (Permission Denied)
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Local & Server Preserved Reviews:</span>
            <span className="font-mono text-white font-bold bg-white/10 px-2 py-0.5 rounded">
              {status?.recentCount ?? 0}
            </span>
          </div>
        </div>

        {/* Sync message feedback */}
        {syncMessage && (
          <div className="mt-3 p-2.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-xs text-amber-200">
            {syncMessage}
          </div>
        )}

        {/* Rule configuration instructions when permission denied */}
        {!isWriteOpen && (
          <div className="mt-4 p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-3">
            <div className="flex items-start gap-2">
              <ShieldAlert size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                  How to Receive Reviews in Firebase Console (~2F)
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Your Firebase database is connected to the project, but Firebase security rules require write permissions. Set public access in your Firebase Rules tab to view reviews instantly:
                </p>
              </div>
            </div>

            {/* Code Snippet */}
            <div className="relative bg-[#050c14] border border-amber-500/30 rounded-lg p-2.5 font-mono text-xs text-amber-200">
              <pre className="overflow-x-auto">{RULES_SNIPPET}</pre>
              <button
                type="button"
                onClick={handleCopyRules}
                className="absolute top-2 right-2 px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/40 text-amber-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
              >
                {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                {copied ? "Copied!" : "Copy Rules"}
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              1. Open the <strong>Rules</strong> tab in Firebase Console.<br />
              2. Paste the rules above and click <strong>Publish</strong>.<br />
              3. Click <strong>Test & Flush Reviews</strong> below to immediately push all evaluations!
            </p>
          </div>
        )}

        {/* Links to Console */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-2">
          <a
            href="https://console.firebase.google.com/u/0/project/orka-lotus-beach-marinaryu/database/orka-lotus-beach-marinaryu-default-rtdb/data/~2F"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Firebase Data (~2F)</span>
            <ExternalLink size={12} />
          </a>
          <a
            href="https://console.firebase.google.com/u/0/project/orka-lotus-beach-marinaryu/database/orka-lotus-beach-marinaryu-default-rtdb/rules"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Rules Tab</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            disabled={loading || syncing}
            onClick={handleManualSync}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] hover:from-[#e5c158] hover:via-[#fff59d] hover:to-[#e5c158] text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw size={13} className={syncing ? "animate-spin" : ""} />
            <span>{syncing ? "Syncing..." : "Test & Flush Reviews"}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
