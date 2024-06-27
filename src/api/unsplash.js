const key = 'oOAGYBT1uX57tZfvdI6Ne_QHj_1WQpgHqQOqlTIX3mQ'

export async function searchImage(query) {
  const result = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}`, {
    headers: {
      Authorization: `Client-ID ${key}`
    }
  })
  const imagesJson = await result.json()
  const imagesResults = imagesJson.results
  return imagesResults.map((image) => image.urls.full)
}
