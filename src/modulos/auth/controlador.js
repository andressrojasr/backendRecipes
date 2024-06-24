const modelo = require('./modelo')

exports.createUser =(data) =>{
        if(!data.email) return 'No se ha enviado un email'
        if(!data.password) return 'No se ha enviado una contraseña'
        if(!data.name) return 'No se ha enviado un nombre'
        if(!data.lastName) return 'No se ha enviado un apellido'
        return modelo.createUser(data.email, data.password, data.name, data.lastName)
}

exports.login =(data) =>{
    if(!data.email) return 'No se ha enviado un email'
    if(!data.password) return 'No se ha enviado una contraseña'
    return modelo.login(data.email, data.password)
}

exports.getResetToken = (data) =>{
    if(!data.email) return 'No se ha enviado un email'
    return modelo.getResetToken(data.email)
}

exports.resetPassword = (data) =>{
    if(!data.token) return 'No se ha enviado un token'
    if(!data.refreshToken) return 'No se ha enviado un refresh token'
    if(!data.password) return 'No se ha enviado una contraseña'
    return modelo.resetPassword(data.token, data.refreshToken, data.password)
}