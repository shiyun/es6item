'use strict';
const express = require('express');
const router = express.Router();
const checkLogin = require('../util/checkLogin');

router.get(/^(\/|\/index)$/, (req, res, next) => {
	let isLogin = req.session.isLogin || 0;
    res.render('index', {title: '首页', curNum: 0, isLogin});
});

module.exports = router;
