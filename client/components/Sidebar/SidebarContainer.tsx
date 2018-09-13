import * as React from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import { ITagsState } from '../../store/tags';
import { IAppState } from '../../store';
import { categories, ICategories, types } from '../../../constants/categories';

interface IReduxStateProps {
  tags: ITagsState;
}

class SidebarContainer extends React.Component<IReduxStateProps> {
  constructor(props) {
    super(props);
    this.addCount = this.addCount.bind(this);
  }

  addCount(item: ICategories) {
    return {
      ...item,
      count: this.props.tags.data[item.slug] || 0,
    };
  }

  render() {
    const catsData = categories.map(this.addCount);
    const typesData = types.map(this.addCount);
    return <Sidebar categories={catsData} types={typesData} />;
  }
}

const mapStateToProps = ({ tags }: IAppState): IReduxStateProps => ({ tags });

export default connect<IReduxStateProps>(
  mapStateToProps,
  null
)(SidebarContainer);
