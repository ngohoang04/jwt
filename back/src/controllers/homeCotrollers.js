import express from 'express';
import db from '../models/index.js';
import CRUDService from '../services/CRUDService.js';
const getHomePage = async (req, res) => {
    let users = await CRUDService.getAllUsers();
    return res.render('home.ejs', { users });
}
const postRegister = async (req, res) => {

    await CRUDService.createNewUser(req.body);
    return res.redirect('/');

};

const getCRUD = async (req, res) => {
    return res.render('crud.ejs');
}

const getEditCRUD = async (req, res) => {
    let userId = req.params.id;
    let user = await CRUDService.getUserById(userId);
    return res.render('edit.ejs', { user });
}

const deleteCRUD = async (req, res) => {
    let userId = req.params.id;
    await CRUDService.deleteUser(userId);
    return res.redirect('/');
}

const postEditCRUD = async (req, res) => {
    console.log('📦 req.params:', req.params);
    console.log('📦 req.body:', req.body);
    let data = req.body;
    data.id = req.params.id; // ✅ gán id từ URL
    await CRUDService.updateUserData(data);
    return res.redirect('/');
};

export default {
    postRegister,
    getHomePage,
    getCRUD,
    getEditCRUD,
    deleteCRUD,
    postEditCRUD
};