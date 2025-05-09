// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchApi<T>(
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS',
    body?: T,
    headers?: Record<string, string>,
  } = {},
): Promise<never> {
  const { method = 'GET', body, headers = {} } = options;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (!res.ok) {
      return res;
    }
    return res.json();
  } catch (error) {
    console.log('ERROR', error);
    return Promise.reject(error);
  }
}
