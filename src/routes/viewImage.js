import { Router } from "express";
import { sendError } from '../util';
import path from 'path';
import Link from '../models/link';
import Visit from '../models/visit';

export default function viewImage(req, res, next) {

  // const linkUrlId = 
  
  res.sendFile('lambda.png', {
    root: path.join(__dirname + '/../img/'),
    headers: {
      'Content-Type': 'image/png'
    }
  })

  const ip = req.ip;
  const linkUrlId = parseInt(req.params.id);

  Link.findOneAndUpdate({ urlId: linkUrlId }, { $inc: { visits: 1 }}, (err, link) => {
    if (err) { return; }

    const visit = new Visit({
      link: link._id,
      ip: ip
    });

    visit.save((err, doc) => {
      // console.log('saved visit');
    })
  })
} 