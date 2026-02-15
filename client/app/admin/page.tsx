import AdminDashboardPage from '../../pages/admin/AdminDashboardPage';
import { createPageMetadata } from '../../lib/seo';

export const metadata = createPageMetadata({
  title: 'Admin Dashboard | WebOrbitSolution',
  description: 'Manage WebOrbitSolution blog posts and content.',
  path: '/admin',
  robots: {
    index: false,
    follow: false,
  },
});

export default function Page() {
  return <AdminDashboardPage />;
}
