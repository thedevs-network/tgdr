import * as React from 'react';
import { NextSFC } from 'next';
import Head from 'next/head';
import { Flex } from 'grid-styled';
import Header from '../client/components/Header';
import Footer from '../client/components/Footer';
import { SloganTitle } from '../client/components/elements/Typography';
import { AppWrapper } from '../client/components/elements/Layout';
import { Container } from '../client/components/elements/Layout';

const Terms: NextSFC = () => (
  <>
    <Head>
      <title>Telegram Directory | Terms of Service</title>
    </Head>
    <AppWrapper>
      <Flex flex="1 1 auto" flexDirection="column">
        <Header />
        <Flex py={5} flexDirection="column" align="center" is="section">
          <Container justify="flex-start" flexDirection="column">
            <SloganTitle>Terms of Use</SloganTitle>
            <p>lorem ipsum.</p>
          </Container>
        </Flex>
      </Flex>
      <Footer />
    </AppWrapper>
  </>
);

export default Terms;
