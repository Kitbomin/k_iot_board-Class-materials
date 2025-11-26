// src/query/client.ts
import { QueryClient } from "@tanstack/react-query";


//! react query 전체 공통 설정
//  QueryClient를 만들면서, 모든 useQuery의 기본 옵션 설정
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30, // 30초
      refetchOnWindowFocus: false,  // 창으로 돌아왔을 때 자동 refetch를 할지의 여부
      retry: 1,                     // 실패 시 몇번 재시도를 할 지에 대한 설정
    },
  },
});