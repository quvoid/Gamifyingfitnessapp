export const setupGlobalErrorHandling = () => {
  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    logError('Uncaught error', event.error);
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    logError('Unhandled rejection', event.reason);
  });
};

export const logError = (message: string, error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const stackTrace = error instanceof Error ? error.stack : undefined;
  
  console.error(`${message}:`, error);
  
  // In production, send errors to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Here you would integrate with your error tracking service
    // Example:
    // errorTrackingService.captureException(error, { extra: { message } });
    console.log('Error reported to tracking service:', message, error);
  }
  
  return { errorMessage, stackTrace };
};
