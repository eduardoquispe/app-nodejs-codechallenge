export interface UpdateTransactionStatusUseCase {
  execute(id: string, status: number): Promise<void>;
}
