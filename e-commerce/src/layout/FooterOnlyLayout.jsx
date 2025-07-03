import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

export default function FooterOnlyLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
