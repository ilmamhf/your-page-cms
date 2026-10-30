import { isAxiosError } from "axios";

/**
 * Turns any thrown value into a message safe to show to the user.
 */
export const errorMessage = (error: unknown, fallback = "Something went wrong."): string => {
  if (isAxiosError(error)) {
    if (!error.response) return "Cannot reach the server. Is the backend running?";

    const data = error.response.data as { message?: string } | undefined;
    return data?.message ?? `${fallback} (HTTP ${error.response.status})`;
  }

  if (error instanceof Error) return error.message;

  return fallback;
};
