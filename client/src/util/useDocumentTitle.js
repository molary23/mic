import { useEffect } from "react";

function useDocumentTitle(level, pageName) {
  useEffect(() => {
    document.title = `${level}  ${pageName} | MicEarnBusiness`;
  }, [level, pageName]);
}

export default useDocumentTitle;
