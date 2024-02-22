const loginError = document.getElementById('login-error')
const form = document.getElementById('login')
const email = document.getElementById('email')
const password = document.getElementById('password')

form.addEventListener('submit', async e => {
  e.preventDefault()

  await login({ email: email.value, password: password.value })
    .then(data => {
      loginError.innerHTML = ''
      console.log(data)
      localStorage.token = data.token
      console.log('window.location.origin:', window.location.origin)
      window.location.href = `${window.location.origin}/index.html`
    })
    .catch(() => {
      loginError.innerHTML = 'Erreur dans l’identifiant ou le mot de passe'
    })
})
