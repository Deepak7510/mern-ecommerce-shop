import moongose from 'mongoose'

const categorySchema = new moongose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: String,
        required: true,
    }
},{timestamps:true});

const Category=moongose.model('Category',categorySchema);
export default Category
