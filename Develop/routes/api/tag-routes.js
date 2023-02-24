const router = require('express').Router();
const {Tag, Product, ProductTag} = require('../../models/index.js');

router.get('/', (req, res) => {
  Tag.findAll({include: {model: Product, through: ProductTag, as: 'tagIds'}})
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json(err))
});

router.get('/:id', async (req, res) => {
  const tag = await Tag.findByPk(req.params.id)
  if (tag === null){
      res.status(404).json({'Error': 'Tag does not exist. Check your ID number!'})
  }else{
      res.status(200).json(tag)
  }
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((tag) => {
    if (req.body.productIds.length) {
      const productTagIdArr = req.body.productIds.map((product_id) => {
        return {
          tag_id: tag.id,
          product_id,
        };
      });
      return ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json(tag);
  })
  .then((productTagIds) => res.status(200).json(productTagIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});


router.put('/:id', (req, res) => {
    Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((product) => {
        return ProductTag.findAll({ where: { tag_id: req.params.id } });
      })
      .then((productTags) => {
        const productTagIds = productTags.map(({ product_id }) => product_id);
        const newProductTags = req.body.tagIds
          .filter((product_id) => !productTagIds.includes(product_id))
          .map((product_id) => {
            return {
              tag_id: req.params.id,
              product_id,
            };
          });
        // figure out which ones to remove
        const productTagsToRemove = productTags
          .filter(({ product_id }) => !req.body.tagIds.includes(product_id))
          .map(({ id }) => id);
  
        // run both actions
        return Promise.all([
          ProductTag.destroy({ where: { id: productTagsToRemove } }),
          ProductTag.bulkCreate(newProductTags),
        ]);
      })
      .then((updatedProductTags) => res.json(updatedProductTags))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });  
});

router.delete('/:id', async (req, res) => {
  const tag = await Tag.destroy({where: {id: req.params.id}})
  if(tag === null){
    res.status(404).json({'Error: ': 'Tag does not exist. Check your ID number!'})
  }else{
    res.status(200).json(tag)
  }
});

module.exports = router;
