import {
  PROVIDER_DOWNLOAD_SIGNALS,
  CLEAR_PROVIDER_DOWNLOAD_SIGNALS,
} from "../action/types";

const initialState = {
  downloadSp: false,
};

export default function updateReducer(state = initialState, action) {
  switch (action.type) {
    case PROVIDER_DOWNLOAD_SIGNALS:
      return {
        ...state,
        downloadSp: action.payload,
      };
    case CLEAR_PROVIDER_DOWNLOAD_SIGNALS:
      return {
        ...state,
        downloadSp: false,
      };
    default:
      return state;
  }
}
