import { FC, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Footer from '../common/Footer';
import ModernNavbar from '../header/ModernNavbar';
import MessengerButton from '../button/MessengerButton';

const GoogleAnalytics = dynamic(() => import('../common/GoogleAnalytics'), { ssr: false });

interface Props {
  title?: string;
  desc?: string;
  thumbnail?: string;
  meta?: any;
  children: ReactNode;
}

const DefaultLayout: FC<Props> = ({ title, desc, thumbnail, meta, children }): JSX.Element => {
  return (
    <>
      <div className="min-h-screen bg-white transition">
        <ModernNavbar />
        <GoogleAnalytics />
        <div className="mx-auto max-w-full">{children}</div>
        <MessengerButton />
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;