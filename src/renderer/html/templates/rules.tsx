
import { Expression, ExpressionArg } from 'survey-engine/data_types';
import { RendererContext } from '../../context';
import { Fragment, h } from "static-jsx";
import { Translate } from './translate';
import { RawHtml } from "static-jsx";
import { format, fromUnixTime } from 'date-fns';
import { HtmlRendererContext } from '../renderer';
import { ExpressionView } from './expression';

interface RulesPageProps {
    rules: Expression[] 
    title: string
    context:HtmlRendererContext
}

export const RulesPage = (props: RulesPageProps) => (
  <>
    {new RawHtml("<!DOCTYPE html>")}
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Study Rules </title>
        <title>{props.title}</title>
        {props.context.theme.head()}
      </head>
      <body>
        {props.rules.map(rule => <RulePanel rule={rule} context={props.context}/>)}
      </body>
    </html>
  </>
);

interface RulePanelProps {
    rule: Expression
    context:HtmlRendererContext
}

export const RulePanel = (props: RulePanelProps) => (
    <div class="study-rule">
        <ExpressionView exp={props.rule} context={props.context}/>
    </div>
);
