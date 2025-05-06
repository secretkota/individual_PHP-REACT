const URL = "http://localhost:8080/api";

export async function loginUser(username, password) {
      const res = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ username, password})
      });
  
      return await res.json();
  }

export const registerUser = async (username, email, password) => {
    const data = await fetch(`${URL}/register`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
    });

    return data.json();
}

export const addADS = async (data, token) => {
  const res = await fetch(`${URL}/createAd`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    },
    body: JSON.stringify(data)
  })

  return await res.json()
}

export const getMyAds = async (token) => {
  const res = await fetch(`${URL}/getAd`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  })

  return await res.json()
}

export const getAds = async (token) => {
  const res = await fetch(`${URL}/ads`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  })

  return await res.json()
}

export const getAd = async (token, id) => {
  const res = await fetch(`${URL}/ad?id=${id}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  })

  return await res.json()
}

export const dropMyAds = async (token, id) => {
  const res = await fetch(`${URL}/deleteAd?id=${id}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  })

  return await res.json()
}

export const editAds = async (data, id) => {
  const res = await fetch(`${URL}/editAd?id=${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  

  return await res.json()

}