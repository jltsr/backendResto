import bcrypt from "bcrypt";
const getAllUser= async(req,res)=>{
    try {
        const result = await req.context.models.users.findAll({
            include:[{
                all:true
            }]
        })
        res.status(200).send(result);
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const createUser = async(req,res)=>{
    try {
        const cekUsername= await req.context.models.users.findAll({
            where:{
                username:req.body.username
            }
        })
        
        if(cekUsername.length===0){
            const salt = await bcrypt.genSalt(10)
            let hashPasword = req.body.pass
            hashPasword = await bcrypt.hash(hashPasword,salt)

            const result = await req.context.models.users.create({
                username:req.body.username,
                pass: hashPasword,
                no_meja: req.body.no_meja
            })

            const fineOneUser = await req.context.models.users.findOne({
                where:{
                    username:req.body.username
                }
            })
            await req.context.models.user_role.create({
                user_id:fineOneUser.user_id,
                role_id:req.body.role_id
            })
            res.status(200).send(result);
        }else{
            res.status(404).send('Maaf username sudah digunakan')
        }
    } catch (error) {
        res.status(404).json(error.message)
    }

}

const findUserById = async(req,res)=>{
    try {
        const result = await req.context.models.users.findOne({
            include:[
                {model:req.context.models.roles, as:'role_id_roles'}
            ],
            where:{
                user_id: req.params.id
            }
        })
        res.status(200).send(result);
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const updateUser = async(req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10)
        let hashPasword = req.body.pass
        hashPasword = await bcrypt.hash(hashPasword,salt)

        const result = await req.context.models.users.update({
            username: req.body.username,
            pass: hashPasword,
            no_meja: req.body.no_meja
        },{
            returning: true, where:{
                user_id:req.params.id
            }
        }
        )

        await req.context.models.user_role.update({
            role_id:req.body.role_id
        },{
            returning: true, where:{
                user_id:req.params.id
            }
        })
        res.status(200).send(result);
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const deleteUser = async(req,res)=>{
    try {
        await req.context.models.user_role.destroy({
            where:{
                user_id: req.params.id
            }
        })
        const result = await req.context.models.users.destroy({
            where:{
                user_id: req.params.id
            }
        })
        
        res.status(200).send('delete '+result+' rows');
    } catch (error) {
        res.status(404).json(error.message)
    }
}



export default{
    getAllUser,
    createUser,
    findUserById,
    updateUser,
    deleteUser
}