import { Survey } from "survey-engine/data_types";
import { HtmlRenderer, HtmlRendererContext, BootstrapTheme   } from "./renderer"
import { readFileSync, writeFileSync } from 'fs';

const from = process.argv[2];
const data = readFileSync(from);
const ctx = new HtmlRendererContext(['fr'], new BootstrapTheme());
const survey = JSON.parse(data.toString()) as Survey;


const renderer = new HtmlRenderer();

writeFileSync(from+ '.html', renderer.render(survey, ctx));

