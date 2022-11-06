const wait = (timeout: number) =>
  new Promise( resolve => setTimeout(resolve, timeout) )

const PASSWORD = "password1234"
const USERS = [
  "user1@example.com",
  "user2@example.com",
  "user3@example.com",
  "user4@example.com"
]

export interface UserData {
  username: string
}

export const login: (login: string, password: string) => Promise<UserData> =
  (login, password) =>
    wait(2000)
      .then(() => {
        console.log(`Login: ${login}, Password: ${password}`)
        if (!USERS.includes(login)) throw new Error("User not found!")
        if (password !== PASSWORD) throw new Error("Invalid Password!")
        return { username: login }
      })
