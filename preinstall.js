const os = require('os');
const { execSync } = require('child_process');

const platform = os.platform();

if (platform === 'win32') {
  // Run the Windows script
  execSync('certificate.cmd', { stdio: 'inherit' });
} else if (platform === 'darwin') {
  // Run the macOS/Linux script
  execSync('certificatemac.sh', { stdio: 'inherit' });
}else{
  // Run the macOS/Linux script
  execSync('certificatelinux.sh', { stdio: 'inherit' });
}