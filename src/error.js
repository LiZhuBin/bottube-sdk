/**
 * Custom error class for BoTTube SDK errors
 */
export class BoTTubeError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.name = 'BoTTubeError';
    this.statusCode = statusCode;
    this.code = code;
  }
}
