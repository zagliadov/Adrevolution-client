import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authControllerGetSessionInfo } from "../api/generated";

const sessionKey = ["session"];

export const useResetSession = () => {
  const queryClient = useQueryClient();
  return () => queryClient.removeQueries({ queryKey: sessionKey });
};

export const useSessionInfo = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: authControllerGetSessionInfo,
  });
};
