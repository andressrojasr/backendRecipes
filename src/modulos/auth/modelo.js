const supabase = require('../../DB/postgresql').supabase

exports.createUser = async (email, password, name, lastName) =>{
    let userExist = await existUser(email)
    if( userExist == true ) return 'Usuario ya existente'
    let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    })
    if(error) return error
    let { dataInsert, errorInsert } = await supabase
    .from('usuarios')
    .insert([
    { id: data.user.id, name: name, lastName: lastName, isAdmin: false },
    ])
    .select()
    console.log(dataInsert)
    if(errorInsert) {
        const { dataUser, errorUser } = await supabase.auth.admin.deleteUser(data.user.id)
        if(dataUser) return error
    }
    return 'Usuario creado'
}

exports.login = async (email, password) =>{
    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    if(error) return error
    let { data: users, errorUsers } = await supabase
    .from('usuarios')
    .select('name, lastName, isAdmin')
    .eq('id', data.user.id)
    .single()
    if(errorUsers) return errorUsers
    const user = {
         "userId": data.user.id,
         "email":data.user.email,
         "name": users.name,
         "lastName": users.lastName,
         "isAdmin": users.isAdmin,
         "access_token": data.session.access_token
     }
    return user
}

exports.getResetToken = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
         redirectTo: `http://localhost:5173/restablecer-password/`,
    })
    if(error) return error
    return data
}

exports.resetPassword = async (token, refreshToken, newPassword) => {   
    const { dataSigIn, errorsigIn } = await supabase.auth.refreshSession({"refresh_token": refreshToken})
    if (errorsigIn) errorsigIn
    console.log(dataSigIn)
    const { data, error } = await supabase.auth.updateUser(token,{
        password: newPassword
    })
    if(error) return error
    const { data: user, errorUpdate } = await supabase.auth.admin.updateUserById(
        data.user.id,
        { password: newPassword }
    )
    if(errorUpdate) return errorUpdate
    return user
}

exports.authMiddleware = async (datos) =>{
    const token = datos.headers.authorization?.split(' ')[1]
    if(!token) return 'Token no proporcionado'
    let { data, error } = await supabase.auth.getUser(token)
    if(error){
        console.log("Failed to get supabase auth user", error)
        return "Unauthorized"
    }
    return data
}

async function existUser (email) {
    const {data: {users}, error} = await supabase.auth.admin.listUsers()
    if(error) return error
    let existUser = users.find(user => user.email == email)
    if(existUser) return true
    return false
}