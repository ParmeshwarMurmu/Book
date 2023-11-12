const express = require('express')
const {auth} = require('../middleware/auth')
const { BookModel } = require('../Model/BookSchema')

const bookRoute = express.Router()


bookRoute.post('/create', auth,  async(req, res)=>{

    // console.log(req.body);

    try {
        const book = new BookModel(req.body)
        await book.save()
        // console.log("++");
        res.status(200).send({"msg": "Book succesfully created"})
    } catch (error) {
        res.status(400).send({"msg": "Cannot create Book"})
    }
})

bookRoute.get('/', auth,  async(req, res)=>{

    const {userId} = req.body

    try {

        if(userId){
            const books = await BookModel.find({userId})
            res.status(200).send({"books": books})
        }
        
    } catch (error) {
        
    }
})

bookRoute.get('/singleBook/:id', auth, async(req, res)=>{

    const {id} = req.params;

    try {

        if(id){
            const single = await BookModel.findOne({_id: id})
            res.status(200).send({"SingleBook": single})
        }
        
    } catch (error) {
        res.status(400).send({"mag": "cannot find ingle book", "err": error})
    }
})

bookRoute.patch('/update/:id', auth, async(req, res)=>{

    const {id} = req.params;

    try {

        if(id){
            const single = await BookModel.findByIdAndUpdate({_id: id}, req.body)
            res.status(200).send({"msg": "Book Updated"})
        }
        
    } catch (error) {
        res.status(400).send({"mag": "cannot update book", "err": error})
    }
})

bookRoute.delete('/delete/:id', auth, async(req, res)=>{

    const {id} = req.params;

    try {

        if(id){
            const single = await BookModel.findByIdAndDelete({_id: id})
            res.status(200).send({"msg": "book deleted"})
        }
        
    } catch (error) {
        res.status(400).send({"mag": "cannot delete book", "err": error})
    }
})





module.exports = {
    bookRoute
}