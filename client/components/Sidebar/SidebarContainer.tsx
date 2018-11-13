import * as React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import debounce from 'lodash.debounce';
import Sidebar from './Sidebar';
import { ITagsState } from '../../store/tags';
import { IAppState } from '../../store';
import { categories, ICategories, types } from '../../../constants/categories';

interface IReduxStateProps {
  tags: ITagsState;
}

interface IState {
  search: string;
}

class SidebarContainer extends React.Component<IReduxStateProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.addCount = this.addCount.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearch = debounce(this.onSearch.bind(this), 500);
  }

  async onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ search: e.target.value });
    this.onSearch(e.target.value)
  }

  onSearch(value) {
    Router.push(`/?sort=top&search=${value}`, `/?search=${value}`);
  }

  addCount(item: ICategories) {
    return {
      ...item,
      count: this.props.tags.data[item.slug] || 0,
    };
  }

  render() {
    const { search } = this.state;
    const {
      tags: { actives },
    } = this.props;
    const catsData = categories.map(this.addCount);
    const typesData = types.map(this.addCount);
    return (
      <Sidebar
        actives={actives}
        types={typesData}
        categories={catsData}
        search={search}
        onSearchChange={this.onSearchChange}
      />
    );
  }
}

const mapStateToProps = ({ tags }: IAppState): IReduxStateProps => ({ tags });

export default connect<IReduxStateProps>(
  mapStateToProps,
  null
)(SidebarContainer);
