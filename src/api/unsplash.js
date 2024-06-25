export async function searchImage(query) {
  const result = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}`, {
    headers: {
      Authorization: 'Client-ID oOAGYBT1uX57tZfvdI6Ne_QHj_1WQpgHqQOqlTIX3mQ'
    }
  })
  const images = (await result.json()).results
  const urls = []
  images.forEach((image) => {
    urls.push(image.urls.full)
  })
  return urls
}
