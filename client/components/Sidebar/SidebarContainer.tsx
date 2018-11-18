import * as React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import debounce from 'lodash.debounce';
import queryString from 'query-string';
import Sidebar from './Sidebar';
import { ITagsState } from '../../store/tags';
import { IAppState } from '../../store';
import { categories, ICategories, types } from '../../../constants/categories';

interface IReduxStateProps {
  tags: ITagsState;
}

interface IState {
  isMobile: boolean;
  mounted: boolean;
  search: string;
  showMenu: boolean;
}

class SidebarContainer extends React.Component<IReduxStateProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      mounted: false,
      search: '',
      showMenu: false,
    };
    this.addCount = this.addCount.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onMenuToggle = this.onMenuToggle.bind(this);
    this.onSearch = debounce(this.onSearch.bind(this), 500);
    this.onResize = debounce(this.onResize.bind(this), 500);
  }

  componentDidMount() {
    const query = queryString.parse(window.location.search);
    this.setState({
      isMobile: window.innerWidth < 840,
      search: query.search ? (query.search as string).replace('+', ' ') : '',
    });
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  async onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ search: e.target.value });
    this.onSearch(e.target.value);
  }

  onSearch(value) {
    const search = value.replace(/\s+/, '+');
    Router.push(`/?sort=top&search=${search}`, `/?search=${search}`);
  }

  onMenuToggle(e) {
    e.preventDefault();
    this.setState(state => ({ showMenu: !state.showMenu }));
  }

  onResize(e: any) {
    this.setState({ isMobile: e.target.innerWidth < 840 });
  }

  addCount(item: ICategories) {
    return {
      ...item,
      count: this.props.tags.data[item.slug] || 0,
    };
  }

  render() {
    const { isMobile, search, showMenu } = this.state;
    const {
      tags: { actives },
    } = this.props;
    const catsData = categories.map(this.addCount);
    const typesData = types.map(this.addCount);
    const show = isMobile ? showMenu : true;

    return (
      <Sidebar
        actives={actives}
        types={typesData}
        categories={catsData}
        search={search}
        showMenu={show}
        onSearchChange={this.onSearchChange}
        onMenuToggle={this.onMenuToggle}
      />
    );
  }
}

const mapStateToProps = ({ tags }: IAppState): IReduxStateProps => ({ tags });

export default connect<IReduxStateProps>(
  mapStateToProps,
  null
)(SidebarContainer);
