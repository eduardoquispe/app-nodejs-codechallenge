export class UpdateTransactionCommand {
  constructor(
    public readonly externalId: string,
    public readonly typeName: string,
    public readonly statusName: string,
    public readonly value: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
