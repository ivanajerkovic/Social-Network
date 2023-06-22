// 1. Implementirati stranicu Korisnici. Na njoj prikazati sve korisnike u tabeli.

console.log('Users')
import { getUsers, deleteUser } from './api.js'

let users
async function loadData() {
    users = await getUsers()
    showUsers(users) 

    const cities = users.map(user => user.city)
    console.log(cities)
    const cities1 = []
    for (let i = 0; i < cities.length; i++) {
        if (!cities1.includes(cities[i])) {
            cities1.push(cities[i])
        }
    }
    console.log(cities1)
    showCities(cities1)
    
}
window.addEventListener('load', loadData)

function showUsers(users) {
    const tableBody = document.querySelector('tbody')
    tableBody.innerHTML = ''
    
    for (let i = 0; i < users.length; i++) {
        const tr = document.createElement('tr')
        tableBody.appendChild(tr)
    
        const tdName = document.createElement('td')
        tdName.innerHTML = users[i].name
        tr.appendChild(tdName)
    
        const tdSurname = document.createElement('td')
        tdSurname.innerHTML = users[i].surname
        tr.appendChild(tdSurname)
    
        const tdUsername = document.createElement('td')
        tdUsername.innerHTML = users[i].username
        tr.appendChild(tdUsername)
    
        const tdPassword = document.createElement('td')
        tdPassword.innerHTML = users[i].password
        tr.appendChild(tdPassword)
    
        const tdYear = document.createElement('td')
        tdYear.innerHTML = users[i].yearOfBirth
        tr.appendChild(tdYear)
    
        const tdCity = document.createElement('td')
        tdCity.innerHTML = users[i].city
        tr.appendChild(tdCity)

        const tdShow = document.createElement('td')
        tr.appendChild(tdShow)

        const btnShow = document.createElement('button')
        btnShow.innerHTML = 'Show user'
        tdShow.appendChild(btnShow)
        btnShow.addEventListener('click', function () {
            window.open(`/user_profile.html?id=${users[i].id}`, '_self')
        })

        const tdDelete = document.createElement('td')
        tr.appendChild(tdDelete)

        const btnDelete = document.createElement('button')
        btnDelete.innerHTML = 'X'
        tdDelete.appendChild(btnDelete)
        btnDelete.addEventListener('click', async function () {
            await deleteUser(users[i].id)
            window.location.reload()
        })
    }
    const btnAdd = document.getElementById('add-user')
    btnAdd.addEventListener('click', function () {
        window.open('registration.html', '_self')
    })
}
function showCities(cities) {
    const select = document.getElementById('select-users')
    for (let i = 0; i < cities.length; i++) {
        const option = document.createElement('option')
        option.innerHTML = cities[i]
        option.value = cities[i]
        select.appendChild(option)
    }
}

document.getElementById('btn-filter-city').addEventListener('click', filterUsersByCity)

function filterUsersByCity() {
    const city = document.getElementById('select-users').value
    console.log(city)

    const filteredUsers = users.filter(user => user.city == city)
    showUsers(filteredUsers)
}

document.getElementById('btn-filter-year').addEventListener('click', filterUsersbyYear)
function filterUsersbyYear() {
    const min = Number(document.getElementById('input-min').value)
    const max = Number(document.getElementById('input-max').value)
    console.log(min, max)

    const filteredUsers = users.filter(user => user.yearOfBirth >= min && user.yearOfBirth <= max)
    showUsers(filteredUsers)
}