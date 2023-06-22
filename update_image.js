import { getImage, updateImage } from './api.js'

const search = window.location.search
const params = search.split('=')
const imageId = params[1]

window.addEventListener('load', loadData)

async function loadData() {
    const image = await getImage(imageId)

    const imageInput = document.getElementById('input-image-path')
    const descriptionInput = document.getElementById('input-description')

    imageInput.value = image.imagePath
    descriptionInput.value = image.description

    const btnUpdateImage = document.getElementById('btn-update-image')
    btnUpdateImage.addEventListener('click', update)

    async function update() {
        const imagePath = imageInput.value
        const description = descriptionInput.value
    
        await updateImage(imageId, imagePath, description, image.userId, image.likes)
    
        window.history.back()
    }
}



