import AdminLoginPage from '../../../pages/admin/AdminLoginPage';
import { createPageMetadata } from '../../../lib/seo';

export const metadata = createPageMetadata({
  title: 'Admin Login | WebOrbitSolution',
  description: 'Admin access for WebOrbitSolution blog management.',
  path: '/admin/login',
  robots: {
    index: false,
    follow: false,
  },
});

export default function Page() {
  return <AdminLoginPage />;
}
