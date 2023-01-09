const BadRequest = require('../errors/BadRequest');
const Quote = require('../model/quote')

const postQuote = async (req, res) => {
   
   const data = req.body

   try {  
      const quote = await Quote.create(data);
      res.status(200).send('Ok');


   } catch (error) {
      throw new BadRequest("Please try again later");
   }

}
   
const getQuote = async (req,res) => { 
   const quote = await Quote.find({});

   res.status(200).json(quote);
}


module.exports = { postQuote, getQuote };