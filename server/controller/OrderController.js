import { Op } from "sequelize"

const getAllOrder = async(req,res)=>{
    try {
        const result = await req.context.models.orders.findAll({
            include:[
                {
                    all:true
                }
            ]
        })
        res.status(200).send(result)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const getOrderById = async(req,res)=>{
    try {
        const result = await req.context.models.orders.findOne({
            include:[
                {
                    all:true
                }
            ],
            where:{
                order_id : req.params.id_order
            }
        })
        res.status(200).send(result)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const createOrder = async(req,res)=>{
    try {
        let today = new Date()
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        const cart=await req.context.models.carts.findAll({
            where:{
                user_id:req.params.id_user
            }
        })
        const order= await req.context.models.orders.findAll({})
        let kode=''
        if(order.length>0){
            let temp=order.length+1
            kode=String(temp).padStart(4,"0")
        }
        else{
            kode='0001'
        }
        
        let day=String(today.getDay()).padStart(2,"0")
        let month=String(today.getMonth()+1).padStart(2,"0")
        let year=today.getFullYear().toString().substring(2)


        if(cart.length!==0){
            const result= await req.context.models.orders.create({
                order_id:`${year}${month}${day}${kode}`,
                user_id:req.params.id_user,
                order_datetime: dateTime,
                status:'belum dibayar'
            })
            
            cart.map(cart=>{
                req.context.models.order_detail.create({
                    order_id:`${year}${month}${day}${kode}`,
                    menu_id:cart.menu_id,
                    quantity:cart.quantity,
                    total:cart.total,
                    description:cart.description
                })

                req.context.models.carts.destroy({
                    where:{
                        user_id:req.params.id_user
                    }
                })
            })
    
            res.status(200).send(result)

        }

        
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const updateOrder= async(req,res)=>{
    try {
    
        
            if(req.body.quantity>=1){
                const cekHarga= await req.context.models.menu.findOne({
                    where :{
                        menu_id:req.params.id_menu
                    }
                })

                await req.context.models.order_detail.update({
                  menu_id:req.params.id_menu,
                  quantity: req.body.quantity,
                  total:(cekHarga.harga*req.body.quantity),
                  description: req.body.description
              },{
                  returning:true, where:{
                    [Op.and]:[
                        {
                            menu_id:req.params.id_menu
                        },
                        {
                            order_id:req.params.id_order
                        }
                    ]
                  }
              })
              
            }else{
                await req.context.models.order_detail.destroy({
                    where:{
                        [Op.and]:[
                            {
                                menu_id:req.params.id_menu
                            },
                            {
                                order_id:req.params.id_order
                            }
                        ]
                    }
                })
            }

        
        const cekOrderDetail1 = await req.context.models.order_detail.findAll({
            where:{
                order_id:req.params.id_order
            }
        })
        res.status(200).send(cekOrderDetail1)
        
        
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const deleteOrder=async(req,res)=>{
    try {
        
        const order= await req.context.models.order_detail.destroy({
            where:{
                order_id:req.params.id_order
            }
        })
        const result= await req.context.models.orders.destroy({
            where:{
                order_id:req.params.id_order
            }
        })
        res.status(200).send('delete '+result+' rows');
    } catch (error) {
        res.status(404).json(error.message)
    }
}

export default{
    getAllOrder,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}
