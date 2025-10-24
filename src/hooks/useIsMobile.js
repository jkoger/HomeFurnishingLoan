import { useEffect, useState } from "react";

const DEFAULT_MEDIA_QUERY =
  "(max-width: 900px) and (orientation: portrait), (max-width: 720px)";

export function useIsMobile(mediaQuery = DEFAULT_MEDIA_QUERY) {
  const getMatches = () =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia(mediaQuery).matches
      : false;

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return;
    }

    const mediaQueryList = window.matchMedia(mediaQuery);
    const handleChange = (event) => setMatches(event.matches);

    setMatches(mediaQueryList.matches);

    if (typeof mediaQueryList.addEventListener === "function") {
      mediaQueryList.addEventListener("change", handleChange);
      return () => mediaQueryList.removeEventListener("change", handleChange);
    }
    // for old browsers
    if (typeof mediaQueryList.addListener === "function") {
      mediaQueryList.addListener(handleChange);
      return () => mediaQueryList.removeListener(handleChange);
    }

    return undefined;
  }, [mediaQuery]);

  return matches;
}
