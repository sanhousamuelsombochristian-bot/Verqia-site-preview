import { HeaderBehavior } from './HeaderBehavior';

/** Server-rendered navigation shell; interactive behavior stays in a small client island. */
export function Header() {
  return <header className="site-header"><HeaderBehavior /></header>;
}
