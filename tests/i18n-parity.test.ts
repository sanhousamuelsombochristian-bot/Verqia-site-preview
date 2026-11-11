import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

type JsonValue = string | JsonValue[] | { [key: string]: JsonValue };

function leafKeys(value: JsonValue, prefix = ''): string[] {
  if (typeof value === 'string') return [prefix];
  if (Array.isArray(value)) return value.flatMap((item, index) => leafKeys(item, `${prefix}.${index}`));
  return Object.entries(value).flatMap(([key, item]) => leafKeys(item, prefix ? `${prefix}.${key}` : key));
}

const readMessages = (locale: 'fr' | 'en') => JSON.parse(readFileSync(`messages/${locale}.json`, 'utf8')) as JsonValue;

describe('i18n — current conceptual-scope copy', () => {
  const fr = readMessages('fr');
  const en = readMessages('en');

  it('keeps French and English leaf keys aligned', () => {
    expect(leafKeys(fr).sort()).toEqual(leafKeys(en).sort());
  });

  it('provides the new interactive labels from both dictionaries', () => {
    const frCopy = fr as { home: { heroRotate: Record<string, string> }; decisionEngine: { demo: Record<string, string> }; faqPage: { filters: Record<string, string> }; pilotPage: Record<string, string> };
    const enCopy = en as typeof frCopy;
    for (const messages of [frCopy, enCopy]) {
      expect(messages.home.heroRotate.prefix).not.toHaveLength(0);
      expect(messages.home.heroRotate.screenReaderSummary).not.toHaveLength(0);
      expect(messages.decisionEngine.demo.analyzing).not.toHaveLength(0);
      expect(messages.faqPage.filters.all).not.toHaveLength(0);
      expect(messages.pilotPage.stepperLabel).not.toHaveLength(0);
    }
  });
});
