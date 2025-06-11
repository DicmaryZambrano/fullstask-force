// lib/testing.ts
import bcrypt from 'bcrypt';

(async () => {
  const password = 'hashedpassword4';
  const hash = await bcrypt.hash(password, 10);
  console.log('Hash generado:', hash);
})();
