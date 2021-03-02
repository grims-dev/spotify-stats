export function createGetRequestOptions(accessToken: string) {
  const headers = new Headers();
  headers.append('Authorization', 'Bearer ' + accessToken);
  return {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
  }
}
