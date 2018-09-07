import Document, { Head, Main, NextScript } from 'next/document';
import styled, { ServerStyleSheet } from 'styled-components';
import 'normalize.css';

const Body = styled.body`
  font: 16px/1.5 'Rubik', sans-serif;
  color: #666;
  background-color: #f4f5f7;
`;

class DocumentPage extends Document {
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
      <html>
        <Head>
          <title>
            Telegram Directory | Find the best Telegram channels, bots and
            groups.
          </title>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link
            href="https://fonts.googleapis.com/css?family=Rubik:400,400i,500,700"
            rel="stylesheet"
          />
          {this.props.styleTags}
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
