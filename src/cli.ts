import { Survey, Expression, isExpression } from "survey-engine/data_types";
import { HtmlRenderer, HtmlRendererContext, BootstrapTheme, RulesHtmlRenderer   } from "./renderer"
import { readFileSync, writeFileSync } from 'fs';

const from = process.argv[2];
const data = readFileSync(from);

const opts = {
    languages: ['fr']
}

const ctx = new HtmlRendererContext(opts, new BootstrapTheme());

const isSurvey = (data: object): data is Survey =>{
    return 'surveyDefinition' in data;
}

const isRules = (data: any): data is Expression[] => {
    if(Array.isArray(data)) {
        data.every(v => isExpression(v));
        return true;
    }
    return false;
}

const parsedData = JSON.parse(data.toString());

let dataType = undefined;


console.log(parsedData);

if(isSurvey(parsedData)) {
    const renderer = new HtmlRenderer();
    dataType = 'survey';
    writeFileSync(from+ '.html', renderer.render(parsedData, ctx));
} 

if(isRules(parsedData)) {
    const renderer = new RulesHtmlRenderer();
    dataType = 'rules';
    writeFileSync(from+ '.html', renderer.render(parsedData, ctx, 'Study Rules'));
    console.log('Rules created');
}

if(typeof(dataType) == "undefined" ) {
    console.warn("Unable to find a data type ");
}