const mongoose = require('mongoose');
// const { boolean } = require('zod');
require('dotenv').config();
const mongo_url = process.env.MONGO_URL;
mongoose.connect(mongo_url);
const todoSchema = mongoose.Schema({
	title: String,
	description: String,
	completed: Boolean
})
const todo = mongoose.model('todos', todoSchema)
module.exports = {
	todo: todo
}

