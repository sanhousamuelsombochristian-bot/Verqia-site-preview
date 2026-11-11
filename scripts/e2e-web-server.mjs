import { spawn, spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
const port = portIndex >= 0 ? args[portIndex + 1] : null;
const pricingReview = args.includes('--pricing-review');

if (!port || !/^\d+$/.test(port)) {
  console.error('Usage : node scripts/e2e-web-server.mjs --port <port> [--pricing-review]');
  process.exit(1);
}

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const env = {
  ...process.env,
  NEXT_PUBLIC_SCROLL_PRESET: 'balanced',
  ...(pricingReview ? { NEXT_PUBLIC_LOCAL_PRICING_REVIEW: 'true' } : { NEXT_PUBLIC_LOCAL_PRICING_REVIEW: '' }),
};

const build = spawnSync(npm, ['run', 'build'], { cwd: process.cwd(), env, stdio: 'inherit' });
if (build.error || build.status !== 0) {
  console.error(build.error ? `Build E2E impossible : ${build.error.message}` : 'Build E2E en échec.');
  process.exit(build.status ?? 1);
}

const server = spawn(npm, ['run', 'start', '--', '--port', port], { cwd: process.cwd(), env, stdio: 'inherit' });
const stop = (signal) => {
  if (!server.killed) server.kill(signal);
};
process.on('SIGINT', () => stop('SIGINT'));
process.on('SIGTERM', () => stop('SIGTERM'));
server.on('error', (error) => {
  console.error(`Serveur E2E impossible à démarrer : ${error.message}`);
  process.exit(1);
});
server.on('exit', (code, signal) => process.exit(code ?? (signal ? 1 : 0)));
