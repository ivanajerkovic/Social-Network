import { addImage } from './api.js'

const search = window.location.search
const params = search.split('=')
const userId = params[1]

const btnAddImage = document.getElementById('btn-add-image')
btnAddImage.addEventListener('click', loadData)

const imageInput = document.getElementById('input-image-path')
const descriptionInput = document.getElementById('input-description')

async function loadData() {
    const imagePath = imageInput.value
    const description = descriptionInput.value
    
    await addImage(imagePath, description, userId, 0)

    window.history.back()
}