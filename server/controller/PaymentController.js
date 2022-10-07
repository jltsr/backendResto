const getAllPayment = async(req,res)=>{
    try {
        const result = await req.context.models.payment.findAll({})
        res.status(200).send(result)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const getPaymentById = async(req,res)=>{
    try {
        const result = await req.context.models.payment.findOne({
            where:{
                order_id:req.params.id
            }
        })
        res.status(200).send(result)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const createPayment = async(req,res)=>{
    try {
        const cekOrder = await req.context.models.order_detail.findAll({
            where :{
                order_id : req.params.id
            }
        })
        let harga=0
        cekOrder.map(order =>{
            harga=harga+order.total
        })
        let today = new Date()
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        const result = await req.context.models.payment.create({
            order_id : req.params.id,
            sub_total : harga,
            payment_date_time: dateTime,
            discon: (req.body.discon*harga)/100,
            pajak: (req.body.pajak*harga)/100,
            total_payment_: harga-((req.body.discon*harga)/100)+(req.body.pajak*harga)/100,
        })
        
        await req.context.models.orders.update({
            status:'sudah dibayar'
        },{
            returning: true, where:{
                order_id:req.params.id
            }
        })
        res.status(200).send(result)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const editPayment = async(req,res)=>{
    try {
        const cekOrder = await req.context.models.order_detail.findAll({
            where :{
                order_id : req.params.id
            }
        })
        let harga=0
        cekOrder.map(order =>{
            harga=harga+order.total
        })
        const result = await req.context.models.payment.update({
            discon: (req.body.discon*harga)/100,
            pajak: (req.body.pajak*harga)/100,
            total_payment_: harga-((req.body.discon*harga)/100)+(req.body.pajak*harga)/100,
        },{
            returning:true, where:{
                order_id : req.params.id
            }
        })
        
        res.status(200).send(result)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const deletePayment = async(req,res)=>{
    try {
        await req.context.models.orders.update({
            status:'belum dibayar'
        },{
            returning: true, where:{
                order_id:req.params.id
            }
        })
        const result = await req.context.models.payment.destroy({
            where:{
                order_id:req.params.id
            }
        })
        
        res.status(200).send('delete '+result+' rows');
    } catch (error) {
        res.status(404).json(error.message)
    }
}

export default {
    getAllPayment,
    getPaymentById,
    createPayment,
    editPayment,
    deletePayment
}