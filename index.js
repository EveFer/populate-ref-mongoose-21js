const mongoose = require('mongoose');
require('dotenv').config()
const { Schema } = mongoose;

const  {DB_USER, DB_PASSWORD, DB_NAME, DB_HOST} = process.env
const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

const personSchema = Schema({
  name: String,
  age: Number
});
const commentSchema = Schema({
    comment: {
        type: String
    },
    author: { type: Schema.Types.ObjectId, ref: 'Person' }
  });

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);
const Comments = mongoose.model('Comment', commentSchema);

async function createPerson() {
    await Person.create({name: 'Fer Toledo', age: 25})
}

function createPost() {
    const newPost = {
        title: 'Como consumir mis endpoints desde una app movil',
        author: '634782bd494d1e2fd6434912'
    }

    return Story.create(newPost)
}


mongoose.connect(URL)
    .then(async (connection) => {
        console.log('Database connected')

        // await createPerson()

        // const postCreated = await createPost()
        // console.log(postCreated)

        const storyFound = await Story.findById('634782f371cf1d7b805106b6').populate('author comments')
        // const storyFound = await Story.findById('634776d5ed256b16948cbf0b').populate({path: 'author', select: ['name']})
        console.log(storyFound)
    })
    .catch(err => console.error('Error: ', err))