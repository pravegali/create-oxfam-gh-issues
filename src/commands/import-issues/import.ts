import { Command } from "@oclif/core";
import { Octokit, App } from "octokit";
import { parse } from "csv";
import { readFileSync } from "fs";
import { CsvItem } from "./helpers/CSVItem";
import { CreateIssueBody } from "./helpers/createIssueBody";

const path = require("path");
const octokit = new Octokit({ auth: `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` });



export class ImportIssues extends Command {
    static description = 'Imports issues to github from csv file'

    static examples = [
        `$ import-issues pathToFile.csv
hello world! (./src/commands/hello/world.ts)
`,
    ]

    static flags = {}

    static args = []

    async run(): Promise<void> {
        // Get the list of issues from the csv
        const csvFilePath = path.resolve(__dirname, 'files/issues100-120.csv');

        const headers = [
            'ReferenceID',
            'TypeofChange',
            'Location',
            'OldText',
            'NewTextEN',
            'NewTextFR',
            'NewTextSP',
            'Language',
            'Change to Structure',
            'Text Change',
            'Owner',
            'LocationofJSON',
            'Priority',
            'Complete'
        ];

        const fileContent = readFileSync(csvFilePath, { encoding: 'utf-8' });

        parse(fileContent, {
            delimiter: ',',
            columns: headers,
        }, (error, result: CsvItem[]) => {
            if (error) {
                console.error(error);
            }
            result.slice(1).map(this.createGitHubIssue);
        });
    }

    private async createGitHubIssue(resultItem: CsvItem) {
        console.log("-- Creating GitHub Issue --");
        console.log(resultItem);
        var title = resultItem.ReferenceID + "-" + resultItem.Location + "-" + resultItem.TypeofChange;
        console.log("-- creating " + title);

        let issueResponse = await octokit.rest.issues.create({
            owner: "oxfamamerica",
            repo: "HRIA",
            title: title,
            body: CreateIssueBody(resultItem, title),
            milestone: 3,
            labels: ["help wanted", "enhancement"]
        });

        console.log(issueResponse.data.title + "created");
    }
}