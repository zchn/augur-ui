module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false',
    serial: true,
    executablePath: 'google-chrome',
    args: ['--mute-audio', '--hide-scrollbars', '--remote-debugging-port=9222', '--no-sandbox']
  },
  server: {
    command: 'node server.js',
    port: 8080,
  },
}
