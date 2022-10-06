const router = require("express").Router();


// GET "/api"
router.get("/", (req, res, next) => {
    res.json("All good in here");
});


  
const uploadRoutes = require("./upload.routes")
router.use("/upload", uploadRoutes)

module.exports = router