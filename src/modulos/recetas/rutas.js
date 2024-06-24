const express = require('express');

const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')

const router = express.Router();

router.post('/', createRecipe)
router.post('/createFavorite', createFavorite)
router.post('/deleteFavorite', deleteFavorite)
router.post('/getRecipes', getRecipes)
router.get('/:id', getRecipe)
router.get('/', getAllRecipes)
router.post('/getByType', getRecipesByType)
router.post('/getByName', getRecipesByName)
router.post('/getByNameAndType', getRecipesByNameAndType)
router.delete('/:id', deleteRecipe)
router.put('/:id', updateRecipe)

async function createRecipe(req, res, next){
    try {
        const items = await controlador.createRecipe(req.body)
        respuesta.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function createFavorite(req, res, next){
    try {
        const items = await controlador.createFavorite(req.body)
        respuesta.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function getAllRecipes(req, res, next){
    try {
        const items = await controlador.getAllRecipes()
        respuesta.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function getRecipes(req, res, next){
    try {
        const items = await controlador.getRecipes(req.body)
        respuesta.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function getRecipe(req, res, next){
    try {
        const item = await controlador.getRecipe(req.params)
        respuesta.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getRecipesByType(req, res, next){
    try {
        const items = await controlador.getRecipesByType(req.body)
        respuesta.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function getRecipesByName(req, res, next){
    try {
        const items = await controlador.getRecipesByName(req.body)
        respuesta.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function getRecipesByNameAndType(req, res, next){
    try {
        const items = await controlador.getRecipesByNameAndType(req.body)
        respuesta.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function deleteRecipe(req, res, next){
    try {
        const item = await controlador.deleteRecipe(req.params)
        respuesta.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function deleteFavorite(req, res, next){
    try {
        const item = await controlador.deleteFavorite(req.body)
        respuesta.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function updateRecipe(req, res, next){
    try {
        const item = await controlador.updateRecipe(req.params, req.body)
        respuesta.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

module.exports= router