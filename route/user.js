const router = require('express').Router();
const userModel = require('../models/user');
// const mongoose = require('mongoose');
// const express = require('express');

router.get('/users', async (req, res) => {
    // res.send("users list page")
    let users = await userModel
        .find({ name: new RegExp(req.query.name, "i") })
        .select(req.query.all ? undefined : 'name')
        .sort(req.query.order_by === 'name' ? 'name' : undefined)
        .limit(req.query.limit);

    res.json(users)
})

router.get('/users/id/:id', async (req, res) => {
    let users = await userModel
        .find().where({ id: Number(req.params.id) });
    res.json(users)
})

router.get('/users/username/:username', async (req, res) => {
    let users = await userModel
        .find().where({ username: new RegExp(`^${req.params.username}`, 'i') });
    res.json(users)
})

module.exports = router