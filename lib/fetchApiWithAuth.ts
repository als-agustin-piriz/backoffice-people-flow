export async function fetchApiWithAuth<T = any>(
  url: string,
  accessToken: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any,
    headers?: Record<string, string>,
  } = {},
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;
  console.log('at', accessToken);

  const res = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API error: ${res.status} - ${errText}`);
  }

  return res.json();
}
