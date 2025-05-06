// --- HELPERS ---

/**
 * Logs Firestore-related errors in a consistent way.
 * @param action - Action that was being performed when the error occurred.
 * @param error - The error object or message.
 */
export function logFirestoreError(action: string, error: unknown) {
    if (error instanceof Error) {
      console.error(`[Firestore Error] ${action}: ${error.message}`, error);
    } else {
      console.error(`[Firestore Error] ${action}:`, error);
    }
}

export function logInfo(action: string, message: string) {
  console.log(`Action: ${action} Message: ${message}`);
}
  