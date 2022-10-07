const getAllMenu= async(req,res)=>{
    try {
        const result = await req.context.models.menu.findAll({
            include:[{
                all:true
            }]
        })
        res.status(200).send(result);
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const getAllAppetizer= async(req,res)=>{
    try {
        const result = await req.context.models.menu.findAll({
            include:[
                {
                    model:req.context.models.type_m,
                    as:'type_id_type_ms',
                    attributes:['type_name'],
                    where:{
                        type_name:'appetizer'
                    }
                }
            ]
        })
        res.status(200).send(result);
    } catch (error) {
        res.status(404).json(error.message)
    }
}
const getAllMainCourse= async(req,res)=>{
    try {
        const result = await req.context.models.menu.findAll({
            include:[
                {
                    model:req.context.models.type_m,
                    as:'type_id_type_ms',
                    attributes:['type_name'],
                    where:{
                        type_name:'main course'
                    }
                }
            ]
        })
        res.status(200).send(result);
    } catch (error) {
        res.status(404).json(error.message)
    }
}
const getAllDesert= async(req,res)=>{
    try {
        const result = await req.context.models.menu.findAll({
            include:[
                {
                    model:req.context.models.type_m,
                    as:'type_id_type_ms',
                    attributes:['type_name'],
                    where:{
                        type_name:'deserts'
                    }
                }
            ]
        })
        res.status(200).send(result);
    } catch (error) {
        res.status(404).json(error.message)
    }
}
const getAllDrink= async(req,res)=>{
    try {
        const result = await req.context.models.menu.findAll({
            include:[
                {
                    model:req.context.models.type_m,
                    as:'type_id_type_ms',
                    attributes:['type_name'],
                    where:{
                        type_name: "drinks"
                    }
                }
            ]
        })
        res.status(200).send(result);
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const findOneMenu= async(req,res)=>{
    try {
        const result = await req.context.models.menu.findOne({
            where:{
                menu_id : req.params.id
            }
        })
        res.status(200).send(result);
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const createMenu = async(req,res)=>{
    const {files,fields} = req.fileAttrb
    try {
        const result = await req.context.models.menu.create({
            nama_menu : fields[0].value,
            harga: fields[1].value,
            gambar : files[0].file.newFilename
        })
        const fineOneMenu = await req.context.models.menu.findOne({
            where:{
                nama_menu:fields[0].value
            }
        })
        await req.context.models.menu_type.create({
            menu_id:fineOneMenu.menu_id,
            type_id:fields[2].value
        })
        res.status(200).send(result);
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const updateMenu = async(req,res)=>{
    const {files,fields} = req.fileAttrb
    try {
        const result = await req.context.models.menu.update({
            nama_menu : fields[0].value,
            harga: fields[1].value,
            gambar : files[0].file.newFilename
        },{
            returning :true,where:{menu_id: req.params.id}
        })
        
        await req.context.models.menu_type.update({
            type_id:fields[2].value
        },{
            returning :true,where:{menu_id: req.params.id}
        })
        res.status(200).send(result);
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const deleteMenu = async(req,res)=>{
    try {
        await req.context.models.menu_type.destroy({
            where:{
                menu_id: req.params.id
            }
        })
        const result = await req.context.models.menu.destroy({
            where:{
                menu_id: req.params.id
            }
        })
        
        res.status(200).send('delete '+result+' rows');
    } catch (error) {
        res.status(404).json(error.message)
    }
}


export default{
    getAllMenu,
    getAllAppetizer,
    getAllMainCourse,
    getAllDesert,
    getAllDrink,
    findOneMenu,
    createMenu,
    updateMenu,
    deleteMenu
}