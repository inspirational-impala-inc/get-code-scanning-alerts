import { Octokit } from "@octokit/rest";
import fs from 'fs';
import { Parser } from '@json2csv/plainjs';

const octokit = new Octokit({
  auth: 'your-pat'
});

const org = 'your-org'

const getCodeScanningAlerts = async (org) => {
  try {
    const repos = await octokit.paginate(octokit.repos.listForOrg, {
      org,
      type: 'all'
    });

    const alerts = [];
    for (const repo of repos) {
      const pulls = await octokit.paginate(octokit.pulls.list, {
        owner: org,
        repo: repo.name,
        state: 'open'
      });
			
      for (const pull of pulls) {
        const repoAlerts = await octokit.paginate(octokit.codeScanning.listAlertsForRepo, {
          owner: org,
          repo: repo.name,
          ref: `refs/pull/${pull.number}/merge`
        });
        alerts.push(...repoAlerts);
      }
    }

    return alerts;
  } catch (error) {
    console.error(`Error fetching code scanning alerts: ${error}`);
  }
};

const writeAlertsToCSV = (alerts) => {
  try {
    const parser = new Parser();
    const csv = parser.parse(alerts);
    fs.writeFileSync('alerts.csv', csv);
    console.log('Alerts written to alerts.csv');
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  const alerts = await getCodeScanningAlerts(org);
  writeAlertsToCSV(alerts);
};

main();