const supabase = require('../../DB/postgresql').supabase

exports.createRecipe = async (name, steps, ingredients, type) =>{  
    const { data, error } = await supabase
    .from('recetas')
    .insert({ nameReceta: name, stepsReceta: steps, ingredientsReceta: ingredients, typeReceta: type })
    .select()
    if(error) return error
    return data
}

exports.createFavorite = async(idReceta, idUsuario) =>{
    const { data, error } = await supabase
    .from('favoritos')
    .insert({ idReceta: idReceta, idUsuario })
    .select()
    if(error) return error
    return data
}

exports.deleteFavorite = async (idReceta, idUsuario) => { 
    const { error } = await supabase
    .from('favoritos')
    .delete()
    .eq('idReceta', idReceta)
    .eq('idUsuario', idUsuario)
    if(error) return error
    return 'Favorito eliminado'
}

exports.getAllRecipes = async () =>{
    let { data: recipes, error } = await supabase
    .from('recetas')
    .select('*')
    .order('id', {ascending: true})
    if(error) return error
    return recipes
}

exports.getRecipes = async (userId) => {   
    let { data: recipes, error } = await supabase
    .from('recetas')
    .select('*')
    .order('id', {ascending: false})
    if(error) return error
    let { data: favoritos, error: errorFavoritos } = await supabase
        .from('favoritos')
        .select('idReceta')
        .eq('idUsuario', userId);
    if(errorFavoritos) return errorFavoritos
    const recetasFavoritas = new Set(favoritos.map(favorito => favorito.idReceta));
    recipes = recipes.map(receta => ({
        ...receta,
        isFavorite: recetasFavoritas.has(receta.id)
    }));
    return recipes
}

exports.getRecipe = async (id) => {
    let { data: recetas, error } = await supabase
    .from('recetas')
    .select("*")
    .eq('id', id)
    if(error) return error
    return recetas
}

exports.getRecipesByType = async (type, userId) => {
    let { data: recetas, error } = await supabase
    .from('recetas')
    .select("*")
    .eq('typeReceta', type)
    .order('id', {ascending: true})
    console.log(type)
    if(error) return error
    let { data: favoritos, error: errorFavoritos } = await supabase
        .from('favoritos')
        .select('idReceta')
        .eq('idUsuario', userId);
    if(errorFavoritos) return errorFavoritos
    const recetasFavoritas = new Set(favoritos.map(favorito => favorito.idReceta));
    recetas = recetas.map(receta => ({
        ...receta,
        isFavorite: recetasFavoritas.has(receta.id)
    }));
    return recetas
}

exports.getRecipesByName = async (name, userId) => {
    let { data: recetas, error } = await supabase
    .from('recetas')
    .select("*")
    .ilike('nameReceta', `%${name}%`)
    .order('id', {ascending: true})
    console.log(name)
    if(error) return error
    let { data: favoritos, error: errorFavoritos } = await supabase
        .from('favoritos')
        .select('idReceta')
        .eq('idUsuario', userId);
    if(errorFavoritos) return errorFavoritos
    const recetasFavoritas = new Set(favoritos.map(favorito => favorito.idReceta));
    recetas = recetas.map(receta => ({
        ...receta,
        isFavorite: recetasFavoritas.has(receta.id)
    }));
    return recetas
}

exports.getRecipesByNameAndType = async (name, type, userId) => {
    let { data: recetas, error } = await supabase
    .from('recetas')
    .select("*")
    .ilike('nameReceta', `%${name}%`)
    .ilike('typeReceta', type)
    .order('id', {ascending: true})
    console.log(name)
    if(error) return error
    let { data: favoritos, error: errorFavoritos } = await supabase
        .from('favoritos')
        .select('idReceta')
        .eq('idUsuario', userId);
    if(errorFavoritos) return errorFavoritos
    const recetasFavoritas = new Set(favoritos.map(favorito => favorito.idReceta));
    recetas = recetas.map(receta => ({
        ...receta,
        isFavorite: recetasFavoritas.has(receta.id)
    }));
    return recetas
}

exports.deleteRecipe = async (id) => { 
    const { error } = await supabase
    .from('recetas')
    .delete()
    .eq('id', id)
    if(error) return error
    return 'Receta eliminada'
}

exports.updateRecipe = async (id, name, steps, ingredients, type) => {    
    const { data, error } = await supabase
    .from('recetas')
    .update({ nameReceta: name, stepsReceta: steps, ingredientsReceta: ingredients, typeReceta: type })
    .eq('id', id)
    .select()
    if(error) return error
    return data
}