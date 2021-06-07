import {  Response } from "express";
import createError from "http-errors"

export const ErrorResponse = (res:Response,code:number,message:string) => {
  res.status(code).send(createError(code,message));
};