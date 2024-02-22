const modal = document.getElementById('modal')
const editModal = document.getElementById('edit-modal')
const modalBtnClose = document.getElementById('modal-btn-close')
const modalGallery = document.querySelector('#modal .gallery')
const btnAddPicture = document.getElementById('btn-add-picture')
const formAddPicture = document.getElementById('form-add-picture')
const modalBtnBack = document.getElementById('modal-btn-back')
const fileUpload = document.getElementById('file-upload')
const preview = document.getElementById('preview')
const labelFileUpload = document.querySelector('#container-picture label')
const spanFileUpload = document.querySelector('#container-picture span')
const fileError = document.getElementById('file-error')
const submitFormAddPicture = document.querySelector('#form-add-picture input[type="submit"]')
const inputTitle = document.getElementById('title')
const titleError = document.getElementById('title-error')
const selectCategory = document.getElementById('select-category')
const categoryError = document.getElementById('select-error')

editModal.addEventListener('click', async () => {
    modal.style.display = 'block'
    await getWorks().then(data => createGallery(data, modalGallery, true))
})

const closeModal = async () => {
    modal.style.display = 'none'
    await getWorks().then(data => createGallery(data))
}

const resetForm = () => {
    preview.src = '../assets/icons/picture.png'
    inputTitle.value = ''
    selectCategory.value = 0
    selectCategory.selected = ''
    // TODO reset input file
    // formAddPicture.reset()
    // reset also error message
    isErrorMessageDisplayed(fileError, true)
    isErrorMessageDisplayed(titleError, true)
    isErrorMessageDisplayed(categoryError, true)
    submitFormAddPicture.classList.add('disabled')
}

modalBtnClose.addEventListener('click', () => closeModal())

btnAddPicture.addEventListener('click', async () => {
    modalGallery.style.display = 'none'
    btnAddPicture.style.display = 'none'
    modalBtnBack.style.display = 'flex'
    formAddPicture.style.display = 'block'

    labelFileUpload.style.display = 'flex'
    spanFileUpload.style.display = 'block'
    // reset form
    resetForm()

    // On récupère les categories en bdd pour les mettre dans le select
    selectCategory.innerHTML = ''
    const categories = await getCategories()
    const firstOption = document.createElement('option')
    firstOption.setAttribute('value', 0)
    firstOption.innerHTML = ''
    firstOption.setAttribute('selected', true)
    selectCategory.appendChild(firstOption)
    categories.forEach(item => {
        const option = document.createElement('option')
        option.setAttribute('value', item.id)
        option.innerHTML = item.name
        selectCategory.appendChild(option)
    })
})

modalBtnBack.addEventListener('click', () => {
    modalGallery.style.display = 'grid'
    btnAddPicture.style.display = 'flex'
    modalBtnBack.style.display = 'none'
    formAddPicture.style.display = 'none'
})

const hasValidExtension = (extension, validExtensions = ['jpg', 'jpeg', 'png']) => validExtensions.includes(extension.toLowerCase())

const isErrorMessageDisplayed = (errorContainer, isValid) => {
    errorContainer.style.display = isValid ? 'none' : 'block'
    return isValid
}

const fileIsValid = () => {
    const [file] = fileUpload.files
    let isValid = false
    // Check if file name contains extension valid
    if (file) {
        const fileNameSplitted = file.name.split('.')
        const extension = fileNameSplitted[fileNameSplitted.length - 1].toLowerCase()
        isValid = file.size <= 4000000 && hasValidExtension(extension)
        if (isValid) {
            preview.src = URL.createObjectURL(file)
            preview.style.height = 'auto'
            preview.style.width = 'auto'
            labelFileUpload.style.display = 'none'
            spanFileUpload.style.display = 'none'
        }
    }
    return isValid
}

const checkTitleIsValid = () => inputTitle.value.length > 2

const checkCategoryIsValid = () => parseInt(selectCategory.value) !== 0

const formIsValid = () => {
    const pictureIsValid = isErrorMessageDisplayed(fileError, fileIsValid())
    const titleIsValid = isErrorMessageDisplayed(titleError, checkTitleIsValid())
    const categoryIsValid = isErrorMessageDisplayed(categoryError, checkCategoryIsValid())
    const isValid = pictureIsValid && titleIsValid && categoryIsValid
    submitFormAddPicture.classList[isValid ? 'remove' : 'add']('disabled')
    return isValid
}

fileUpload.addEventListener('change', () => formIsValid())
inputTitle.addEventListener('input', () => formIsValid())
selectCategory.addEventListener('change', () => formIsValid())

formAddPicture.addEventListener('submit', e => {
    e.preventDefault()
    if (formIsValid()) {
        const formData = new FormData()
        const [file] = fileUpload.files
        formData.append('image', file)
        formData.append('title', inputTitle.value)
        formData.append('category', parseInt(selectCategory.value))
        postWorks(formData).then(() => closeModal())
    }
})
