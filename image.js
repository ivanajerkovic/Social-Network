import { getImage, getUser, updateImage, getCommentsForImage, addComment } from './api.js'

const search = window.location.search
const pairs = search.split('&')
const imageParams = pairs[0].split('=')
const imageId = imageParams[1]
const activeUserParams = pairs[1].split('=')
const activeUserId = activeUserParams[1]

async function loadData() {
    const image = await getImage(imageId)
    const user = await getUser(image.userId)

    showImage(image, user)

    const comments = await getCommentsForImage(imageId)
    showComments(comments)
}

function showImage(image, user) {
    const divUser = document.getElementById('user') 
    divUser.href = `user_profile.html?id=${user.id}`
    divUser.innerHTML = `${user.name} ${user.surname}`

    const divImage = document.getElementById('single-image')
    divImage.src = image.imagePath

    const divDescription = document.getElementById('description')
    divDescription.innerHTML = image.description

    const divLikes = document.getElementById('likes')
    divLikes.innerHTML = image.likes

    const btnLike = document.getElementById('btn-like')
    btnLike.addEventListener('click', function () {
        updateImage(imageId, image.imagePath, image.description, image.userId, ++image.likes)
        divLikes.innerHTML = image.likes
    })
}

function showComments(comments) {
    const divComments = document.getElementById('comments')

    for (let i = 0; i < comments.length; i++) {
        showComment(comments[i], divComments)
    }
    const btnPublish = document.getElementById('btn-publish')
    btnPublish.addEventListener('click', async function() {
        const newCommentInput = document.getElementById('new-comment')
        const newComment = newCommentInput.value
        const addedComment = await addComment(imageId, activeUserId, newComment)

        showComment(addedComment, divComments)

        newCommentInput.value = ''
    })
}

async function showComment(comment, divComments) {
    const commentWrapper = document.createElement('div')
    commentWrapper.classList.add('comment-wrapper')
    divComments.appendChild(commentWrapper)

    const commentUser = await getUser(comment.userId)

    const divCommentUser = document.createElement('div')
    divCommentUser.innerHTML = `${commentUser.name} ${commentUser.surname}: `
    commentWrapper.appendChild(divCommentUser)

    const divComment = document.createElement('div')
    divComment.innerHTML = comment.commentText
    commentWrapper.appendChild(divComment)
}

window.addEventListener('load', loadData)
