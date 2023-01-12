class AppError extends Error {
    statusCode: number;
    errors: string[]

    constructor(message: string[], statusCode = 400) {
        super();

        this.message = message[0];
        this.statusCode = statusCode;
        this.errors = message;
    };
}

export { AppError };