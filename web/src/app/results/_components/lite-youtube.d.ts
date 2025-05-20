declare namespace JSX {
  interface IntrinsicElements {
    "lite-youtube": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      videoid?: string;
      style?: React.CSSProperties;
      params?: string;
      playlistid?: string;
      playlabel?: string;
      nocookie?: boolean;
      autoload?: boolean;
      posterquality?:
        | "maxresdefault"
        | "sddefault"
        | "hqdefault"
        | "mqdefault"
        | "default";
    };
  }
}
