export function createGetRequestOptions(accessToken: string) {
  return {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
  }
}
