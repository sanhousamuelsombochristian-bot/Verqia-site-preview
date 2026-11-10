export const COOKIE_SETTINGS_EVENT = 'verqia:open-cookie-settings';
let pendingSettingsRequest = false;

export function openCookiePreferences(): void {
  pendingSettingsRequest = true;
  window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_EVENT));
}

export function consumeCookieSettingsRequest(): boolean {
  const requested = pendingSettingsRequest;
  pendingSettingsRequest = false;
  return requested;
}
