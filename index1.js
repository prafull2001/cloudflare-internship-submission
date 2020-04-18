addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch a request and follow redirects
 * @param {Request} request
 */
async function handleRequest(request) {
  let headers = new Headers({
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*'
  })
  const SECURE_RESPONSE = new Response('secure', {
    status: 200,
    headers: headers
  })
  const INSECURE_RESPONSE = new Response('not secure', {
    status: 200,
    headers: headers
  })
  const NO_SUCH_SITE = new Response('website not found', {
    status: 200,
    headers: headers
  })

  // let domain = new URL(request.url).searchParams.get('domain')
  // if (domain === null) {
  //   return new Response('Please pass in domain via query string', {
  //     status: 404
  //   })
  // }
  try {
    let resp = await fetch(`https://cfw-takehome.developers.workers.dev/api/variants`, {
      headers: {
        'User-Agent': request.headers.get('User-Agent')
      }
    })
    console.log('fetch worked');
  } catch (e) {
    return new Response(`Something went wrong ${e}`, {
      status: 404
    })
  }
}
