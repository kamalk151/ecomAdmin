// fetch

export const fetchApi = async ({ url }) => {
  try {
    if(!url) return '' 
    const result = await fetch(url)
    if(result.ok) {
      const response = result.json()
      return response
    }
  }
  catch(error) {
    console.log(error, '----erroror')
  }
}




export const createApi = async ({ url, data, config }) => {
  // No content-type! With FormData obect, Fetch API sets this automatically.
  // Doing so manually can lead to an error
  let body = data
  if (!url) return ''
  if (config) {
    config = { 'Content-Type': 'application/json' }
    body = JSON.stringify(data)
  } else {
    config = {}
  }
  return apiServices ({ url, body, config })
}


export const apiServices = async ({ url, body, config }) => {
  try {
    // No content-type! With FormData obect, Fetch API sets this automatically.
    // Doing so manually can lead to an error
    const result = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: { ...config },
      redirect: 'follow',
      body
    })

    if(result.ok) {
      const response = result.json()
      return response
    }
    console.log(result)
    throw Error
  }
  catch(error) {
    console.log(error, '----erroror')
    throw Error
  }
}