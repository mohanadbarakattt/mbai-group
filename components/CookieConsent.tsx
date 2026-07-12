import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/context';

const STORAGE_KEY = 'mbai-cookie-consent';

type Consent = { essential: true; analytics: boolean; ts: number };

/** Reads the stored consent choice, if any (null = not yet decided). */
export function getConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

/** Gate for future analytics/pixel scripts: only load them once the user opted in. */
export function hasAnalyticsConsent(): boolean {
  return getConsent()?.analytics === true;
}

function save(analytics: boolean) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ essential: true, analytics, ts: Date.now() }));
}

export default function CookieConsent() {
  const { dict } = useI18n();
  const c = dict.cookieConsent;
  const [visible, setVisible] = useState(false);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#111111]"
    >
      <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
        <p className="text-sm text-[#eef1fa]">{c.body}</p>

        {manage && (
          <label className="mt-3 flex items-center gap-2 text-sm text-[#9aa3bd]">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="h-5 w-5 shrink-0"
            />
            {c.analyticsLabel}
          </label>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => { save(true); setVisible(false); }}
            className="btn-primary rounded-xl px-4 py-2 text-sm"
          >
            {c.acceptAll}
          </button>
          <button
            type="button"
            onClick={() => { save(false); setVisible(false); }}
            className="btn-ghost rounded-xl px-4 py-2 text-sm"
          >
            {c.rejectAll}
          </button>
          {manage ? (
            <button
              type="button"
              onClick={() => { save(analytics); setVisible(false); }}
              className="btn-ghost rounded-xl px-4 py-2 text-sm"
            >
              {c.saveChoices}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setManage(true)}
              className="rounded-xl px-4 py-2 text-sm text-[#9aa3bd] hover:text-white transition-colors"
            >
              {c.manage}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
