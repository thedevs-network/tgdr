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
          <link rel="stylesheet" href="/_next/static/style.css" />
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
