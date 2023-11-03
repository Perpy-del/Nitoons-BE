class BadUserRequestError extends Error {
    status: number;
    errorType: string;
    constructor(message:string) {
      super(message);
      this.status = 400;
      this.errorType = "BadUserRequestError";
    }
  }
  
  class NotFoundError extends Error {
    status: number;
    errorType: string;
    constructor(message: string) {
      super(message);
      this.status = 404;
      this.errorType = "NotFoundError";
    }
  }
  
  class UnAuthorizedError extends Error {
    status: number;
    errorType: string;
    constructor(message: string) {
      super(message);
      this.status = 401;
      this.errorType = "UnAuthorizedError";
    }
  }
  
  class InternalServerError extends Error {
    status: number;
    errorType: string;
    constructor(message: string) {
      super(message);
      this.status = 500;
      this.errorType = "InternalServerError";
    }
  }
  
  export {
    BadUserRequestError,
    NotFoundError,
    UnAuthorizedError,
    InternalServerError,
  };