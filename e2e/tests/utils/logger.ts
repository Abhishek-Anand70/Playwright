function timestamp(): string {
  return new Date().toLocaleTimeString('en-GB', { hour12: false });
}

export function log(message: string): void {
  console.log(`[${timestamp()}] ${message}`);
}

export function safeUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    return `${url.origin}${url.pathname}`;
  } catch {
    return '<unavailable>';
  }
}

export function redactSecrets(message: string): string {
  const secrets = [process.env.ORANGEHRM_PASSWORD, process.env.ORANGEHRM_USERNAME]
    .filter((value): value is string => Boolean(value));
  return secrets.reduce((safeMessage, secret) => safeMessage.split(secret).join('[REDACTED]'), message);
}
