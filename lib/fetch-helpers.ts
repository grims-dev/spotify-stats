export function createGetRequestOptions(accessToken: string) {
  return {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
  }
}

export async function getRequest(endpointURL: string, accessToken: string) {
  return fetch(endpointURL, createGetRequestOptions(accessToken))
    .then((response) => response.json())
    .catch((error) => console.error(error))
    .then((json) => { return json })
}