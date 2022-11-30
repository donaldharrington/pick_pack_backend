import express from "express";

import auth from "./auth/index.js";
import shopify from "./shopify/index.js";

const router = express.Router();

router.use('/auth', auth);
router.use('/shopify', /* validateToken(), */ shopify);

router.use((error, req, res, next) => {

	if (error.error && error.error.details.length > 0) {

		const message = error.error.details[0].message
		return res.status(400).json({ 
			message: message 
		});

	} else {

		if (error.statusCode) {
			return res.status(error.statusCode).send(error.message);

		} else if (error.code) {
			return res.status(error.code).send(error.message);

		} else {
			return res.status(500).json(error.message || "Server Internal Error");
		}
	}
});

export default router;