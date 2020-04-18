addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

class ElementHandler {
  element(element) {
    if(element.tagName == 'title'){
      element.setInnerContent('Title Changed!')
    } else if(element.tagName == 'h1'){
      element.setInnerContent('h1 Changed!')
    } else if(element.tagName == 'p'){
      element.setInnerContent('Description changed!')
    }else if(element.tagName == 'a'){
      element.setInnerContent('See my Projects!')
      const attribute = element.getAttribute('href')
      element.setAttribute('href',attribute.replace('https://cloudflare.com',
        'https://github.com/prafull2001?tab=repositories'))
    }
  }
}

async function handleRequest(request) {

  var random = Math.round(Math.random());
  const resp = await fetch('https://cfw-takehome.developers.workers.dev/api/variants');
  var data = await resp.json();
  var variants = data.variants;

  var fetchedLink = variants[random];
  const resp2 = await fetch(fetchedLink);

  return new HTMLRewriter()
    .on('title', new ElementHandler())
    .on('h1', new ElementHandler())
    .on('p', new ElementHandler())
    .on('a', new ElementHandler())
    .transform(resp2)

}
