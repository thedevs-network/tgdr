import Document, { Head, Main, NextScript } from 'next/document';
import styled, { ServerStyleSheet } from 'styled-components';

const Body = styled.body`
  font: 16px/1.5 'Rubik', sans-serif;
  color: #666;
  background-color: #f4f5f7;
`;

interface IProps {
  styleTags: any;
}

class DocumentPage extends Document<IProps> {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta
            name="description"
            content="Find top and the best Telegram channels, bots and groups."
          />
          <link rel="icon" sizes="192x192" href="android-icon.png" />
          <link rel="apple-touch-icon" href="apple-icon.png" />
          <meta
            name="msapplication-square310x310logo"
            content="ms-icon-310x310.png"
          />
          <link rel="apple-touch-icon" href="apple-icon.png" />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="apple-icon-152x152.png"
          />
          <meta name="theme-color" content="#7e9cb4" />

          <link
            // tslint:disable-next-line:max-line-length
            href="https://fonts.googleapis.com/css?family=Rubik:400,400i,500,700"
            rel="stylesheet"
          />
          {this.props.styleTags}
          <script async defer src="https://buttons.github.io/buttons.js" />
        </Head>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </html>
    );
  }
}

export default DocumentPage;
