import axios from "axios";

import {SubmissionData, Submission} from '../types'

export async function createSubmission(data : SubmissionData): Promise<Submission> {
  try {
    const response = await axios.post("/submissions", data);
    const submissionId = response.data.id;
    return { id: submissionId, executing: true, data: null };
  } catch (error) {
    throw new Error("Failed to create submission");
  }
}

export async function getSubmission(submissionId: string): Promise<Submission> {
  try {
    const response = await axios.get(`/submissions/${submissionId}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error("Failed to retrieve submission");
  }
}

export async function presentSubmissionStatus(
  submission: Submission
): Promise<void> {
  console.log(`Submission ID: ${submission.id}`);
  console.log(
    `Execution Status: ${submission.executing ? "Executing" : "Completed"}`
  );
}

export async function presentSubmissionData(
  submission: Submission
): Promise<void> {
  console.log(`Submission Data: ${submission.data}`);
}
