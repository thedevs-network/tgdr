import * as React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import { Flex } from 'grid-styled';
import Header from '../client/components/Header';
import Footer from '../client/components/Footer';
import Button from '../client/components/elements/Button';
import Modal from '../client/components/elements/Modal';
import LoginModal from '../client/components/LoginModal';
import SubmitModal from '../client/components/SubmitModal';
import Icon from '../client/components/elements/Icon';
import { IAppState } from '../client/store';
import {
  SloganSubTitle,
  SloganTitle,
  ViewAllLink,
} from '../client/components/elements/Typography';
import { AppWrapper } from '../client/components/elements/Layout';

interface IReduxProps {
  isAuthenticated: boolean;
}

interface IProps extends IReduxProps {
  statusCode?: number;
}

class ErrorPage extends React.Component<IProps> {
  static getInitialProps({ err, res }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { isAuthenticated, statusCode } = this.props;
    const title =
      statusCode === 404
        ? "404. The page you're looking for does not exist"
        : 'Something went wrong.';

    const subtitle = statusCode === 404 && (
      <SloganSubTitle>
        You can submit an entry if you think we're missing something.
      </SloganSubTitle>
    );

    const showSubmit = closeModal =>
      isAuthenticated ? (
        <SubmitModal closeModal={closeModal} />
      ) : (
        <LoginModal closeModal={closeModal} />
      );

    const submit = statusCode === 404 && (
      <>
        <Flex px={4}>
          <span>or</span>
        </Flex>
        <Modal trigger={<Button>+ Submit</Button>}>{showSubmit}</Modal>
      </>
    );

    return (
      <>
        <Head>
          <title>Telegram Directory | 404 Not Found</title>
        </Head>
        <AppWrapper>
          <Flex flex="1 1 auto" flexDirection="column">
            <Header />
            <Flex py={5} flexDirection="column" align="center" is="section">
              <SloganTitle>{title}</SloganTitle>
              {subtitle}
              <Flex mt={4} align="center" justify="center">
                <Link href="/?sort=top" as="/" passHref>
                  <ViewAllLink title="Back to homepage">
                    <Icon name="arrowLeft" size={15} fill="#64B5F6" mr={10} />
                    Homepage
                  </ViewAllLink>
                </Link>
                {submit}
              </Flex>
            </Flex>
          </Flex>
          <Footer />
        </AppWrapper>
      </>
    );
  }
}

const mapStateToProps = ({
  auth: { isAuthenticated },
}: IAppState): IReduxProps => ({
  isAuthenticated,
});

export default connect<IReduxProps>(mapStateToProps)(ErrorPage);
