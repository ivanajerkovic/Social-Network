console.log('login')

import { getUserByUsernameAndPassword } from './api.js'

const btnReg = document.getElementById('btn-register')
btnReg.addEventListener('click', function () {
    window.open('/registration.html', '_self')
})

const btnLogin = document.getElementById('btn-login')
btnLogin.addEventListener('click', loadData)

const usernameInput = document.getElementById('username')
const passwordInput = document.getElementById('password')

async function loadData() {
    const username = usernameInput.value
    const password = passwordInput.value

    console.log(username, password)
    const user = await getUserByUsernameAndPassword(username, password)
    console.log(user[0])
    if (user.length == 0) {
        alert('Invalid username and/or password')
        return
    }
    
    window.open(`/user_profile.html?id=${user[0].id}`, '_self')

    usernameInput.value = ''
    passwordInput.value = ''
}