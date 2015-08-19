var models = require('../models/models.js');

// GET /quizes/:quizId/comments/new
exports.new = function(req, res){
  res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
};

// POST /quizes/:quizId/comments
exports.create = function(req, res){
  var comment = models.Comment.build({
    texto: req.body.comment.texto,
    QuizId: req.params.quizId
    });

  comment.validate().then(function(err){
    if(err){
      res.render('comments/new.js', {comment: comment, errors: err.errors});
    }
    else{
      comment.save().then(function(){   // save() guarda en BD el campo texto de comment
        res.redirect('/quizes/'+req.params.quizId);  // res.redirect() redirección HTTP a la pregunta
      });
    }
  }).catch(function(error){next(error)});
};
