import { Router } from "express";
import { sendError } from '../util';


import Link from '../models/link';


export default function createLink(req, res, next) {

  if (!req.query.email) {
    return sendError(res, 400, 'No email specified');
  }

  const baseUrl = req.protocol + '://' + req.get('host');

  const link = new Link({
    email: req.query.email,
    baseUrl: baseUrl
  });

  link.save((err, doc, rowsAffected) => {
    const imageUrl = link.getUrl('/image/');
    res.status(200).send(imageUrl);
  });

}