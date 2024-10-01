import { Octokit } from "@octokit/rest";
import 'dotenv/config';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = 'mburghard';
const repo = 'automationtest';

async function triggerWorkflowDispatch(workflowId: string, ref: string) {
  try {
    await octokit.actions.createWorkflowDispatch({
      owner,
      repo,
      workflow_id: workflowId,
      ref,
      inputs: {},
    });

    console.log(`Successfully triggered workflow: ${workflowId}`);
  } catch (error) {
    // Cast the error to type Error and access its message
    const err = error as Error;
    console.error(`Error triggering workflow: ${err.message}`);
  }
}

triggerWorkflowDispatch('ci-cd.yml', 'main');
