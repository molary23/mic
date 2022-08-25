import axios from "axios";

import isEmpty from "../validation/emptyChecker";
import { capitalizeAll } from "./capitalise";

export const getMore = ({
  limit,
  numOfPages,
  iScrollPos,
  currentPage,
  content,
  winScroll,
  searchParams,
  self,
}) => {
  if (winScroll > iScrollPos) {
    if (currentPage <= numOfPages) {
      self.setState((prevState) => ({
        offset: prevState.offset + limit,
        getLoad: (prevState.getLoad = false),
      }));
      if (!isEmpty(searchParams)) {
        try {
          let queryTerms = searchParams.split("?")[1];
          queryTerms = queryTerms.split("&");
          let terms = queryTerms.map((term) => term.split("="));
          let params = Object.fromEntries(terms);
          params.offset = self.state.offset;
          params.limit = self.state.limit;
          // Search Now
          self.props.searchContent(content, params);
        } catch (error) {
          const paginate = {
            offset: self.state.offset,
            limit: self.state.limit,
          };
          self.props.getContent(content, paginate);
        }
      } else {
        const paginate = {
          offset: self.state.offset,
          limit: self.state.limit,
        };
        self.props.getContent(content, paginate);
      }

      self.setState({
        currentPage: self.state.currentPage + 1,
      });
    }
  }
};

let typingTimer;
export const setSearchParams = ({
  selected,
  valueOfSelected,
  url,
  content,
  limit,
  self,
}) => {
  self.setState({
    offset: 0,
    currentPage: 2,
  });

  if (!isEmpty(valueOfSelected)) {
    url.searchParams.set(selected, valueOfSelected);
    window.history.pushState({}, "", url);
  } else if (isEmpty(valueOfSelected)) {
    url.searchParams.delete(selected);
    window.history.pushState({}, "", url);
  }

  let searchParams = window.location.search;

  if (selected === "search") {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      if (!isEmpty(searchParams)) {
        loadFromParams({ limit, self, content, searchParams });
      } else {
        const paginate = {
          offset: 0,
          limit: self.state.limit,
        };
        self.props.clearActions(content);
        self.props.clearSearchActions(content);
        self.setState((prevState) => ({
          getLoad: (prevState.getLoad = true),
          startLoad: (prevState.startLoad = false),
        }));
        self.props.getContent(content, paginate);
      }
    }, 5000);
  } else {
    if (!isEmpty(searchParams)) {
      loadFromParams({ limit, self, content, searchParams });
    } else {
      const paginate = {
        offset: 0,
        limit: self.state.limit,
      };
      self.props.clearActions(content);
      self.props.clearSearchActions(content);
      self.setState((prevState) => ({
        getLoad: (prevState.getLoad = true),
        startLoad: (prevState.startLoad = false),
      }));
      self.props.getContent(content, paginate);
    }
  }
};

export const loadFromParams = ({ limit, self, content, searchParams }) => {
  if (!isEmpty(searchParams)) {
    try {
      let queryTerms = searchParams.split("?")[1];
      queryTerms = queryTerms.split("&");
      let terms = queryTerms.map((term) => term.split("="));
      let params = Object.fromEntries(terms);
      params.offset = 0;
      params.limit = limit;
      self.setState({
        getLoad: true,
      });

      // Search Now
      self.props.clearActions(content);
      self.props.clearSearchActions(content);
      self.props.searchContent(content, params);
    } catch (error) {
      self.setState({
        isLoading: false,
        toasttext: "Invalid URL",
        toastcategory: "error",
        toast: true,
      });

      setTimeout(() => {
        self.setState({
          toast: false,
        });
      }, 5000);
    }
  }
};

//On Component mount load
export const landingLoad = ({ limit, offset, self, content, searchParams }) => {
  if (!isEmpty(searchParams)) {
    loadFromParams({ limit, self, content, searchParams });
  } else {
    const paginate = {
      limit,
      offset,
    };
    self.props.getContent(content, paginate);
  }
};

export const renderArrange = ({
  fetching,
  loading,
  list,
  count,
  searching,
  searchcount,
  searchlist,
  searchloading,
}) => {
  let load = true,
    loader = true,
    main = [],
    searchMain = [],
    showSearch,
    emptyRecord = false,
    noRecord = false,
    totalText = "",
    totalCount = count;

  if (fetching) {
    showSearch = false;
    loader = true;
    totalCount = count;
    totalText = "All";
    if (list === [] && loading) {
      loader = true;
      load = false;
    } else if (list.length > 0 && !loading) {
      main = list;
      load = false;
      loader = false;
    } else if (list.length > 0 && loading) {
      main = list;
      load = false;
      loader = true;
    } else {
      load = false;
      loader = false;
      emptyRecord = true;
      main = [];
    }
  } else if (searching) {
    showSearch = true;
    loader = false;
    load = false;
    totalCount = searchcount;
    totalText = "Filtered";
    if ((searchlist === [] || searchlist.length <= 0) && !searchloading) {
      noRecord = true;
      searchMain = [];
      loader = false;
    } else if (searchlist.length > 0 && !searchloading) {
      searchMain = searchlist;
      loader = false;
    } else if (searchlist.length > 0 && searchloading) {
      searchMain = searchlist;
    }
  }
  return {
    showSearch,
    main,
    searchMain,
    emptyRecord,
    noRecord,
    totalText,
    totalCount: roundUp(totalCount),
    load,
    loader,
  };
};

export const checkHandler = (input, target, setIcon, setErrors) => {
  let req = {},
    page,
    response;

  clearTimeout(typingTimer);
  if (input === "addadminemail") {
    req = { email: target };
    page = "email";
  } else if (input === "addadminusername") {
    req = { username: target };
    page = "username";
  }
  typingTimer = setTimeout(() => {
    setIcon({
      [input]: true,
    });
    axios
      .post(`/api/view/${page}/`, req, {})
      .then((res) => {
        response = res.data.text;
        setErrors({
          [input]: response,
        });
        setIcon({
          [input]: false,
        });
      })
      .catch((error) => {
        error[input] = error.response;
      });
  }, 3000);
};

export const roundUp = (num) => {
  let figure = parseFloat(num);
  if (figure >= 1000000000) {
    return `${(figure / 1000000000).toFixed(1)}B+`;
  } else if (figure >= 1000000) {
    return `${(figure / 1000000).toFixed(1)}M+`;
  } else if (figure >= 1000) {
    return `${(figure / 1000).toFixed(1)}K+`;
  } else {
    return figure;
  }
};

export const downloadFile = ({ sender, self }) => {
  let filename,
    url = "/api/download/";
  if (sender === "provider-signals") {
    url = `${url}provider`;
    filename = "my-signals";
  } else if (sender === "user-subscriptions") {
    url = `${url}user/:subscriptions`;
    filename = "my-subscriptions";
  } else if (sender === "user-transactions") {
    url = `${url}user/:transactions`;
    filename = "my-transactions";
  } else if (sender === "user-referrals") {
    url = `${url}user/:referrals`;
    filename = "my-referrals";
  } else if (sender === "user-bonus") {
    url = `${url}user/:bonus`;
    filename = "my-bonus";
  } else if (sender === "user-payments") {
    url = `${url}user/:payments`;
    filename = "my-payments";
  } else if (sender === "user-withdrawals") {
    url = `${url}user/:withdrawals`;
    filename = "my-withdrawals";
  } else if (sender === "admin-signals") {
    url = `${url}admin/:signals`;
    filename = "all-signals";
  } else if (sender === "admin-currencies") {
    url = `${url}admin/:currencies`;
    filename = "all-currencies";
  } else if (sender === "admin-users") {
    url = `${url}admin/:users`;
    filename = "all-users";
  } else if (sender === "admin-admins") {
    url = `${url}admin/:admins`;
    filename = "all-admins";
  } else if (sender === "admin-providers") {
    url = `${url}admin/:providers`;
    filename = "all-providers";
  } else if (sender === "admin-transactions") {
    url = `${url}admin/:transactions`;
    filename = "all-transactions";
  } else if (sender === "admin-subscriptions") {
    url = `${url}admin/:subscriptions`;
    filename = "all-subscriptions";
  } else if (sender === "admin-referrals") {
    url = `${url}admin/:referrals`;
    filename = "all-referrals";
  } else if (sender === "admin-bonus") {
    url = `${url}admin/:bonus`;
    filename = "all-bonus";
  } else if (sender === "admin-accounts") {
    url = `${url}admin/:accounts`;
    filename = "all-accounts";
  } else if (sender === "admin-payments") {
    url = `${url}admin/:payments`;
    filename = "all-payments";
  } else if (sender === "admin-withdrawals") {
    url = `${url}admin/:withdrawals`;
    filename = "all-withdrawals";
  } else if (sender === "admin-wallets") {
    url = `${url}admin/:wallets`;
    filename = "all-wallets";
  }

  self.setState({
    isLoading: true,
  });

  axios({
    method: "get",
    url,
    responseType: "blob",
    timeout: 60000, // only wait for 60s
  })
    .then((response) => {
      let url = window.URL.createObjectURL(response.data);
      let a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.csv`;
      a.click();
      self.setState({
        isLoading: false,
      });
    })
    .catch((error) => {
      self.setState({
        isLoading: false,
        toasttext:
          "There has been a Network Error. Refresh and Try downloading later.",
        toastcategory: "error",
        toast: true,
      });

      setTimeout(() => {
        self.setState({
          toast: false,
        });
      }, 5000);
    });
};

export const setDocumentTitle = (pageName) => {
  document.title = ` ${capitalizeAll(pageName)} | MicEarnBusiness`;
};
