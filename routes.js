const models = require("./models");

let routes = {
	start: function (app, con) {

		app.get("/v1/news/:slug", (req, res) => models.getNewsBySlug(req, res));
		app.post("/v1/news/add-like", (req, res) => models.addLikeToPrank(req, res));
		app.post("/v1/news/add-dislike", (req, res) => models.addDisLikeToPrank(req, res));
		app.get("/v1/news/hide/:id", (req, res) => models.hidePrank(req, res));
		app.post("/v1/news", (req, res) => models.createPrank(req, res,app));

		app.get("/v1/account/users", (req, res) => models.getAllUsers(req, res));
		app.get("/v1/requests", (req, res) => models.getAllRequests(req, res));
		app.post("/v1/request", (req, res) => models.createRequest(req, res));
		app.post("/v1/account/user", (req, res) => models.createUser(req, res));
		app.get("/v1/request/:id", (req, res) => models.getRequestById(req, res));
		app.get("/v1/account/user/:id", (req, res) => models.getUserById(req, res));
	},
};

module.exports = routes;
