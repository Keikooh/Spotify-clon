export const generateCodeVerifier = () => {
    const array = new Uint32Array( 52 / 2 );
    window.crypto.getRandomValues( array );
    return Array.from( array, dec => ( '0' + dec.toString(16)).slice( -2 )).join('');
}

export async function generateCodeChallenge(codeVerifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  const base64digest = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return base64digest;
}