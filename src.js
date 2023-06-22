import { getImages, getUser } from './api.js'

const search = window.location.search
const params = search.split('=')
const activeUserId = params[1]

const divImages = document.querySelector('.images')

async function loadData() {
    const images = await getImages()
    images.sort((a, b) => b.likes - a.likes)
    showImages(images)
}

async function showImages(images) {
    for (let i = 0; i < images.length; i++) {
        const divImage = document.createElement('a')
        divImage.href = `image.html?ImageId=${images[i].id}&activeUserId=${activeUserId}`
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

        const user = await getUser(images[i].userId)
        const divUser = document.createElement('div')
        divUser.innerHTML = `by ${user.name} ${user.surname}`
        divImage.appendChild(divUser)
    }
}
window.addEventListener('load', loadData)