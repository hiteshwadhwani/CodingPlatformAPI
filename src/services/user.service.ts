import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import prisma from "../libs/prisma";
import { generateToken } from "../utils/generateToken";
import { JsonWebTokenError } from "jsonwebtoken";
import { User } from "@prisma/client";
import { customRequest } from "../types";
import axios from "axios";
import { Submission, SubmissionData } from "../types";
import {
  createSubmission,
  getSubmission,
} from "../utils/submissionHelperFunctions";

const UserSignUpService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = await req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Some fields missing" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        role: "USER",
      },
    });

    return res.status(201).json({ newUser });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

const userLoginService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = await req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Some fields missing" });
    }
    const user: User = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({ msg: "No user found" });
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = generateToken(user as User);
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.status(200).json({ msg: "Logged In", token, email });
  } catch (error) {
    return res.json(500).json({ msg: "internal server error" });
  }
};

const userCheckAnswerService = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "Unauthorized" });
  }

  const { problemId, source, compilerId, compilerVersionId, tests } = req.body;

  if (!problemId || !source || !compilerId) {
    return res.status(400).json({ msg: "Some fields are missing" });
  }

  const data: SubmissionData = {
    problemId,
    source,
    compilerId,
    compilerVersionId,
    tests,
  };

  try {
    const { problemId, source, compilerId, compilerVersionId, tests } =
      req.body;

    if (!problemId || !source || !compilerId) {
      return res.status(400).json({ msg: "Some missing fields" });
    }
    const response = await axios.post(
      `https://${process.env.SPHERE_ENGINE_PROBLEMS_ENDPOINT}/api/v4/submissions?access_token=${process.env.SPHERE_ENGINE_PROBLEMS_TOKEN}`,
      data
    );

    if (response.status === 201) {
      return res
        .status(201)
        .json({ msg: "Submission Successful", data: response.data });
    }
  } catch (error) {
    return res
      .status(error.response.status)
      .json({ msg: error.response.statusText });
  }
};

export { userLoginService, UserSignUpService, userCheckAnswerService };
