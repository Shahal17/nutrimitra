import { writeFileSync } from 'node:fs';
import { patients, users, visits } from '../src/data';

writeFileSync('backend/scripts/seed-output.json', JSON.stringify({ users, patients, visits }, null, 2));
console.log('Seed data generated at backend/scripts/seed-output.json');
