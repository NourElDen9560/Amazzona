require("dotenv").config()
const app = require("./app/app")
const PORT = process.env.PORT || 3000

// const bcryptjs = require("bcryptjs")
// const pass = "123"
// bcryptjs.hash(pass, 10)
// .then(encrypted=> console.log(encrypted))
app.listen(PORT, ()=> console.log(`we are on http://localhost:${PORT}`))