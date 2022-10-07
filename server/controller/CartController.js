const getCart= async(req,res)=>{
    try {
        const result = await req.context.models.carts.findAll({
            where:{
                user_id:req.params.id_user
            }
        })
        res.status(200).send(result);
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const getCartId = async(req,res)=>{
    try {
        const result = await req.context.models.carts.findOne({
            where:{
                [Op.and]:[
                    {
                        user_id:req.params.id_user
                    },
                    {
                        cart_id:req.params.id_cart
                    }
                ]
            }
        })
        res.status(200).send(result);
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const insertCart = async(req,res)=>{
    try {
        if(req.body.quantity>=1){
            const checkHarga=await req.context.models.menu.findOne({
                where:{
                    menu_id:req.body.menu_id
                }
            })
            const result = await req.context.models.carts.create({
                user_id:req.params.id_user,
                menu_id: req.body.menu_id,
                quantity: req.body.quantity,
                total:(checkHarga.harga*req.body.quantity),
                description: req.body.description
    
            })
            res.status(200).send(result);
        }
        
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const updateCart = async(req,res)=>{
    try {
        if(req.body.quantity>=1){
            const checkHarga=await req.context.models.menu.findOne({
                where:{
                    menu_id:req.body.menu_id
                }
            })
            const result = await req.context.models.carts.update({
                user_id:req.params.id_user,
                menu_id: req.body.menu_id,
                quantity: req.body.quantity,
                total:(checkHarga.harga*req.body.quantity),
                description: req.body.description
    
            },{
                returning:true, where:{
                    [Op.and]:[
                        {
                            user_id:req.params.id_user
                        },
                        {
                            cart_id:req.params.id_cart
                        }
                    ]
                }
            })
            res.status(200).send(result);
        }else{
            await req.context.models.carts.destroy({
                where:{
                    [Op.and]:[
                        {
                            user_id:req.params.id_user
                        },
                        {
                            cart_id:req.params.id_cart
                        }
                    ]
                }
            })
            res.status(200).send('sukses')
        }
    } catch (error) {
        res.status(200).send(error.message);
    }
}

const deleteCart= async(req,res)=>{
    
    try {
        await req.context.models.carts.destroy({
            where:{
                [Op.and]:[
                    {
                        user_id:req.params.id_user
                    },
                    {
                        cart_id:req.params.id_cart
                    }
                ]
            }
        })
        res.status(200).send('delete '+result+' rows');
    } catch (error) {
        res.status(200).send(result);
    }
}

export default{
    getCart,
    getCartId,
    insertCart,
    updateCart,
    deleteCart
}