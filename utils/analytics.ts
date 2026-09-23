/**
 * Safely trigger a Google Analytics 4 (GA4) custom event.
 */
export const trackAmazonClick = (
  itemTitle: string,
  category: string,
  destinationUrl: string
) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    try {
      (window as any).gtag("event", "click_amazon_restock", {
        event_category: "affiliate_outbound",
        event_label: itemTitle,
        item_category: category,
        destination_url: destinationUrl,
      });
    } catch (e) {
      console.error("Error firing GA4 event", e);
    }
  }
};

/**
 * Track when a user copies a search query to clipboard.
 */
export const trackCopyQuery = (itemTitle: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    try {
      (window as any).gtag("event", "copy_amazon_query", {
        event_category: "user_intent",
        event_label: itemTitle,
      });
    } catch (e) {
      console.error("Error firing GA4 event", e);
    }
  }
};

/**
 * Track when a user shares or prints a checklist.
 */
export const trackShareChecklist = (slug: string, method: "link" | "email" | "print") => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    try {
      (window as any).gtag("event", "share_checklist", {
        event_category: "engagement",
        event_label: slug,
        share_method: method,
      });
    } catch (e) {
      console.error("Error firing GA4 event", e);
    }
  }
};

/**
 * Track when a user redirects to Amazon to checkout a remote cart.
 */
export const trackCartCheckout = (slug: string, itemCount: number) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    try {
      (window as any).gtag("event", "click_amazon_cart_checkout", {
        event_category: "conversion",
        event_label: slug,
        item_count: itemCount,
      });
    } catch (e) {
      console.error("Error firing GA4 event", e);
    }
  }
};
