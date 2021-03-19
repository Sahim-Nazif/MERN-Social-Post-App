exports. createPostValidator=(req, res, next)=>{

    req.check('title','Title is required').notEmpty()
    req.check('title','Title must be between 4 to 150 characters').isLength({
        min:4, max:150
    })
    req.check('body','Body content is required').notEmpty()
    req.check('body','Title must be between 10 to 2000 characters').isLength({
        min:10, max:2000
    })
    //check errors
    const errors=req.validationErrors()

    //if error show the first one as it happen
    if (errors){
        const firstError=errors.map((error)=>error.msg)[0]
        return res.status(400).json({error:firstError})
    }
    //proceed to next middle ware

    next()

}


