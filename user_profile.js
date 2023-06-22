// 2. Implementirati stranicu Profil korisnika. Na njoj pribaviti jednog korisnika po id-ju i prikazati sve njegove podatke u proizvoljnim html elementima. Takodje, pribaviti i sve njegove slike i prikazati ih na stranici u tabeli ili nekim drugim html elementima.

console.log('User Profile')
import { getUser, getImagesByUserId, deleteImage, getCommentsForImage } from './api.js'

const search = window.location.search
const params = search.split('=')
const userId = params[1]

const linkToHomePage = document.querySelector('.link-home-page')
linkToHomePage.href = `index.html?userId=${userId}`

const divName = document.getElementById('name')
const divSurname = document.getElementById('surname')
const divUsername = document.getElementById('username')
const divPassword = document.getElementById('password')
const divYear = document.getElementById('year-of-birth')
const divCity = document.getElementById('city')
const divImages = document.querySelector('.images')

async function loadData() {
    const user = await getUser(userId)

    divName.innerHTML = user.name
    divSurname.innerHTML = `  ${user.surname}`
    divUsername.innerHTML = `Username: ${user.username}`
    divPassword.innerHTML = `Password: ${user.password}`
    divYear.innerHTML = `Year Of Birth: ${user.yearOfBirth}`
    divCity.innerHTML = `City: ${user.city}`

    const images = await getImagesByUserId(userId)

    for (let i = 0; i < images.length; i++) {
        const divImage = document.createElement('div')
        divImage.classList.add('div-image')
        divImages.appendChild(divImage)

        const imgWrapper = document.createElement('div')
        imgWrapper.classList.add('img-wrapper')
        divImage.appendChild(imgWrapper)

        const img = document.createElement('img')
        img.src = images[i].imagePath
        imgWrapper.appendChild(img)

        const divDescription = document.createElement('div')
        divDescription.innerHTML = images[i].description
        divImage.appendChild(divDescription)

        const divLikes = document.createElement('div')
        divLikes.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> ${images[i].likes}`
        divImage.appendChild(divLikes)

        const divComments = document.createElement('div')
        divComments.innerHTML = 'Comments:'
        divImage.appendChild(divComments)
        
        const comments = await getCommentsForImage(images[i].id)

        for (let j = 0; j < comments.length; j++) {
            const commentWrapper = document.createElement('div')
            commentWrapper.classList.add('comment-wrapper')
            divComments.appendChild(commentWrapper)

            const commentUser = await getUser(comments[j].userId)

            const divCommentUser = document.createElement('div')
            divCommentUser.innerHTML = `${commentUser.name} ${commentUser.surname}: `
            commentWrapper.appendChild(divCommentUser)

            const comment = document.createElement('div')
            comment.innerHTML = comments[j].commentText
            commentWrapper.appendChild(comment)
        }

        const btnDeleteImage = document.createElement('button')
        btnDeleteImage.innerHTML = 'X'
        btnDeleteImage.classList.add('btn-delete')
        imgWrapper.appendChild(btnDeleteImage) 
        btnDeleteImage.addEventListener('click', async function () {
            await deleteImage(images[i].id)
            window.location.reload()
        })

        const btnUpdateImage = document.createElement('button')
        btnUpdateImage.innerHTML = 'Update image'
        btnUpdateImage.classList.add('btn-update')
        imgWrapper.appendChild(btnUpdateImage)
        btnUpdateImage.addEventListener('click', function () {
            window.open(`update_image.html?id=${images[i].id}`, '_self')
        })
    }
}
window.addEventListener('load', loadData)

const btnAddImage = document.getElementById('btn-add-image')
btnAddImage.addEventListener('click', function () {
    window.open(`add_image.html?id=${userId}`, '_self')
})
