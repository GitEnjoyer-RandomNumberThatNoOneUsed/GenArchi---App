import { appendFileSync } from 'fs';
import { join } from 'path';

export function createLog(level, message, context = {}) {
  const log = {
    timestamp: new Date().toISOString(),
    level: level,
    message: message,
    context: context,
  };
  console.log(log);

  const jsonLog: string = JSON.stringify(log, null, 2);
  const filePath: string = join('src/log/log.txt');
  try {
    appendFileSync(filePath, jsonLog, { encoding: 'utf8', flag: 'a' });
  } catch (err) {
    console.error("Erreur lors de l'écriture dans le fichier de log :", err);
  }
}
