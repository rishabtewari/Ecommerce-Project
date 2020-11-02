const Category = require('../models/category');

const { errorHandler } = require('../helpers/dbErrorHandler');


exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};
exports.read = (req, res) => {
    return res.json(req.category);
};

exports.categoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err || !category){
            res.status(400).json({
                err:"Category not found"
            })
           
        }
        req.category=category;
        next();
    });
};

exports.update=(req,res)=>{
    const category=req.category
    category.name=req.body.name
    category.save((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        res.json(data);
    })
}

exports.remove=(req,res)=>{
    const category=req.category
    category.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
                
            });
        }
        res.json({
            message: 'Category deleted successfully'
        });
    });
}

exports.list=(req,res)=>{
    Category.find().exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        res.json(data);
    });
}
