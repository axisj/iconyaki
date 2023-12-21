export function dangerouslySetInnerHTML(
  rawMarkup: string,
  replacer?: (str: string) => string,
): {
  dangerouslySetInnerHTML: {
    __html: string;
  };
} {
  return {
    dangerouslySetInnerHTML: {
      __html: replacer?.(rawMarkup) ?? rawMarkup,
    },
  };
}
