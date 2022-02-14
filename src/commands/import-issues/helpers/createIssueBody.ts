import { CsvItem } from "./CSVItem";

export function CreateIssueBody(resultItem: CsvItem, title: string) {
    console.log("creating issue body for " + title);
    let bodyString: string = "";
    bodyString = "<h1>" + title +"</h1>"
        + " <h2> "+ " Location :" +"</h2>"
        + resultItem.Location
        + "<br />"
        + "<h2>" +"Old Text :" + "</h2>"
        + resultItem.OldText
        + "<br />"
        + "<h2>" +"New Text English Version: " + "</h2>"
        + resultItem.NewTextEN
        +"<h2>" +"New Text Spanish Version: "+"</h2>"
        + resultItem.NewTextSP
        + "<br />"
        + "<h2>" +"New Text French Version" +"</h2>"
        + resultItem.NewTextFR;
    return bodyString;
}