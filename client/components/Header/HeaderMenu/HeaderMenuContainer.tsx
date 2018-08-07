import * as React from 'react';
import { connect } from 'react-redux';
import HeaderMenu from './HeaderMenu';
import { IAppState } from '../../../store';

interface IProps {
  name: string;
}

class HeaderMenuContainer extends React.Component<IProps> {
  render() {
    return <HeaderMenu name={this.props.name} />;
  }
}

const mapStateToProps = ({ auth: { name } }: IAppState): IProps => ({ name });

export default connect<IProps>(mapStateToProps, null)(HeaderMenuContainer);
