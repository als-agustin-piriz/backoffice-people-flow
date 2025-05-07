export async function fetchApi<T = any>(
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any,
    headers?: Record<string, string>,
  } = {},
): Promise<any> {
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
