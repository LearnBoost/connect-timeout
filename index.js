module.exports = function responseTimeout(options){
    options = options || {};
    options.time = options.time || 8000;
    options.code = options.code || 500;
    
    return function responseTimeout(req, res, next){
      var writeHead = res.writeHead,
          timer = setTimeout(function(){
              res.writeHead(options.code);
              res.end();
          }, options.time);
      
      req.clearTimeout = function(){
          clearTimeout(timer);
      };
      
      res.writeHead = function(code, headers){
          res.writeHead = writeHead;
          req.clearTimeout();
          res.writeHead(code, headers);
      };
      
      next();
    }
};