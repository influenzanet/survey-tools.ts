import { Survey, Expression, isExpression } from "survey-engine/data_types";
import { HtmlRenderer, HtmlRendererContext, BootstrapTheme, RulesHtmlRenderer, MappingSpec, SurveyMapping   } from "./renderer"
import { readFileSync, writeFileSync } from 'fs';
import arg from 'arg';

const args = arg({
    '--mapping': String,
});

const from = args['_'][0];

const data = readFileSync(from);

let mappingSpec: MappingSpec | undefined= undefined;

if('--mapping' in args) {
    const mappingFile = args['--mapping'];
    if(mappingFile) {
        const mappingData = readFileSync(mappingFile);
        mappingSpec = JSON.parse(mappingData.toString()) as MappingSpec;
    } else {
        console.error("mappingFile must be provided");
    }
 
}
    
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

const opts = {
    languages: ['fr']
}

const ctx = new HtmlRendererContext(opts, new BootstrapTheme());

//console.log(parsedData);

if(isSurvey(parsedData)) {
    
    if(mappingSpec) {
        const surveyKey = parsedData.surveyDefinition.key;
        const mapping = mappingSpec[surveyKey];
        if(mapping) {
            ctx.mapping = new SurveyMapping(mapping);
        }
    }
    
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