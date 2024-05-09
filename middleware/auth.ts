
import { testJwt } from "../../../backendTest/middleware/auth";
import Customer from "../../../backendTest/models/Customer";

import jwt from 'jsonwebtoken';
import User from '../models/User';
import { NextFunction } from 'express'
import express from "express";


export async function protect(req: express.Request, res: express.Response, next: NextFunction) {
  let token: string | null | undefined;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }


  if (!token) {

    return res.status(401).json({ success: false, massage: 'Not authorize to access this route' });
  }

  try {
    console.log(token)

    const decoded = jwt.verify(token.toString(), testJwt)

    const { id } = decoded as any


    const user = await User.findById(id)
    if (!user) {
      return res.status(401).json({ sucess: false, massage: 'Not authorize to access this route' });
    }

    next();
  } catch (err: any) {
    console.log(err.stack);

    return res.status(401).json({ sucess: false, massage: 'Not authorize to access this route' });

  }



}

export function authorize(...roles: String[]) {
  return async (req: express.Request, res: express.Response, next: NextFunction) => {
    let token: String | null | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {

      return res.status(401).json({ success: false, massage: 'Not authorize to access this route' });
    }
    const decoded = jwt.verify(token.toString(), testJwt)
    const { id } = decoded as any


    const user = await Customer.findById(id)
    if (!user) {
      return res.status(401).json({ success: false, massage: 'Not authorize to access this route' });
    }





    if (!roles.includes(user.role)) {
      return res.status(403).json({ success: false, msg: `User role ${user.role} is not authorized to access` })
    }
    next();
  }
}
export async function getUser(req: express.Request) {
  let token: String | null | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }
  if (!token) {

    return null
  }
  const decoded = jwt.verify(token.toString(), testJwt)
  //const decoded= await Customer.findOne({})
  const { id } = decoded as any

  const user = await User.findById(id)
  return user


}

export async function modePee(req: express.Request, res: express.Response, next: NextFunction) {
  const user = await getUser(req)

  if (user?.mode != 'pee') {
    return res.status(403).json({ success: false, message: `User role ${user?.mode} is not authorize to access this route` });
  }
  next();


}



export async function admin(req: express.Request, res: express.Response, next: NextFunction) {
  const user = await getUser(req)

  if (user?.role != 'admin') {
    return res.status(403).json({ success: false, message: `User role ${user?.role} is not authorize to access this route` });
  }
  next();


}


export async function pee(req: express.Request, res: express.Response, next: NextFunction) {
  const user = await getUser(req)
  if (!user) {
    return
  }
  if (!['pee', 'peto', 'admin'].includes(user.role)) {
    return res.status(403).json({ success: false, message: `User role ${user.role} is not authorize to access this route` });
  }
  next();


}
export async function authCamp(req: express.Request, res: express.Response, next: NextFunction) {
  const user = await getUser(req)

  if (!user?.authorizeIds.includes(req.body.campId) && user?.role != 'admin') {
    return res.status(403).json({ success: false, message: `User role ${user?.role} is not authorize to access this route` });
  }
  next();


}
export async function peto(req: express.Request, res: express.Response, next: NextFunction) {
  const user = await getUser(req)

  if (!['peto', 'admin'].includes(user?.role as string)) {
    return res.status(403).json({ success: false, message: `User role ${user?.role} is not authorize to access this route` });
  }
  next();


}



