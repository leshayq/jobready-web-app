// Интерфейс токена верификации для подписи электронной почты. Используется в сервисе отправки ссылки подтверждения почты
export interface VerificationTokenPayload {
  email: string;
}
