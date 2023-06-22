// 3.Kreirati stranicu Registracija i na njoj kreirati inpute za unos svih podataka o korisniku i dugme Registruj se. Klikom na ovo dugme, preuzeti unete podatke i dodati korisnika u .json. Ukoliko neki od inputa nije popunjen, ne dodavati korisnika u .json i prikazati poruku o gresci.

import { addUser, getUserByUsername } from "./api.js"

const btnReg = document.getElementById('btn-register')
btnReg.addEventListener('click', registerUser)

const nameInput = document.getElementById('input-name')
const surnameInput = document.getElementById('input-surname')
const usernameInput = document.getElementById('input-username')
const passwordInput = document.getElementById('input-password')
const yearInput = document.getElementById('input-year')
const cityInput = document.getElementById('input-city')

const message = document.getElementById('message')

async function registerUser() {
    message.innerHTML = ''
    const name = nameInput.value
    const surname = surnameInput.value
    const username = usernameInput.value
    const password = passwordInput.value
    const year = Number(yearInput.value)
    const city = cityInput.value

    if (name == '' || surname == '' || username == '' || password == '' || year == '' || city == '' ) {
        alert('Enter all fields!')
        return
    }

    const userWithUsername = await getUserByUsername(username)
    if (userWithUsername.length != 0) {
        alert('Username already exists, enter another username!')
        return
    }

    await addUser(name, surname, username, password, year, city)

    message.innerHTML = 'Successfully registered'
    nameInput.value = ''
    surnameInput.value = ''
    usernameInput.value = ''
    passwordInput.value = ''
    yearInput.value = ''
    cityInput.value = ''

    const newUser = await getUserByUsername(username)
    window.open(`/user_profile.html?id=${newUser[0].id}`, '_self')
}


