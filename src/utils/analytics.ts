// Google Analytics 4 Event Tracking Utilities

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Send a custom event to Google Analytics 4
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
};

/**
 * Track social share events
 */
export const trackShare = (
  platform: string,
  url: string,
  title: string
) => {
  trackEvent("share", {
    method: platform,
    content_type: "article",
    item_id: url,
    content_title: title,
  });
};

/**
 * Track outbound link clicks
 */
export const trackOutboundLink = (
  url: string,
  label?: string
) => {
  trackEvent("click", {
    event_category: "outbound",
    event_label: label || url,
    value: url,
  });
};

/**
 * Track search queries
 */
export const trackSearch = (
  searchTerm: string,
  resultCount?: number
) => {
  trackEvent("search", {
    search_term: searchTerm,
    ...(resultCount !== undefined && { result_count: resultCount }),
  });
};

/**
 * Track page views (Gatsby handles this automatically, but you can use this for custom tracking)
 */
export const trackPageView = (
  path: string,
  title?: string
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "G-5BW8NGZEQK", {
      page_path: path,
      page_title: title,
    });
  }
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (
  percentage: number,
  article: string
) => {
  trackEvent("scroll", {
    event_category: "engagement",
    event_label: `${percentage}%`,
    value: percentage,
    article_title: article,
  });
};

/**
 * Track time on page
 */
export const trackTimeOnPage = (
  seconds: number,
  article: string
) => {
  trackEvent("timing_complete", {
    name: "read_time",
    value: seconds,
    event_category: "engagement",
    article_title: article,
  });
};

/**
 * Track tag clicks
 */
export const trackTagClick = (
  tag: string,
  source: "post" | "sidebar" | "related"
) => {
  trackEvent("select_content", {
    content_type: "tag",
    item_id: tag,
    source: source,
  });
};

/**
 * Track category navigation
 */
export const trackCategoryClick = (
  category: string
) => {
  trackEvent("select_content", {
    content_type: "category",
    item_id: category,
  });
};

/**
 * Track comment interactions
 */
export const trackComment = (
  action: "view" | "click" | "submit"
) => {
  trackEvent("comment", {
    event_category: "engagement",
    event_label: action,
  });
};

/**
 * Track RSS feed subscription
 */
export const trackRSSSubscription = (
  feedType: "all" | "devlog" | "lifelog"
) => {
  trackEvent("rss_subscription", {
    event_category: "conversion",
    feed_type: feedType,
  });
};
