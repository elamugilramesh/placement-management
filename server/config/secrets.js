import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SECRET_FILE = path.join(__dirname, '../../.session-secret');

export function generateSecretKey() {
  return crypto.randomBytes(32).toString('hex');
}

export function getOrCreateSecretKey() {
  try {
    // Try to read existing secret
    if (fs.existsSync(SECRET_FILE)) {
      return fs.readFileSync(SECRET_FILE, 'utf8').trim();
    }

    // Generate new secret if none exists
    const newSecret = generateSecretKey();
    fs.writeFileSync(SECRET_FILE, newSecret);
    return newSecret;
  } catch (error) {
    console.error('Error managing session secret:', error);
    // Fallback to environment variable or generate temporary secret
    return process.env.SESSION_SECRET || generateSecretKey();
  }
}