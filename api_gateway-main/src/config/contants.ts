export const TRANSACTION_CREATE_TOPIC = 'transaction.create';
export const TRANSACTION_DETAIL_TOPIC = 'transaction.detail';

export const SUBSCRIPTED_TOPICS = [
  TRANSACTION_CREATE_TOPIC,
  TRANSACTION_DETAIL_TOPIC,
];

export const PROVIDERS = {
  CreateTransactionUseCase: 'CreateTransactionUseCase',
  GetTransactionUseCase: 'GetTransactionUseCase',
};
