import { Suspense } from 'react';
import LoginForm from '@/components/login/login-form';

export default function LoginPage() {
  return (
    <main>
      <Suspense fallback={<div>Cargando login...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
