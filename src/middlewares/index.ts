import express from "express";
import { get, identity, merge } from "lodash";

import { getUsersSessionToken } from "models/user";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["san-auth"];

    if (!sessionToken) {
      return res.sendStatus(400);
    }

    const existingUser = await getUsersSessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
