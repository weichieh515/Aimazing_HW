const express = require('express'),
    router = express.Router();

const User = require('../model/user');

router.get('/', (req, res) => {
    User.find((err, result) => { resultHandle(err, result, res) })
});

router.get('/:id', (req, res) => {
    User.findOne({
        _id: req.params.id
    }, (err, result) => { resultHandle(err, result, res) })
});

router.post('/', (req, res) => {
    User.create(req.body, (err, result) => { resultHandle(err, result, res) })
})

router.put('/:id', (req, res) => {
    User.findOneAndUpdate({
        _id: req.params.id
    }, req.body, (err, result) => { resultHandle(err, result, res) })
})

router.delete('/:id', (req, res) => {
    User.findOneAndRemove({
        _id: req.params.id
    }, (err, result) => { resultHandle(err, result, res) })
})

function resultHandle(err, result, res) {
    if (err) return res.send(err);
    res.json(result);
}


module.exports = router;