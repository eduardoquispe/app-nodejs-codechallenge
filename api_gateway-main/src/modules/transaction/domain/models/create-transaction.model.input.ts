export interface CreateTransactionModelInput {
  accountExternalIdDebit: string;
  accountExternalIdCredit: string;
  value: number;
  transferTypeId: number;
}
