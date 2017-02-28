'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const request = require('request');
const http = require('http');
const path = require('path');
const formidable = require('formidable');
const _ = require('lodash');
const apiUtil = require('../util/apiUtil');
const jsonFormat = require('../util/jsonFormat');
const upload = require('../util/upload');

router.post('/login', (req, res, next) => {
	req.method = 'POST';
	req.url = '/API_URL/login';
	apiUtil.api(req, res, (err, resp, body)=>{
		if(err){
			res.send(jsonFormat.fail('登录失败'));
		}else{
			if(body.result.code == '0'){
				req.session.orgInfo = body.content;
				req.session.orgInfo.organizeId = req.body.organizeId;
				req.session.isLogin = 1;
				res.send(jsonFormat.success('登录成功'));
			}else{
				res.send(jsonFormat.fail('登录失败'));
			}
		}
	});
});

router.post('/logout', (req, res, next)=>{
	delete req.session.isLogin;
	delete req.session.orgInfo;
	res.send(jsonFormat.success('退出成功'));
});

router.post('/verifyPDF', (req, res, next)=>{
	//console.log(path.join(__dirname, '../public/tmp/test13.pdf'));
	let form = new formidable.IncomingForm();
	form.uploadDir = './public/tmp';
	form.keepExtensions = true;
    form.maxFieldsSize = 200 * 1024 * 1024;
	form.parse(req, (err, fields, files)=>{
		if(err) throw err;
		try{
			fs.renameSync(files.file.path, path.join(__dirname, '../public/tmp/'+files.file.name));
			let filePath = path.join(__dirname, '../public/tmp/'+files.file.name);
			let fileList = [
				{urlKey: "file", urlValue: filePath} 
			];
			const url = global.CONFIG.API_URL.split('//')[1].split('/');
			/*
			const options = { 
				host: url[0].split(':')[0], 
				port: url[0].split(':')[1], 
				method: "POST", 
				path: '/' + url[1] + "/verifyPDF"			
			}*/
			
			const options = { 
				host: url[0], 
				//port: "8081" , 
				method: "POST", 
				path: '/' + url[1] + "/verifyPDF"
			}	
			

			let reqs = http.request(options, function(ress){
				/*console.log("RES:" + ress);
				console.log('STATUS: ' + ress.statusCode);
				console.log('HEADERS: ' + JSON.stringify(ress.headers));
				//res.setEncoding("utf8");*/
				ress.setEncoding('utf8');
				let body = '';
				ress.on("data", function(chunk){
					body += chunk;
				});

				ress.on("end", function(){
					console.log(body.toString());
					res.send(body.toString());
					try{
						fs.unlink(filePath);
					}catch(e){
						console.log(e);
					};
				});
			});

			reqs.on('error', function(e){
				console.log('problem with request:' + e.message);
				console.log(e);
			});
			
			upload.postFile(fileList, reqs);
		}catch(e){
			res.send(jsonFormat.fail('上传失败'));
		}
	});		
});

router.post('/applyForTestify', (req, res, next)=>{
	//console.log(path.join(__dirname, '../public/tmp/test13.pdf'));
	let form = new formidable.IncomingForm();
	form.uploadDir = './public/tmp';
	form.keepExtensions = true;
    form.maxFieldsSize = 200 * 1024 * 1024;
	form.parse(req, (err, fields, files)=>{
		if(err) throw err;
		fs.renameSync(files.file.path, path.join(__dirname, '../public/tmp/'+files.file.name));
		let filePath = path.join(__dirname, '../public/tmp/'+files.file.name);
		let fileList = [
			{urlKey: "file", urlValue: filePath}
		];
		const url = global.CONFIG.API_URL.split('//')[1].split('/');
		const options = { 
			host: url[0], //url[0].split(':')[0], 
			// port: url[0].split(':')[1], 
			method: "POST", 
			path: '/' + url[1] + "/applyForTestify"
		}
		/*
		const options = { 
			host: url[0].split(':')[0], 
			port: url[0].split(':')[1], 
			method: "POST", 
			path: '/' + url[1] + "/applyForTestify"			
		}*/
		
		let reqs = http.request(options, function(ress){
			ress.setEncoding('utf8');
			let body = '';
			ress.on("data", function(chunk){
				console.log(chunk);
				body += chunk;
			});

			ress.on("end", function(){
				try{
					res.send(body.toString());
					fs.unlink(filePath);
				}catch(e){
					console.log(e);
					res.send(jsonFormat.fail('文件太大，验证失败'))
				};
			});
		})

		reqs.on('error', function(e){
			console.log('problem with request:' + e.message);
			console.log(e);
		});

		let data = {dna: fields.dna, token: req.session.orgInfo.token, organizeId: req.session.orgInfo.organizeId, uniqueCode: fields.uniqueCode};
		upload.postFile(fileList, reqs, data);
	});		
});

module.exports = router;
