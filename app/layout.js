import './style.css';
import RegisterSW from './register-sw';
export const metadata = {
  title: '한자 탐험대',
  description: '대한검정회 준5급 한자 학습 앱',
  manifest: '/manifest.json',
  icons: { icon: '/icons/icon-192.png', apple: '/icons/icon-192.png' },
  themeColor: '#fff7ed'
};
export default function RootLayout({children}) {
  return <html lang="ko"><body><RegisterSW/>{children}</body></html>;
}
