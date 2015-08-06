var models = require('../models/models.js');
var scripts = require('../public/javascripts/scripts.js'); //importamos fichero con scripts adicionales

//Autoload - factoriza el código si la ruta incluye :id
exports.load = function(req, res, next, quizId) {
	models.Quiz.findById(quizId).then(function(quiz) {
		if(quiz){
			req.quiz = quiz;
			next();
		}
		else {
			next(new Error('No existe quizId=' + quizId));
		}
	}).catch(function(error){ next(error); });
};


//GET /quizes
exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', {quizes: quizes, errors: []});
	});
};

//GET /quizes/:quizId
exports.show = function(req, res){
		res.render('quizes/show', { quiz: req.quiz, errors: [] });
};

//GET quizes/:id/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
		if(req.query.respuesta === req.quiz.respuesta) {
			resultado = 'Correcto';
		}
		res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};

//GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build({pregunta: "Pregunta", respuesta: "Respuesta"}); //crea objeto quiz
	var selec = scripts.cat_select(null);

	res.render('quizes/new', {quiz: quiz, errors: [], selec: selec}); //enviamos el objeto 'selec' vacío ya que se utilizará en el formulario de creación
};

//POST /quizes/create
exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);

	quiz.validate().then(function(err){
		if(err) {
			res.render('quizes/new', {quiz: quiz, errors: err.errors, selec: {}});
		}
		else {
			//guarda en BD los campos pregunta, respuesta y categoría de quiz
			quiz.save({fields: ["pregunta", "respuesta", "categoria"]}).then(function(){
				res.redirect('/quizes');
			});	 //Redirección HTTP (URL relativo) lista de preguntas
		}
	});
};

//GET /quizes/:id/edit
exports.edit = function(req, res){
	var quiz = req.quiz; // autoload de instancia de quiz
	var selec = scripts.cat_select(quiz.categoria);

	res.render('quizes/edit', {quiz: quiz, errors: [], selec: selec}); //enviamos el objeto 'selec' para que aparezca la categoría en el cuadro de selección del formulario
};

//PUT /quizes/:id
exports.update = function(req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.categoria = req.body.quiz.categoria;

	var selec = scripts.cat_select(req.quiz.categoria);

	req.quiz.validate().then(function(err){
		if(err) {
			res.render('quizes/edit', {quiz: req.quiz, errors: err.errors, selec: selec}); //enviamos el objeto 'selec' para que aparezca la categoría en el cuadro de selección del formulario
		}
		else {
			req.quiz
			.save( {fields: ["pregunta", "respuesta", "categoria"]} )
			.then( function(){res.redirect('/quizes');} );
		}
	});
};

// DELETE /quizes/:id
exports.destroy = function(req, res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){ next(error) });
};

exports.author = function(req, res){
	res.render('quizes/author', {autor: 'Joaquin', errors: []});
};
