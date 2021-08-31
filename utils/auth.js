module.exports = {
  checkAuthenticated: (req,res,next) => {

      // check if session exists then set local vars for HandleBars
      if (req.session && req.session.user_id && req.session.logged_in){
          res.locals.isLoggedIn = true;
          res.locals.session = res.session;
      } else {
          res.isLoggedIn = false;
      }

      next();
      return;

  },
  withAuth: (req, res, next) => {
    if (!req.session.logged_in) {
      const uriReferrer = `?return_location=${encodeURIComponent(req.url)}`;
      res.redirect(`/login${uriReferrer}`);
    } else {
      next();
    }
  },
};