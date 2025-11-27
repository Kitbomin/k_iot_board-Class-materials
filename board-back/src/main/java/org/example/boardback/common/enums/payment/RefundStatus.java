package org.example.boardback.common.enums.payment;
/**
 * 환불 상태 (Refund Status)
 *
 * - PaymentStatus가 "REFUNDED"로 바뀌기까지의 "환불 프로세스"를 세분화하여 관리하는 상태값
 *
 *  상태흐름 예시)
 *      REQUESTED => (PG 환불 API 호출 시도) => COMPLETED OR FAILED
 *
 */
public enum RefundStatus {
    REQUESTED,
    COMPLETED,
    FAILED
}
