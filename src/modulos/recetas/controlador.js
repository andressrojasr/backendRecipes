const modelo = require('./modelo')

exports.createRecipe =(data) =>{
        if(!data.name) return 'No se ha enviado un nombre de receta'
        if(!data.steps) return 'No se ha enviado pasos de receta'
        if(!data.ingredients) return 'No se ha enviado ingredientes de receta'
        if(!data.type) return 'No se ha enviado tipo de receta'
        return modelo.createRecipe(data.name, data.steps, data.ingredients, data.type)
}

exports.createFavorite =(data) =>{
    if(!data.idReceta) return 'No se ha enviado un id de receta'
    if(!data.idUsuario) return 'No se ha enviado un id de usuario'
    return modelo.createFavorite(data.idReceta, data.idUsuario)
}

exports.getAllRecipes = () =>{
    return modelo.getAllRecipes()
}

exports.getRecipes = (data) => {
    if(!data.userId) return 'No se ha enviado un id de usuario'
    return modelo.getRecipes(data.userId)
}

exports.getRecipe = (data) => {
    if(!data.id) return 'No se ha enviado un id de receta'
    return modelo.getRecipe(data.id)
}

exports.getRecipesByType = (data) => {
    if(!data.userId) return 'No se ha enviado un id de usuario'
    if(!data.type) return 'No se ha enviado un tipo de receta'
    return modelo.getRecipesByType(data.type, data.userId)
}

exports.getRecipesByName = (data) => {
    if(!data.userId) return 'No se ha enviado un id de usuario'
    if(!data.name) return 'No se ha enviado un nombre de receta'
    return modelo.getRecipesByName(data.name, data.userId)
}

exports.getRecipesByNameAndType = (data) =>{
    if(!data.userId) return 'No se ha enviado un id de usuario'
    if(!data.name) return 'No se ha enviado un nombre de receta'
    if(!data.type) return 'No se ha enviado un tipo de receta'
    return modelo.getRecipesByNameAndType(data.name, data.type, data.userId)
}

exports.deleteRecipe = (data) => {
    if(!data.id) return 'No se ha enviado un id de receta'
    return modelo.deleteRecipe(data.id)
}

exports.deleteFavorite = (data) => {
    if(!data.idReceta) return 'No se ha enviado un id de receta'
    if(!data.idUsuario) return 'No se ha enviado un id de usuario'
    return modelo.deleteFavorite(data.idReceta, data.idUsuario)
}

exports.updateRecipe = (params, data) => {
    if(!params.id) return 'No se ha enviado un id de receta'
    if(!data.name) return 'No se ha enviado un nombre de receta'
    if(!data.steps) return 'No se ha enviado pasos de receta'
    if(!data.ingredients) return 'No se ha enviado ingredientes de receta'
    if(!data.type) return 'No se ha enviado tipo de receta'
    return modelo.updateRecipe(params.id, data.name, data.steps, data.ingredients, data.type)
}