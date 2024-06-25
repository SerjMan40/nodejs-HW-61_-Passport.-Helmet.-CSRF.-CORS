import fs from 'fs'
import path from 'path'

const usersFilePath = path.resolve('src/data/users.json')

const readUsersFromFile = () => {
  const data = fs.readFileSync(usersFilePath, 'utf-8')
  return JSON.parse(data)
}

const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
}

const addUser = (user) => {
  const users = readUsersFromFile()
  users.push(user)
  writeUsersToFile(users)
}

const findUserById = async (id) => {
  const users = await readUsersFromFile();
  return users.find(user => user._id === id);
};

const updateUser = (userId, updatedUser) => {
  const users = readUsersFromFile()
  const index = users.findIndex((user) => user.id === userId)
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser }
    writeUsersToFile(users)
    return true
  }
  return false
}

const deleteUser = (userId) => {
  const users = readUsersFromFile()
  const index = users.findIndex((user) => user.id === userId)
  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0]
    writeUsersToFile(users)
    return deletedUser
  }
  return null
}

export { readUsersFromFile, addUser, updateUser, deleteUser, findUserById }
