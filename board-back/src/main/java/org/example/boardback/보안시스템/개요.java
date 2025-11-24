package org.example.boardback.보안시스템;

/*
 * === 프로젝트 보안 흐름 설명 ===
 * : Spring Security + JWT (Access/Refresh)
 *      + DB에 저장하는 RefreshToken + 커스텀 필터 구조
 *
 * cf) OAuth2(카카오/구글/네이버) 구현 이전 구조
 *
 * 1. 전체 구조: 학교 시스템에 비유를 해봄
 *    회원가입 - "학생부"에 이름을 등록하는 것
 *    로그인 - "학생증" 발급 받기
 *
 *    AccessToken) 1일짜리 학생증 (학생이 소지함) => 복도를 돌아다닐 때 보여주는 1일짜리 학생증
 *    RefreshToken) 학생증 재발급 권한 기록 (교무실에 보관될거임)
 *
 *    JWT 필터: JwtAuthenticationFilter) 학생증 검사를 하는 선도부 => 복도에서 AccessToken을 검사함
 *    Spring Security 설정: WebSecurityConfig) 교칙설정
 *                        >> 어디는 누구나 들어와도 되고, 어디는 학생만, 어디는 교사만 출입가능한 그런 설정
 *
 *    로그아웃 - "학생증 재발급 권한 기록(RefreshToken)"을 삭제함
 *
 *    OAuth2 - "카카오/구글/네이버/..." 이 대신 학생증을 발급해주고, 해당 학생증으로 학교에 출입하는 것
 *
 *
 * 2. Spring Security 설정 (WebSecurityConfig)
 *  : 교칙 설정과 복도 선도부를 어떻게 배치할것인지 설정하는 공간
 *
 *      연관 파일
 *      config/WevSecurityConfig.java
 *      security/filter/JwtAuthenticationFilter.java
 *              /provider/JwtProvider.java
 *              /user/*
 *              /handler/*
 *
 *  2-1. WebSecurityConfig 역할
 *     : @EnableWebSecurity + SecurityFilterChain을 사용해
 *
 *     1) 세션 사용 안함 (STATELESS)
 *      - 옛날 방식: 서버가 로그인 세션을 기억했음
 *      - 지금 방식: 서버는 세션을 쓰지 않고, 매 요청마다 JWT를 검사함 (JWT는 프론트가 가지고있음)
 *          > 선도부/선생님은 기억이 없음
 *          -> 이 학생이 뭔 학생인지 일일이 다 기억을 안한다는 소리임 -> 학생증(토큰) 자체에 정보가 들어가있으니까 기억할 필요가 없다는 소리
 *
 *     2) 어떤 URL은 누구나, 어떤 URL은 로그인이 필요한지 설정을 할거임
 *
 *     3) JWTAuthenticationFilter를 필터 체인에 추가함
 *          - 모든 요청이 컨트롤러에 도달하기 전에 JwtAuthenticationFilter가 먼저 "학생증 검사"를 수행하는거임
 *
 *     4) 예외 처리 핸들러 연결
 *          - 인증이 되지 않았으면 -> JsonAuthenticationEntryPoint -> 401 (Unauthorized)
 *          - 권한이 없으면       -> JsonAccessDeniedHandler      -> 403 (Forbidden)
 *              >> 둘 다 JSON의 형태로 에러 응답을 반환하기 때문에 프론트에서 처리하기가 쉬움
 *
 * 2-2. JwtProvider 역할
 *    : Access Token / Refresh Token / Email 인증 토큰을 만들고 검증하는 역할
 *
 *    1) 토큰에 담기는 정보
 *     - subject: username (로그인 아이디)
 *     - roles: 권한 (ROLE_USER, ROLE_ADMIN ~~)
 *     - iat: 발급 시각
 *     - exp: 만료 시간
 *
 *   2) 생성 메서드들
 *     - generateAccessToken: 짧은 만료시간을 가져야함
 *     - generateRefreshToken: 긴 만료시간을 가져야 함
 *     - generateEmailJwtToken: 이메일 인증 / 비밀번호 재설정 등에 사용해야함
 *
 *   3) 검증 메서드들
 *     - isValidToken(String token): 서명 검사 + 만료시간 체크 >> 문제 없으면 true 반환
 *     - getUsernameFromJwt(String token): 토큰 안에 들어있는 username(subject) 꺼내기
 *     - getRemainingMillis(String token): 만료까지 남은 시간 반환
 *     - removeBearer(String bearerToken): "Bearer "까지 제거한 값 반환
 *
 * 2-3. JwtAuthenticationFilter 역할
 *    : 매 요청마다 token 검사를 하는 역할 (학생증 검사)
 *
 *   1) 요청 헤더에서 토큰을 뽑기
 *      : HttpServletRequest(요청)에 있는 Authorization을 꺼내서 "Bearer " 문자 제거 후 반환
 *
 *   2) JwtProvider로 토큰 유효성을 검사함
 *      + 토큰 안에 있는 username 값을 추출해 반환
 *
 *   3) UserPrincipalMapper로 DB 에서 유지 정보 조회
 *      >> UserPrincipal로 생성
 *
 *   4) SecurityContext에 인증정보 저장
 *      >> SecurityContextHolder 내부의 context에 저장해야함
 *      >> 저장할 데이터 형식이 UsernamePasswordAuthenticationToken 형식으로 저장되어야함
 *
 *   5) 컨트롤러에서 @AuthenticationPrincipal 등으로 현재 유저 정보 사용 가능
 *
 *   ※ 내 요청에 AccessToken이 실려있으면, 해당 필터가 "로그인된 상태"로 만들어주고, 없으면 그냥 "비로그인 상태"로 컨트롤러까지 전달됨
 *
 * 2-4. 회원가입 흐름 (AuthServiceImpl.signup())
 *
 * 2-5. 로그인 흐름 (AuthServiceImpl.login())
 */


public class 개요 {
}
