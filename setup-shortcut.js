// Create desktop shortcut by calling the PowerShell script
const { execSync } = require('child_process');
const path = require('path');

const ps1Path = path.join(__dirname, 'setup-shortcut.ps1');

try {
  const result = execSync(
    `powershell -ExecutionPolicy Bypass -File "${ps1Path}"`,
    { encoding: 'utf-8' }
  );
  console.log(result.trim());
} catch (e) {
  console.error('Failed:', e.stderr || e.message);
  process.exit(1);
}
