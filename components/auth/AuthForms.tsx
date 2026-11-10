'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { authConfigured, getSupabaseBrowserClient } from '@/lib/supabase-browser';

type Provider = 'google' | 'azure';

type Feedback = { kind: 'error' | 'status'; text: string } | null;

function FeedbackMessage({ feedback }: { feedback: Feedback }) {
  if (!feedback) return null;
  return <p className={`auth-feedback auth-feedback--${feedback.kind}`} role={feedback.kind === 'error' ? 'alert' : 'status'}>{feedback.text}</p>;
}

function GoogleMark() {
  return <svg aria-hidden="true" viewBox="0 0 48 48" className="auth-provider__icon"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.91c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.42 37.93 46.98 31.78 46.98 24.55Z"/><path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"/></svg>;
}

function MicrosoftMark() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="auth-provider__icon"><path fill="#F25022" d="M1 1h10v10H1z"/><path fill="#7FBA00" d="M13 1h10v10H13z"/><path fill="#00A4EF" d="M1 13h10v10H1z"/><path fill="#FFB900" d="M13 13h10v10H13z"/></svg>;
}

function ProviderButtons({ locale, remember, onUnavailable }: { locale: string; remember: boolean; onUnavailable: (reason?: 'provider') => void }) {
  const t = useTranslations('auth');
  const [busy, setBusy] = useState<Provider | null>(null);

  const startOAuth = async (provider: Provider) => {
    const supabase = getSupabaseBrowserClient(remember);
    if (!supabase) { onUnavailable(); return; }
    setBusy(provider);
    const redirectTo = `${window.location.origin}/${locale}/connexion?remember=${remember ? '1' : '0'}`;
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo, ...(provider === 'azure' ? { scopes: 'email' } : {}) },
      });
      if (error) { setBusy(null); onUnavailable('provider'); }
    } catch {
      setBusy(null);
      onUnavailable('provider');
    }
  };

  return <div className="auth-providers">
    <button type="button" className="auth-provider" onClick={() => void startOAuth('google')} disabled={busy !== null}>
      <GoogleMark /><span>{busy === 'google' ? t('working') : t('continueGoogle')}</span>
    </button>
    <button type="button" className="auth-provider" onClick={() => void startOAuth('azure')} disabled={busy !== null}>
      <MicrosoftMark /><span>{busy === 'azure' ? t('working') : t('continueMicrosoft')}</span>
    </button>
  </div>;
}

function AuthUnavailable() {
  const t = useTranslations('auth');
  if (authConfigured) return null;
  return <div className="auth-config-note" role="note">{t('serviceNotConfigured')}</div>;
}

function AuthHeading({ title, description }: { title: string; description: string }) {
  return <header className="auth-card__heading"><p className="auth-card__eyebrow">VERQIA PILOT</p><h2>{title}</h2><p>{description}</p></header>;
}

export function LoginForm({ locale, initialRemember = true }: { locale: string; initialRemember?: boolean }) {
  const t = useTranslations('auth');
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(initialRemember);
  const [signedInEmail, setSignedInEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient(initialRemember);
    if (!supabase) return;
    void supabase.auth.getUser().then(({ data }) => { if (data.user?.email) setSignedInEmail(data.user.email); });
  }, [initialRemember]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    const form = new FormData(event.currentTarget);
    const schema = z.object({ email: z.email({ error: t('validation.email') }), password: z.string().min(1, { error: t('validation.passwordRequired') }) });
    const parsed = schema.safeParse({ email: form.get('email'), password: form.get('password') });
    if (!parsed.success) { setFeedback({ kind: 'error', text: parsed.error.issues[0]?.message ?? t('validation.invalidForm') }); return; }
    const supabase = getSupabaseBrowserClient(remember);
    if (!supabase) { setFeedback({ kind: 'error', text: t('serviceNotConfigured') }); return; }
    try {
      const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
      if (error) { setFeedback({ kind: 'error', text: t('loginFailed') }); return; }
      setSignedInEmail(data.user.email ?? parsed.data.email);
      setFeedback({ kind: 'status', text: t('signedIn') });
    } catch {
      setFeedback({ kind: 'error', text: t('loginFailed') });
    }
  };

  const startUnavailableProvider = (reason?: 'provider') => setFeedback({ kind: 'error', text: reason === 'provider' ? t('providerFailed') : t('serviceNotConfigured') });
  if (signedInEmail) return <><AuthHeading title={t('signedInTitle')} description={t('signedInAs', { email: signedInEmail })} /><button type="button" className="auth-submit auth-submit--secondary" onClick={async () => { const supabase = getSupabaseBrowserClient(remember); if (supabase) { await supabase.auth.signOut(); setSignedInEmail(null); setFeedback(null); } }}>{t('signOut')}</button><FeedbackMessage feedback={feedback} /></>;

  return <>
    <AuthHeading title={t('loginTitle')} description={t('loginDescription')} />
    <AuthUnavailable />
    <ProviderButtons locale={locale} remember={remember} onUnavailable={startUnavailableProvider} />
    <div className="auth-divider"><span>{t('orEmail')}</span></div>
    <form className="auth-form" onSubmit={(event) => void handleSubmit(event)} noValidate>
      <label className="auth-field"><span>{t('email')}</span><input type="email" name="email" autoComplete="email" placeholder="nom@entreprise.com" required /></label>
      <label className="auth-field"><span>{t('password')}</span><span className="auth-password-wrap"><input type={showPassword ? 'text' : 'password'} name="password" autoComplete="current-password" required /><button type="button" className="auth-password-toggle" aria-label={showPassword ? t('hidePassword') : t('showPassword')} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label>
      <div className="auth-form__meta"><label className="auth-remember"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span>{t('rememberMe')}</span></label><Link href="/mot-de-passe-oublie">{t('forgotPassword')}</Link></div>
      <FeedbackMessage feedback={feedback} />
      <button className="auth-submit" type="submit">{t('loginButton')}</button>
    </form>
    <p className="auth-switch">{t('noAccount')} <Link href="/inscription">{t('createAccount')}</Link></p>
  </>;
}

export function SignupForm({ locale }: { locale: string }) {
  const t = useTranslations('auth');
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    const form = new FormData(event.currentTarget);
    const schema = z.object({
      firstName: z.string().trim().min(1, { error: t('validation.firstName') }),
      lastName: z.string().trim().min(1, { error: t('validation.lastName') }),
      company: z.string().trim().min(1, { error: t('validation.company') }),
      email: z.email({ error: t('validation.email') }),
      password: z.string().min(12, { error: t('validation.passwordLength') }),
      confirmation: z.string(),
      terms: z.literal(true, { error: t('validation.terms') }),
    }).refine((values) => values.password === values.confirmation, { path: ['confirmation'], error: t('validation.passwordMismatch') });
    const parsed = schema.safeParse({
      firstName: form.get('firstName'), lastName: form.get('lastName'), company: form.get('company'), email: form.get('email'),
      password: form.get('password'), confirmation: form.get('confirmation'), terms: form.get('terms') === 'on',
    });
    if (!parsed.success) { setFeedback({ kind: 'error', text: parsed.error.issues[0]?.message ?? t('validation.invalidForm') }); return; }
    const supabase = getSupabaseBrowserClient();
    if (!supabase) { setFeedback({ kind: 'error', text: t('serviceNotConfigured') }); return; }
    try {
      const { data, error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/${locale}/connexion`,
          data: { first_name: parsed.data.firstName, last_name: parsed.data.lastName, company_name: parsed.data.company },
        },
      });
      if (error) { setFeedback({ kind: 'error', text: t('signupFailed') }); return; }
      setFeedback({ kind: 'status', text: data.session ? t('accountCreated') : t('confirmEmail') });
    } catch {
      setFeedback({ kind: 'error', text: t('signupFailed') });
    }
  };

  return <>
    <AuthHeading title={t('signupTitle')} description={t('signupDescription')} />
    <AuthUnavailable />
    <ProviderButtons locale={locale} remember onUnavailable={(reason) => setFeedback({ kind: 'error', text: reason === 'provider' ? t('providerFailed') : t('serviceNotConfigured') })} />
    <div className="auth-divider"><span>{t('orEmail')}</span></div>
    <form className="auth-form auth-form--signup" onSubmit={(event) => void handleSubmit(event)} noValidate>
      <div className="auth-form__row"><label className="auth-field"><span>{t('firstName')}</span><input name="firstName" autoComplete="given-name" required /></label><label className="auth-field"><span>{t('lastName')}</span><input name="lastName" autoComplete="family-name" required /></label></div>
      <label className="auth-field"><span>{t('company')}</span><input name="company" autoComplete="organization" required /></label>
      <label className="auth-field"><span>{t('email')}</span><input type="email" name="email" autoComplete="email" placeholder="nom@entreprise.com" required /></label>
      <label className="auth-field"><span>{t('password')}</span><span className="auth-password-wrap"><input type={showPassword ? 'text' : 'password'} name="password" autoComplete="new-password" minLength={12} required /><button type="button" className="auth-password-toggle" aria-label={showPassword ? t('hidePassword') : t('showPassword')} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label>
      <label className="auth-field"><span>{t('confirmPassword')}</span><span className="auth-password-wrap"><input type={showConfirmation ? 'text' : 'password'} name="confirmation" autoComplete="new-password" required /><button type="button" className="auth-password-toggle" aria-label={showConfirmation ? t('hidePassword') : t('showPassword')} onClick={() => setShowConfirmation((value) => !value)}>{showConfirmation ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label>
      <label className="auth-terms"><input type="checkbox" name="terms" required /><span>{t('acceptTerms')} <Link href="/legal/cgu">{t('termsLink')}</Link> {t('and')} <Link href="/legal/confidentialite">{t('privacyLink')}</Link>.</span></label>
      <FeedbackMessage feedback={feedback} />
      <button className="auth-submit" type="submit">{t('signupButton')}</button>
    </form>
    <p className="auth-switch">{t('haveAccount')} <Link href="/connexion">{t('loginLink')}</Link></p>
  </>;
}

export function ForgotPasswordForm() {
  const t = useTranslations('auth');
  const [feedback, setFeedback] = useState<Feedback>(null);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setFeedback(null);
    const form = new FormData(event.currentTarget);
    const schema = z.object({ email: z.email({ error: t('validation.email') }) });
    const parsed = schema.safeParse({ email: form.get('email') });
    if (!parsed.success) { setFeedback({ kind: 'error', text: parsed.error.issues[0]?.message ?? t('validation.invalidForm') }); return; }
    const supabase = getSupabaseBrowserClient();
    if (!supabase) { setFeedback({ kind: 'error', text: t('serviceNotConfigured') }); return; }
    const locale = window.location.pathname.split('/')[1] || 'fr';
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, { redirectTo: `${window.location.origin}/${locale}/reinitialiser-mot-de-passe` });
      setFeedback(error ? { kind: 'error', text: t('resetFailed') } : { kind: 'status', text: t('resetSent') });
    } catch {
      setFeedback({ kind: 'error', text: t('resetFailed') });
    }
  };
  return <><AuthHeading title={t('forgotTitle')} description={t('forgotDescription')} /><AuthUnavailable />
    <form className="auth-form" onSubmit={(event) => void handleSubmit(event)} noValidate><label className="auth-field"><span>{t('email')}</span><input type="email" name="email" autoComplete="email" placeholder="nom@entreprise.com" required /></label><FeedbackMessage feedback={feedback} /><button className="auth-submit" type="submit">{t('sendReset')}</button></form>
    <p className="auth-switch"><Link href="/connexion">{t('backToLogin')}</Link></p></>;
}

export function ResetPasswordForm() {
  const t = useTranslations('auth');
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setFeedback(null);
    const form = new FormData(event.currentTarget);
    const schema = z.object({ password: z.string().min(12, { error: t('validation.passwordLength') }), confirmation: z.string() }).refine((value) => value.password === value.confirmation, { path: ['confirmation'], error: t('validation.passwordMismatch') });
    const parsed = schema.safeParse({ password: form.get('password'), confirmation: form.get('confirmation') });
    if (!parsed.success) { setFeedback({ kind: 'error', text: parsed.error.issues[0]?.message ?? t('validation.invalidForm') }); return; }
    const supabase = getSupabaseBrowserClient();
    if (!supabase) { setFeedback({ kind: 'error', text: t('serviceNotConfigured') }); return; }
    try {
      const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
      setFeedback(error ? { kind: 'error', text: t('resetFailed') } : { kind: 'status', text: t('passwordUpdated') });
    } catch {
      setFeedback({ kind: 'error', text: t('resetFailed') });
    }
  };
  return <><AuthHeading title={t('newPasswordTitle')} description={t('newPasswordDescription')} /><AuthUnavailable />
    <form className="auth-form" onSubmit={(event) => void handleSubmit(event)} noValidate><label className="auth-field"><span>{t('newPassword')}</span><span className="auth-password-wrap"><input type={showPassword ? 'text' : 'password'} name="password" autoComplete="new-password" minLength={12} required /><button type="button" className="auth-password-toggle" aria-label={showPassword ? t('hidePassword') : t('showPassword')} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label><label className="auth-field"><span>{t('confirmPassword')}</span><input type="password" name="confirmation" autoComplete="new-password" required /></label><FeedbackMessage feedback={feedback} /><button className="auth-submit" type="submit">{t('updatePassword')}</button></form>
    <p className="auth-switch"><Link href="/connexion">{t('backToLogin')}</Link></p></>;
}
