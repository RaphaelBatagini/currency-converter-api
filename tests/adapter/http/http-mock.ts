import { Http } from "../../../src/adapter/http/interface";

export namespace MockedHttp {
  export class Request implements Http.Request {
    params = {};
  }

  export class Response implements Http.Response {
    private responseStatus: number;

    status(statusCode: number): Response {
      this.responseStatus = statusCode;
      return this;
    }

    send(result: any) {
      return { status: this.responseStatus, body: result };
    }
  }
}