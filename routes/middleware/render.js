'use strict';

module.exports = (req, res, next) => {
	let _render = res.render;
	res.render = (template, data)=>{
		if(!data) data = {};
		if(req.session.orgInfo){
			data.orgInfo = req.session.orgInfo;
		}
		return _render.apply(res, [template, data])
	}
	next();
};