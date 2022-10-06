

const router = require("express").Router();
const uploader = require("../middlewares/uploader")

const ImageModel = require("../models/model.image")

router.post("/", async (req, res, next) => {

    const { image } = req.body
    try {
      const newTodo = await ImageModel.create({
        image: image
      })
  
      res.json(newTodo)
   } catch (error) {
      next(error)
    }
})

// POST "api/upload"
router.post("/", uploader.single("image"), (req, res,next) => {
    
    if(req.file === undefined) {
        res.status(400).json({errorMessage: "formato incorrecto"})
        return
    }
    res.json({imageUrl: req.file.path})

})


module.exports = router;