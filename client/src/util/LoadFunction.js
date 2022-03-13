import axios from "axios";

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
  console.log(limit, numOfPages, iScrollPos, currentPage, content, winScroll);
  if (winScroll > iScrollPos) {
    if (currentPage <= numOfPages) {
      self.setState((prevState) => ({
        offset: prevState.offset + limit,
        getLoad: (prevState.getLoad = false),
      }));
      if (searchParams !== "") {
        let queryTerms = searchParams.split("?")[1];
        queryTerms = queryTerms.split("&");
        let terms = queryTerms.map((term) => term.split("="));
        let params = Object.fromEntries(terms);
        params.offset = self.state.offset;
        params.limit = self.state.limit;
        // Search Now
        self.props.searchContent(content, params);
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
    limit: 4,
    currentPage: 2,
  });

  if (valueOfSelected !== "") {
    url.searchParams.set(selected, valueOfSelected);
    window.history.pushState({}, "", url);
  } else if (valueOfSelected === "") {
    url.searchParams.delete(selected);
    window.history.pushState({}, "", url);
  }

  let searchParams = window.location.search;

  if (selected === "search") {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      if (searchParams !== "") {
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
    if (searchParams !== "") {
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
  if (searchParams !== "") {
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
    self.props.clearSearchActions(content);
    self.props.searchContent(content, params);
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
  startLoad,
  getLoad,
}) => {
  let load = getLoad,
    loader = startLoad,
    main = [],
    searchMain,
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
      emptyRecord = true;
      main = [];
    }
  }

  if (!searching) {
    showSearch = searching;
  } else {
    showSearch = true;
    loader = true;
    totalCount = searchcount;
    totalText = "Filtered";
    if (searchlist === [] || searchlist.length <= 0) {
      noRecord = true;
      searchMain = [];
      loader = false;
    } else if (searchlist.length > 0 && !searchloading) {
      searchMain = searchlist;
      loader = false;
    } else if (searchlist.length > 0 && searchloading) {
      searchMain = searchlist;
      loader = true;
    }
  }
  return {
    showSearch,
    main,
    searchMain,
    emptyRecord,
    noRecord,
    totalText,
    totalCount,
    load,
    loader,
  };
};

export const checkEmptyInput = ({
  inputs,
  setErrors,
  setLoading,
  pair,
  option,
  status,
  takeprofit,
  stoploss,
  startrange,
  endrange,
  pip,
}) => {
  if (!Object.keys(inputs).includes(pair) || inputs[pair] === "") {
    setErrors({
      [pair]: "Currency Pair Field can't be empty",
    });
    return false;
  } else if (!Object.keys(inputs).includes(option) || inputs[option] === "") {
    setErrors({
      [option]: "Signal Option Field can't be empty",
    });
    return false;
  } else if (
    !Object.keys(inputs).includes(takeprofit) ||
    inputs[takeprofit] === ""
  ) {
    setErrors({
      [takeprofit]: "Take Profit Field can't be empty",
    });
    return false;
  } else if (
    !Object.keys(inputs).includes(stoploss) ||
    inputs[stoploss] === ""
  ) {
    setErrors({
      [stoploss]: "Stop Loss Field can't be empty",
    });
    return false;
  } else if (
    !Object.keys(inputs).includes(startrange) ||
    inputs[startrange] === ""
  ) {
    setErrors({
      [startrange]: "Start Range Field can't be empty",
    });
    return false;
  } else if (
    !Object.keys(inputs).includes(endrange) ||
    inputs[endrange] === ""
  ) {
    setErrors({
      [endrange]: "End Range Field can't be empty",
    });
    return false;
  } else if (!Object.keys(inputs).includes(pip) || inputs[pip] === "") {
    setErrors({
      [pip]: "Pip Field can't be empty",
    });
  } else {
    setLoading(true);
    let tp = inputs[takeprofit].split(",").map((element) => {
      return parseFloat(element.trim());
    });
    let sl = inputs[stoploss].split(",").map((element) => {
      return parseFloat(element.trim());
    });

    const signal = {
      pair: parseInt(inputs[pair]),
      option: inputs[option],
      status: inputs[status],
      takeprofit: tp,
      stoploss: sl,
      startrange: parseFloat(inputs[startrange]),
      endrange: parseFloat(inputs[endrange]),
      pip: parseFloat(inputs[pip]),
    };

    return signal;
  }
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
      .post(`/api/public/${page}/`, req, {})
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
