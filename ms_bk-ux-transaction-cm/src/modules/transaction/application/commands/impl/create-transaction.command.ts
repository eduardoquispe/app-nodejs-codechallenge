export class CreateTransactionCommand {
  constructor(
    public accountExternalIdDebit: string,
    public accountExternalIdCredit: string,
    public value: number,
    public transferTypeId: number,
  ) {}
}
