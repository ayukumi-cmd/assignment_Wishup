import 'antd/dist/reset.css'; // Import Ant Design base styles
import '../styles/globals.css'; // Optional: your custom styles
import { ConfigProvider } from 'antd';

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
