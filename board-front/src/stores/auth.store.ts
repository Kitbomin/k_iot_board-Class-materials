// src/store/auth.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MeResponse } from "@/types/user/user.dto";
import type { LoginResponse } from "@/types/auth/auth.dto";

type AuthState = {
  // 상태 관리 데이터
  accessToken: string | null;
  user: MeResponse | null;
  isInitialized: boolean;     // 초기 로딩 여부

}

type AuthActions = {
  // 액세스 토큰 설정 함수 (cf. persist: 로컬 스토리지 저장 여부 결정)
  setAccessToken: (token: string | null) => void;

  // 사용자 정보 저장
  setUser: (user: MeResponse | null) => void;

  // 로그아웃 하는거
  clearAuth: () => void;
  
  // 로컬 스토리지에 있는 토큰을 읽어와 상태에 반영하는 함수
  hydrateFromStorage: () => void;
}

// 로컬 스토리지에 사용할 access 토큰 키 이름 상수
const AUTH_STORAGE = "auth-storage";  


export const useAuthStore = create(
  persist<AuthState & AuthActions>(
    (set, get) => ({
      accessToken: null,
      user: null,
      isInitialized: false,

      setAccessToken: (token) => set({ accessToken: token }), 
      setUser: (user) => set({user}),
      clearAuth: () => set({ accessToken: null, user: null}),

      // persist 초기화 완료 여부 플래그 설정
      hydrateFromStorage: () => {
        // persist로부터 복원된 상태를 그대로 사용 -> 추가 작업이 필요 없음
        set({ isInitialized: true })
      }
    }),

    //! persist 옵션
    //  : 모든 localStorage 작업을 자동 처리해줌
    //  - 키 이름: AUTH_STORAGE (auth-storage)
    {
      name: AUTH_STORAGE, // 로컬 스토리지 키값
      onRehydrateStorage: () => (state) => {
        // persist가 localStorage 값을 복원 완료 후 실행
        if(state) {
          state.isInitialized = true;
        }
      }
    }
  )
);
