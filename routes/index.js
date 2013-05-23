
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'JavaScript Neural Net Toy - Recognises numbers 1 to 3' });
};