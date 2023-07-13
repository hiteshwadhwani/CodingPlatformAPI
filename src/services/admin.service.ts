import { Request, Response, NextFunction, response } from "express";
import bcrypt, { compareSync } from "bcrypt";
import prisma from "../libs/prisma";
import { generateToken } from "../utils/generateToken";
import { JsonWebTokenError } from "jsonwebtoken";
import { User } from "@prisma/client";
import { customRequest } from "../types";
import axios from "axios";

const adminLoginService = async (
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
const adminSignUpService = async (
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
        role: "ADMIN",
      },
    });

    return res.status(201).json({ newUser });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

const addQuestionService = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = req.user;

    if (!admin) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const { name, body, typeId, masterjudgeId, interactive } = req.body;

    if (!name || !masterjudgeId) {
      return res.status(400).json({ msg: "Some fields missing" });
    }

    const problemData = {
      name,
      body,
      typeId,
      masterjudgeId,
      interactive,
    };

    try {
      const response = await axios.post(
        `https://${process.env.SPHERE_ENGINE_PROBLEMS_ENDPOINT}/api/v4/problems?access_token=${process.env.SPHERE_ENGINE_PROBLEMS_TOKEN}`,
        problemData
      );

      if (response.status === 201) {
        // TODO : Save question data in DB

        await prisma.problem.create({
          data: {
            problem_id: response.data.id,
            code: response.data.code,
            name,
            body,
            masterjudgeId,
            interactive,
            typeId,
          },
        });

        return res.status(201).json({ msg: "Successful", data: response.data });
      }
    } catch (error) {
      return res
        .status(error.response.status)
        .json({ msg: error.response.statusText });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server Error" });
  }
};
const updateQuestionService = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = req.user;

    if (!admin) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const id = parseInt(req.params["id"]);

    const { name, body, typeId, masterjudgeId, interactive, activeTestcases } =
      req.body;

    if (!id) {
      return res.status(400).json({ msg: "Id field is missing" });
    }

    const problemData = {
      name,
      body,
      typeId,
      masterjudgeId,
      interactive,
      activeTestcases,
    };

    try {
      const response = await axios.put(
        `https://${
          process.env.SPHERE_ENGINE_PROBLEMS_ENDPOINT
        }/api/v4/problems/${id as number}?access_token=${
          process.env.SPHERE_ENGINE_PROBLEMS_TOKEN
        }`,
        problemData
      );

      if (response.status === 200) {
        // TODO : Update question in DB

        await prisma.problem.update({
          where: {
            problem_id:id
          },
          data: {
            name, body, typeId, masterjudgeId, interactive
          }
        })
        return res.status(200).json({ msg: "Problem updated" });
      }
    } catch (error) {
      return res
        .status(error.response.status)
        .json({ msg: error.response.statusText });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};
const deleteQuestionService = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = req.user;

    if (!admin) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const id = parseInt(req.params["id"]);

    if (!id) {
      return res.status(400).json({ msg: "Id field is missing" });
    }

    try {
      const response = await axios.delete(
        `https://${
          process.env.SPHERE_ENGINE_PROBLEMS_ENDPOINT
        }/api/v4/problems/${id as number}?access_token=${
          process.env.SPHERE_ENGINE_PROBLEMS_TOKEN
        }`
      );

      if (response.status === 200) {
        // TODO : DELETE question from DB
        await prisma.problem.delete({
          where:{
            problem_id: id
          }
        })

        return res.status(200).json({ msg: "Problem deleted" });
      }
    } catch (error) {
      return res
        .status(error.response.status)
        .json({ msg: error.response.statusText });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal sever error" });
  }
};

const addTestCaseService = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = req.user;
    if (!admin) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const id = parseInt(req.params["id"]);
    const { input, output, timeLimit, judgeId, active } = req.body;
    if (!id || !judgeId) {
      return res.status(400).json({ msg: "Some fiels are missing" });
    }

    const data = {
      input,
      output,
      timeLimit,
      judgeId,
      active,
    };

    try {
      const response = await axios.post(
        `https://${
          process.env.SPHERE_ENGINE_PROBLEMS_ENDPOINT
        }/api/v4/problems/${id as number}/testcases?access_token=${
          process.env.SPHERE_ENGINE_PROBLEMS_TOKEN
        }`,
        data
      );

      if (response.status === 201) {
        return res
          .status(201)
          .json({ msg: "Test case added", data: response.data });
      }
    } catch (error) {
      return res
        .status(error.response.status)
        .json({ msg: error.response.statusText });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export {
  adminLoginService,
  adminSignUpService,
  addQuestionService,
  updateQuestionService,
  deleteQuestionService,
  addTestCaseService,
};
