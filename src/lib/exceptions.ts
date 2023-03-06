export class ApiKeyExistsError extends Error {
  constructor(message = 'You already have a valid API key.') {
    super(message)
  }
}
