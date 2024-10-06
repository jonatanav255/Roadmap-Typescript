import './style.css'

interface User {
  id: number
  username: string
  email: string
}
const contentDiv = document.getElementById('content') as HTMLDivElement
const viewUsersLink = document.getElementById(
  'view-users-link'
) as HTMLAnchorElement
const addUsersLink = document.getElementById(
  'add-user-link'
) as HTMLAnchorElement

// Sample user data
let users = [
  { username: 'user1', email: 'user1@example.com' },
  { username: 'user2', email: 'user2@example.com' }
]

const apiBaseUrl = 'http://localhost:8080' // Replace with your actual API URL
const getUsersUrl = `${apiBaseUrl}/users` // Endpoint for getting all users
const postUserUrl = `${apiBaseUrl}/users`

const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(getUsersUrl)
    if (!response.ok) {
      throw new Error('Error fetching users')
    }
    const users: User[] = await response.json() // Expecting an array of users
    return users
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

const displayUsers = async (): Promise<void> => {
  try {
    const users = await fetchUsers()
    const userListHtml = `
                <h2>Get All Users</h2>
                <ul>
                  ${users
                    .map(user => `<li>${user.username} (${user.email})</li>`)
                    .join('')}
                </ul>
              `
    contentDiv.innerHTML = userListHtml
  } catch (error) {
    contentDiv.innerHTML =
      '<p>Error fetching users. Please try again later.</p>'
  }
}
function displayAddUserForm () {
  const addUserFormHtml = `
                  <h2>Create Account</h2>
                  <form id="add-user-form">
                    <label for="username">Username</label>
                    <input type="text" id="username" required>
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                    <button type="submit">Add User</button>
                  </form>
                `
  contentDiv.innerHTML = addUserFormHtml

  const addUserForm = document.getElementById(
    'add-user-form'
  ) as HTMLFormElement
  const userNameInput = document.getElementById('username') as HTMLInputElement
  const emailInput = document.getElementById('email') as HTMLInputElement

  addUserForm.addEventListener('submit', event => {
    event.preventDefault()

    users.push({ username: userNameInput.value, email: emailInput.value })

    addUserForm.reset()

    alert('User added successfully!')
    displayUsers()
  })
}

viewUsersLink.addEventListener('click', event => {
  event.preventDefault()
  displayUsers()
})

addUsersLink.addEventListener('click', event => {
  event.preventDefault()
  displayAddUserForm()
})
