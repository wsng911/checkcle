
/**
 * Determine SSL certificate status based on days left
 */
export const determineSSL状态 = (daysLeft: number, warningThreshold: number, expiryThreshold: number): string => {
    if (daysLeft <= 0) {
      return "expired";
    } else if (daysLeft <= expiryThreshold) {
      return "expiring_soon";
    } else if (daysLeft > expiryThreshold) {
      return "valid";
    } else {
      return "unknown";
    }
  };