export class ApiError extends Error {
  public code: number | string;
  public data?: any;

  public constructor(code: number, message?: string, data?: any) {
    super(message);
    this.code = code;
    this.data = data;
  }
}
