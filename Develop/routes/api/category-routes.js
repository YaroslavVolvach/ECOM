const router = require('express').Router();
const {Product, Category} = require('../../models/index.js');
// The `/api/categories` endpoint

router.get('/',(req, res) => {
    Category.findAll({include: Product})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
});

router.get('/:id', async(req, res) => {
  const category = await Category.findByPk(req.params.id, {include: Product})
  if(category === null){
    res.status(404).json({'Error: ': 'Catrgory does not exist. Check your ID number!'})
  }else{
    res.status(200).json(category)
  }
    
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json(err))
});

router.put('/:id', async (req, res) => {
  const category = await Category.update({where: {id: req.params.id}})
  if(category === null){
    res.status(404).json({'Error: ': 'Catrgory does not exist. Check your ID number!'})
  }else{
    res.status(200).json(category)
  }
});

router.delete('/:id', async (req, res) => {
  const category = await Category.update({where: {id: req.params.id}})
  if(category === null){
    res.status(404).json({'Error: ': 'Catrgory does not exist. Check your ID number!'})
  }else{
    res.status(200).json(category)
  }
});

module.exports = router;