const db = require("./db");
const slugify = require('slugify');
let base64 = require('base-64');
const { TelegramClient } = require('messaging-api-telegram');


let models = {

	getNewsBySlug: function (req, res, con) {
		const slug = req.params.slug;
		db.query(`SELECT * FROM news_prank WHERE SLUG = '${slug}'`, (err, result, fields) => {
			if (err) throw err;
			res.send(result);

		});
	},


	addLikeToPrank: function (req, res, con) {
		let query = `UPDATE news_prank AS a,(SELECT likes FROM news_prank WHERE id=${req.body.id}) AS b SET a.likes = b.likes+1 WHERE a.id=${req.body.id}`;
		db.query(query, (err, result, fields) => {
			if (err) {
				res.status(500);
				res.send();
			} else {
				res.status(204);
				res.send();
			}

		});
	},

	addDisLikeToPrank: function (req, res, con) {
		let query = `UPDATE news_prank AS a,(SELECT dislikes FROM news_prank WHERE id=${req.body.id}) AS b SET a.dislikes = b.dislikes+1 WHERE a.id=${req.body.id}`;
		db.query(query, (err, result, fields) => {
			if (err) {
				res.status(500);
				res.send();
			} else {
				res.status(204);
				res.send();
			}

		});
	},

	hidePrank: function (req, res, con) {
		const id = req.params.id;
		db.query(`UPDATE news_prank set status = 0 where id=${id};`, (err, result, fields) => {
			if (err) throw err;
			res.status(200);
			res.send("blocked");

		});
	},

	createPrank: function (req, res, app) {
		let slug = req.body.headline;

		db.query(`SELECT max(id) from news_prank`, (err, last_id_result, fields) => {
			if (err) throw err;
			slug = slug.split(' ').slice(0, 8).join(' ');
			let next_id = last_id_result[0]["max(id)"];
			let random = Math.random();
			slug = `${slug} article ${base64.encode(random)} ${next_id + 1}`

			slug = slugify(slug, {
				replacement: '-',  // replace spaces with replacement character, defaults to `-`
				remove: undefined, // remove characters that match regex, defaults to `undefined`
				lower: false,      // convert to lower case, defaults to `false`
				strict: true,     // strip special characters except replacement, defaults to `false`
			})

			let insert_query = `INSERT INTO news_prank (headline,short_description,image_url,slug) VALUES("${req.body.headline}","${req.body.short_description}","${req.body.image_url}","${slug}")`

			db.query(insert_query, (createError, result, insert_fields) => {
				
				if (createError) throw createError;
				res.status(200);
				res.send({ slug,id: result.insertId});
			});


		});

	},

};

module.exports = models;
