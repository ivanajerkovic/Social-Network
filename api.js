// -	pribavljanje svih korisnika
async function getUsers() {
    const response = await fetch('http://localhost:3000/users', {method: 'GET'})
    const data = await response.json()
    return data
}

// -	pribavljanje korisnika po id-ju
async function getUser(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {method: 'GET'})
    const data = await response.json()
    return data
}

// -	pribavljanje korisnika po username-u
async function getUserByUsername(username) {
    const response = await fetch(`http://localhost:3000/users?username=${username}`, {method: 'GET'})
    const data = await response.json()
    return data
}

// -	pribavljanje svih slika
async function getImages() {
    const response = await fetch('http://localhost:3000/images', {method: 'GET'})
    const data = await response.json()
    return data
}
// -	pribavljanje slike po id-ju
async function getImage(id) {
    const response = await fetch(`http://localhost:3000/images/${id}`, {method: 'GET'})
    const data = await response.json()
    return data
}

// -	pribavljanje svih korisnika koji zive u odredjenom gradu
async function getUsersByCity(city) {
    const response = await fetch(`http://localhost:3000/users?city=${city}`, {method: 'GET'})
    const data = await response.json()
    return data
}

// -	pribavljanje korisnika sa odredjenim korisnickim imenom i sifrom
async function getUserByUsernameAndPassword(username, password) {
    const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`, {method: 'GET'})
    const data = await response.json()
    return data
}

// -	pribavljanje svih slika koje pripadaju odredjenom korisniku
async function getImagesByUserId(userId) {
    const response = await fetch(`http://localhost:3000/images?userId=${userId}`, {method: 'GET'})
    const data = await response.json()
    return data
}

// -	dodavanje novog korisnika
async function addUser(name, surname, username, password, yearOfBirth, city) {
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            surname: surname,
            username: username,
            password: password,
            yearOfBirth: yearOfBirth,
            city: city
        })
    })
    const data = await response.json()
    return data
}

// -	dodavanje nove slike
async function addImage(imagePath, description, userId, likes) {
    const response = await fetch('http://localhost:3000/images', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            imagePath: imagePath,
            description: description,
            userId: userId,
            likes: likes
        })
    })
    const data = await response.json()
    return data
}

// -	azuriranje korisnika
async function updateUser(id, name, surname, username, password, dateOfBirth, city) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            surname: surname,
            username: username,
            password: password,
            dateOfBirth: dateOfBirth,
            city: city
        })
    })
    const data = await response.json()
    return data
}

// -	azuriranje slike
async function updateImage(id, imagePath, description, userId, likes) {
    const response = await fetch(`http://localhost:3000/images/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            imagePath: imagePath,
            description: description,
            userId: userId,
            likes: likes
        })
    })
    const data = await response.json()
    return data
}

// -	brisanje slike po idju
async function deleteImage(id) {
    const response = await fetch(`http://localhost:3000/images/${id}`, {method: 'DELETE'})
    const data = await response.json()
    return data
}

// -	pribavljanje svih komentara za odredjenu sliku
async function getCommentsForImage(imageId) {
    const response = await fetch(`http://localhost:3000/comments?imageId=${imageId}`, {method: 'GET'})
    const data = await response.json()
    return data
}

// -	dodavanje komentara
async function addComment(imageId, userId, commentText) {
    const response = await fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            imageId: imageId,
            userId: userId,
            commentText: commentText
        })
    })
    const data = await response.json()
    return data
}

// -	brisanje komentara
async function deleteComment(id) {
    const response = await fetch(`http://localhost:3000/comments/${id}`, {method: 'DELETE'})
    const data = await response.json()
    return data
}

// - brisanje korisnika

async function deleteUser(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {method: 'DELETE'})
    const data = await response.json()
    return data
}

export { getUsers, getUser, getImages, getImage, getUsersByCity,getUserByUsername, getUserByUsernameAndPassword, getImagesByUserId, addUser, addImage, updateUser, updateImage, deleteImage, getCommentsForImage, addComment, deleteComment, deleteUser}