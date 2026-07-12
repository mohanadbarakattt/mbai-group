import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { CheckCircle, XCircle, Clock, RefreshCw, LogOut, Eye } from "lucide-react";

interface Submission {
  id: number;
  headline: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  status: "pending" | "approved" | "rejected";
  submitted_at: string;
  reviewed_at: string | null;
}

type FilterStatus = "all" | "pending" | "approved" | "rejected";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  pending: <Clock size={12} />,
  approved: <CheckCircle size={12} />,
  rejected: <XCircle size={12} />,
};

export default function TestimonialsAdmin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [allSubmissions, setAllSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchAllSubmissions = useCallback(async (pw: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials", {
        headers: { "x-admin-password": pw },
      });
      if (res.status === 401) {
        setAuthed(false);
        setAuthError("Session expired. Please log in again.");
        return;
      }
      const data = await res.json();
      setAllSubmissions(data.testimonials || []);
    } catch {
      setAllSubmissions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials", {
        headers: { "x-admin-password": password },
      });
      if (res.ok) {
        setAuthed(true);
        const data = await res.json();
        setAllSubmissions(data.testimonials || []);
      } else if (res.status === 401) {
        setAuthError("Wrong password. Please try again.");
      } else {
        // e.g. 503 when ADMIN_PASSWORD isn't configured in this environment yet —
        // surface the real reason instead of implying the password was wrong.
        const data = await res.json().catch(() => null);
        setAuthError(data?.error || "Could not connect to the admin API.");
      }
    } catch {
      setAuthError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed && password) {
      fetchAllSubmissions(password);
    }
  }, [authed, password, fetchAllSubmissions]);

  const updateStatus = async (id: number, status: "approved" | "rejected" | "pending") => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setAllSubmissions((prev) =>
          prev.map((s) =>
            s.id === id ? { ...s, status, reviewed_at: new Date().toISOString() } : s
          )
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const counts = {
    all: allSubmissions.length,
    pending: allSubmissions.filter((s) => s.status === "pending").length,
    approved: allSubmissions.filter((s) => s.status === "approved").length,
    rejected: allSubmissions.filter((s) => s.status === "rejected").length,
  };

  const displayed =
    filter === "all"
      ? allSubmissions
      : allSubmissions.filter((s) => s.status === filter);

  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
              <Eye className="w-5 h-5 text-indigo-600" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Admin Access</h1>
            <p className="text-slate-500 text-sm mt-1">
              Testimonial submissions dashboard
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                autoComplete="current-password"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
                placeholder="Enter admin password"
              />
            </div>
            {authError && (
              <p className="text-red-600 text-xs font-medium">{authError}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
            >
              {loading ? "Checking..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Testimonial Submissions</h1>
            <p className="text-slate-500 text-xs mt-0.5">
              Review and manage client testimonials
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchAllSubmissions(password)}
              disabled={loading}
              className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm transition-colors"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={() => { setAuthed(false); setPassword(""); }}
              className="flex items-center gap-1.5 text-slate-500 hover:text-red-600 text-sm transition-colors"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-4 gap-3 mb-6">
          {(["all", "pending", "approved", "rejected"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-xl border p-3 text-left transition-all ${
                filter === s
                  ? "bg-indigo-50 border-indigo-300 ring-1 ring-indigo-300"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="text-2xl font-bold text-slate-900">{counts[s]}</div>
              <div
                className={`text-xs font-semibold capitalize mt-0.5 ${
                  filter === s ? "text-indigo-600" : "text-slate-500"
                }`}
              >
                {s === "all" ? "Total" : s}
              </div>
            </button>
          ))}
        </div>

        {loading && allSubmissions.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-sm">Loading...</div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-400 text-sm">
              No {filter === "all" ? "" : filter} submissions yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayed.map((sub) => (
              <div
                key={sub.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${STATUS_COLORS[sub.status]}`}
                        >
                          {STATUS_ICONS[sub.status]}
                          {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                        </span>
                        <span className="text-xs text-slate-400">
                          #{sub.id} · {new Date(sub.submitted_at).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit"
                          })}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm truncate">
                        {sub.headline}
                      </h3>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {sub.name} · {sub.role} · {sub.company}
                      </p>
                    </div>
                    <button
                      onClick={() => setExpandedId(expandedId === sub.id ? null : sub.id)}
                      className="shrink-0 text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                    >
                      {expandedId === sub.id ? "Hide" : "Read"}
                    </button>
                  </div>

                  {expandedId === sub.id && (
                    <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-slate-700 text-sm leading-relaxed italic">
                        &ldquo;{sub.quote}&rdquo;
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    {sub.status !== "approved" && (
                      <button
                        onClick={() => updateStatus(sub.id, "approved")}
                        disabled={updatingId === sub.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-semibold transition-colors disabled:opacity-50"
                      >
                        <CheckCircle size={13} />
                        Approve
                      </button>
                    )}
                    {sub.status !== "rejected" && (
                      <button
                        onClick={() => updateStatus(sub.id, "rejected")}
                        disabled={updatingId === sub.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-semibold transition-colors disabled:opacity-50"
                      >
                        <XCircle size={13} />
                        Reject
                      </button>
                    )}
                    {sub.status !== "pending" && (
                      <button
                        onClick={() => updateStatus(sub.id, "pending")}
                        disabled={updatingId === sub.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold transition-colors disabled:opacity-50"
                      >
                        <Clock size={13} />
                        Reset to Pending
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
