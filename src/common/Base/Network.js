import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import I18n from 'react-native-i18n';
import {API_REQUESTS_LIMIT} from '../utils/Constants';
import {getResponseTransformed} from '../../utils/List';

const {CancelToken} = axios;

class Network extends PureComponent {
  static propTypes = {
    limit: PropTypes.number,
    paging: PropTypes.bool,
    apiRequest: PropTypes.shape({
      url: PropTypes.string.isRequired,
      onError: PropTypes.func,
      ContentType: PropTypes.string,
      pageFieldName: PropTypes.string,
      limitFieldName: PropTypes.string,
      params: PropTypes.object,
    }),
  };

  static defaultProps = {
    limit: API_REQUESTS_LIMIT,
    paging: true,
    // responseResolver: getResponseTransformed,
  };

  constructor(props) {
    super(props);

    this.page = 0;
    this.pageCount = 1;
    if (props.apiRequest) {
      this.source = CancelToken.source();
    }
  }

  componentDidMount() {
    this.fetch(this.mainIndicator, true);
  }

  UNSAFE_componentWillReceiveProps(nextProps, CB) {
    if (this.props.apiRequest) {
      if (
        nextProps.apiRequest.params &&
        JSON.stringify(nextProps.apiRequest.params) !==
          JSON.stringify(this.props.apiRequest.params)
      ) {
        this.reload();
        if (CB) {
          CB();
        }
      } else if (
        nextProps.apiRequest.url &&
        nextProps.apiRequest.url !== this.props.apiRequest.url
      ) {
        this.reload();
        if (CB) {
          CB();
        }
      }
    }
  }

  componentWillUnmount() {
    if (this.props.apiRequest) {
      this.source.cancel('Network Operation Canceled.');
    }
  }

  reload = () => {
    this.page = 0;
    this.setData([], () => {
      this.fetch(this.mainIndicator, true);
    });
  };

  // append data by default
  async fetch(indicator, reset, d) {
    if (this.state[indicator]) {
      // return;
    }
    if (!this.props.apiRequest) {
      return;
    }

    this.setStartFetching();
    if (indicator === 'loading') {
      this.setState({
        [indicator]: true,
      });
    }
    const data = reset ? [] : d || this.state.dataProvider._data;
    this.page = reset ? 1 : this.page;
    this.lastItem = reset ? null : this.lastItem;

    if (this.props.apiRequest) {
      this.apiLoadData(indicator, data);
    }
  }

  apiLoadData = async (loadingIndicator, oldData = []) => {
    const {apiRequest, paging} = this.props;
    const {
      url,
      pageFieldName,
      limitFieldName,
      params,
      ContentType,
      onError,
      transformData,
      responseResolver,
    } = apiRequest;

    const pagingParams = {};
    if (paging) {
      pagingParams[pageFieldName || 'page'] = this.page;
      pagingParams[limitFieldName || 'limit'] = this.props.limit;
    }

    try {
      const response = await axios.get(`${url}`, {
        cancelToken: this.source.token,
        params: {
          ...pagingParams,
          ...params,
        },
        headers: {
          'Content-Type': ContentType || 'application/json',
        },
      });

      const {data, pageCount} = responseResolver
        ? responseResolver(response)
        : getResponseTransformed(response);
      this.pageCount = pageCount || this.pageCount;

      let newData = data;

      if (transformData) {
        newData = data.map((item) => transformData(item));
      }

      const allData = [...oldData, ...newData];

      this.setData(allData);
      this.setState({
        [loadingIndicator]: false,
      });

      this.setEndFetching(allData);
    } catch (error) {
      console.log('ERROR LIST', error);

      if (!axios.isCancel(error)) {
        if (onError) {
          this.setError(onError(error));
        } else {
          this.setError(I18n.t('ui-error-happened'));
        }
        this.setState({
          [loadingIndicator]: false,
        });
      }
    }
  };

  render() {
    return null;
  }
}

export default Network;
