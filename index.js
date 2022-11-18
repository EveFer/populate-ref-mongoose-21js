const mongoose = require('mongoose');
require('dotenv').config()
const { Schema } = mongoose;

const  {DB_USER, DB_PASSWORD, DB_NAME, DB_HOST} = process.env
const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

const personSchema = Schema({
  name: String,
  age: Number
});
// const commentSchema = Schema({
//     comment: {
//         type: String
//     },
//     author: { type: Schema.Types.ObjectId, ref: 'Person' }
//   });

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  // comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);
// const Comments = mongoose.model('Comment', commentSchema);

async function createPerson() {
    await Person.create({name: 'Lore', age: 25})
}

function createPost() {
    const newPost = {
        title: 'Como crear un proyecto con react',
        author: '6350c8fc7dc601244d2c4963'
    }

    return Story.create(newPost)
}


mongoose.connect(URL)
    .then(async (connection) => {
        console.log('Database connected')

        // await createPerson()

        // const postCreated = await createPost()
        // console.log(postCreated)

        const storyFound = await Story.findById('6350c94b4ede9b03dcf61d1b').populate('author')
        // const storyFound = await Story.findById('634776d5ed256b16948cbf0b').populate({path: 'author', select: ['name']})
        console.log(storyFound)
    })
    .catch(err => console.error('Error: ', err))