import React, { createContext, useContext } from "react";

type AnalyticsContextType = {
  trackEvent: (eventName: string, params?: Record<string, any>) => void;
};

const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: () => {},
});

export const AnalyticsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const trackEvent = (eventName: string, params?: Record<string, any>) => {
    console.log(`Tracking event: ${eventName}`, params);
    // Add your analytics implementation here
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => useContext(AnalyticsContext);
