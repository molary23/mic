/*export function add(x, y) {
  return x + y;
}

export function mutiply(x, y) {
  return x * y;
}

*/
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
        upLoad: (prevState.upLoad = false),
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
  doneTypingInterval,
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
  if (searchParams !== "") {
    let queryTerms = searchParams.split("?")[1];
    queryTerms = queryTerms.split("&");
    let terms = queryTerms.map((term) => term.split("="));
    let params = Object.fromEntries(terms);
    params.offset = 0;
    params.limit = limit;

    // Search Now
    if (selected === "search") {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        self.setState({
          isLoading: true,
        });
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        self.props.clearSearchActions(content);
        self.props.searchContent(content, params);
      }, doneTypingInterval);
    } else {
      self.setState({
        isLoading: true,
      });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      self.props.searchContent(content, params);
    }
  } else {
    const paginate = {
      offset: 0,
      limit: self.state.limit,
    };
    self.props.clearActions(content);
    self.setState((prevState) => ({
      upLoad: (prevState.upLoad = false),
    }));
    self.props.getContent(content, paginate);
  }
};
