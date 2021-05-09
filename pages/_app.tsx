import "../styles/globals.css";

type Props = {
  Component: React.FC;
  pageProps: React.ComponentProps<any>;
};
const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
