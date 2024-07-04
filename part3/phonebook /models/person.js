require('dotenv').config()
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('failed to connect to MongoDb', error.message)
  })

const personSchema = mongoose.Schema({
  name: {
    type: String, 
    minLength: 3,
    required: true
  },
  number: {
  	type: String, 
    minLength: 8,
    required: true,
    validate: {
      validator: function(v) {
      // Regex to match xx-xxxxxxx or xxx-xxxxxxxx
      	return /^\d{2,3}-\d+$/.test(v)
    	},
    	message: props => `${props.value} is not a valid phone number! Format should be xx-xxxxxxx or xxx-xxxxxxxx.`
  	}
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)



