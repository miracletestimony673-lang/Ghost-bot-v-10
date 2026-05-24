# Project Structure

```bash
src/
├── commands/
│   ├── basic/       → ping.js, info.js
│   └── utility/     → diagnose.js, heal.js
├── config/          → index.js, owners.js, roleMap.js
├── connection/      → index.js
├── database/        → index.js, postgres.js, redis.js
├── diagnostics/     → scan.js, report.js, healthCheck.js
├── handlers/        → messageHandler.js, commandLoader.js
├── healing/         → autoFix.js, autoHealWatcher.js, fallback.js, restart.js
├── middleware/      → permissions.js, cooldown.js
├── plugins/         → index.js
└── utils/           → logger.js, errorHandler.js
```

This represents the ideal or planned modular structure for the bot.