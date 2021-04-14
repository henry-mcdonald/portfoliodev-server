require('./models')
User = require('./models/User')
// Create a User (manual step)

// Find a User

let user1
let userId

const FindAUser = async() => {
    user1 = await User.aggregate([{ $match: {} }, { $sample: { size: 1 } }])
    console.log(user1)
    userId = user1._id
}
FindAUser()




// Query HTML 
