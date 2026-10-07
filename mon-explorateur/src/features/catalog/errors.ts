export class ExternalApiError extends Error {
 constructor(
 message: string,
 readonly status: number,
 ) {
 super(message);
 this.name = "ExternalApiError";
 }
}

export class InvalidApiDataError extends Error {
 constructor(message: string) {
 super(message);
 this.name = "InvalidApiDataError";
 }
}
