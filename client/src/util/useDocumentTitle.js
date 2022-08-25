import { useEffect } from "react";

export function useDocumentTitle(level, pageName) {
  useEffect(() => {
    document.title = `${level}  ${pageName} | MicEarnBusiness`;
  }, [level, pageName]);
}
