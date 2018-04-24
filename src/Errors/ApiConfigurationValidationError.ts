export class ApiConfigurationValidationError extends Error {
    public constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
