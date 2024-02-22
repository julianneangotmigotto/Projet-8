const gallery = document.querySelector('.gallery')
const filter = document.getElementById('filter')
const loginA = document.getElementById('login')
const banner = document.querySelector('.banner')
const header = document.querySelector('header')

/**
 * Method to create dom gallery
 * @param {Array} data - Array of object from API /works
 * @param {HTMLElement} container - append all element to this container, by default is Gallery
 * @param {Boolean} isModal 
 */
const createGallery = (data, container = gallery, isModal = false) => {
  // vider le container gallery
  container.innerHTML = ''

  // for each data
  data.forEach(item => {
    const figure = document.createElement('figure')

    const img = document.createElement('img')
    img.src = item.imageUrl
    img.setAttribute('alt', item.title)
    figure.appendChild(img)

    if (!isModal) {
      const figCaption = document.createElement('figcaption')
      figCaption.innerHTML = item.title
      figure.appendChild(figCaption)
    }

    if (isModal) {
      const garbageIcon = document.createElement('img')
      garbageIcon.alt = 'garbage icon'
      garbageIcon.src = '../assets/icons/garbage.png'
      garbageIcon.setAttribute('class', 'icon garbage-icon')
      figure.appendChild(garbageIcon)

      garbageIcon.addEventListener('click', () => {
        deleteWork(item.id)
          .then(() => getWorks())
          .then(data => createGallery(data, modalGallery, true))
      })
    }

    container.appendChild(figure)
  })
}

/**
 * on va créer les élèments suivants dynamiquement:
 * <div id="filter">
 *  <button>Tous</bouton>
 *  <button>Object</button>
 *  ....
 * </div>
 *
 * @param {Array} data - Array of object from API /categories
 */
const createCategories = data => {
  console.log('categories')

  const button = document.createElement('button')
  button.innerHTML = 'Tous'
  button.setAttribute('class', 'category-active')
  filter.appendChild(button)
  button.addEventListener('click', async () => {
    const buttons = document.querySelectorAll('#filter button')
    buttons.forEach(element => element.setAttribute('class', ''))
    await getWorks().then(data => createGallery(data))
    button.setAttribute('class', 'category-active')
  })

  // For each category
  data.forEach(item => {
    const button = document.createElement('button')
    button.innerHTML = item.name
    filter.appendChild(button)

    button.addEventListener('click', async () => {
      const buttons = document.querySelectorAll('#filter button')
      buttons.forEach(element => element.setAttribute('class', ''))
      button.setAttribute('class', 'category-active')
      await getWorks(item.id).then(data => createGallery(data))
    })
  })
}

if (localStorage.token) {
  loginA.innerHTML = 'logout'
  banner.style.display = 'flex'
  header.style.marginTop = '79px'
  filter.style.display = 'none'
  editModal.style.display = 'flex'
  gallery.style.marginTop = '60px'
}

loginA.addEventListener('click', () => localStorage.clear())

const init = async () => {
  await getWorks().then(data => createGallery(data))
  await getCategories().then(data => createCategories(data))
}

init()
