/*export function add(x, y) {
  return x + y;
}

export function mutiply(x, y) {
  return x * y;
}

*/
export const loadMore = ({
  limit,
  numOfPages,
  iScrollPos,
  currentPage,
  content,
  searchParams,
}) => {
  console.log(limit, currentPage, iScrollPos);
  let winScroll = window.scrollY;

  if (winScroll > iScrollPos) {
    if (currentPage <= numOfPages) {
    }
  }
};

export const setSearchParams = ({
  selected,
  valueOfSelected,
  typingTimer,
  url,
  content,
}) => {
  console.log(content);
  /*
  this.setState({
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
    params.limit = this.state.limit;

    // Search Now
    this.props.clearSearchActions(content);
    if (selected === "search") {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        this.setState({
          isLoading: true,
        });
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        this.props.searchContent(content, params);
      }, this.state.doneTypingInterval);
    } else {
      this.setState({
        isLoading: true,
      });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      this.props.searchContent(content, params);
    }
  } else {
    const paginate = {
      offset: 0,
      limit: this.state.limit,
    };
    this.props.clearActions(content);
    this.setState((prevState) => ({
      upLoad: (prevState.upLoad = false),
    }));
    this.props.getContent(content, paginate);
  }*/
};
