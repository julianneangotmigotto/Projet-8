const URL_WORKS = 'http://localhost:5678/api/works'
const URL_CATEGORIES = 'http://localhost:5678/api/categories'
const URL_LOGIN = 'http://localhost:5678/api/users/login'

const get = url => fetch(url).then(res => res.json()).then(data => data)

const post = (url, data) => fetch(url, {
  method: 'post',
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' }
}).then(res => {
  if (res.status > 299 || res.status < 200) {
    throw new Error()
  }
  return res.json()
})

const deleteWork = id => fetch(`${URL_WORKS}/${id}`, {
  method: 'delete',
  headers: {
    Authorization: 'Bearer ' + localStorage.token
  }
}).then(() => console.log('le travail est supprimé'))

const getWorks = categoryId => get(URL_WORKS).then(data => {
  const filterData = categoryId ? data.filter(project => project.category.id === categoryId) : data
  return filterData
})

const getCategories = () => get(URL_CATEGORIES)

const login = ({ email, password }) => post(URL_LOGIN, { email, password }).then(data => data)

const postWorks = data => fetch(URL_WORKS, {
  method: 'post',
  headers: {
    Authorization: 'Bearer ' + localStorage.token
  },
  body: data
}).then(res => res.json())
