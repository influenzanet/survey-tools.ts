import { Expression, Survey, SurveyContextDef } from 'survey-engine/data_types';
import { RendererContext } from '../../context';
import { Fragment, h } from "static-jsx";
import { Translate } from './translate';
import { RawHtml } from "static-jsx";
import { ItemComponentView } from './components';
import { SurveyItemView } from './item';
import { format, fromUnixTime } from 'date-fns';
import { ExpressionArgView, ExpressionView } from './expression';
import { HtmlRendererContext } from '../renderer';
import { MetadataView } from './metadata';

interface SurveyProps {
    survey: Survey
    context:RendererContext
}

export const SurveyPanel = (props:SurveyProps)=>{
    const ctx = props.context;
    const definition = props.survey.surveyDefinition;
    const survey = props.survey;

    const renderTimestamp = (time: number)=> {
      const d = fromUnixTime(time);
      return format(d, 'yyyy-mm-dd');
    }

    const renderPrefillRules = (rules: Expression[]) =>
    <Fragment>
      <h3>Prefill Rules</h3>
      <ul class={ctx.style('prefill-rules')}>
      {rules.map(r => <li class={ctx.style('prefill-rules-item')}><ExpressionView exp={r} context={ctx}/></li>)}
      </ul>
    </Fragment>
  
    const renderContextRules = (def: SurveyContextDef)=> {
      return (<div>
      <h3>Context Rules</h3>
      {def.mode ? <p>Mode : <ExpressionArgView arg={def.mode} context={ctx}/></p> : ''}
      {def.previousResponses ? (
        <div>
          <h4>Previous Responses</h4>
          <ul class={ctx.style('previous-rules')}>
          { def.previousResponses.map(e => <li class={ctx.style('previous-rule-item')}><ExpressionView exp={e} context={ctx} /></li>)}
          </ul>
        </div>
      ) : ''}
      </div>);
    }

    return <div class={ctx.style("survey")}>
        <h1>Survey <em>{definition.key}</em> (<span class={ ctx.style('item-version') }>{survey.versionId}</span>)</h1>
        {survey.metadata ? <MetadataView meta={survey.metadata} context={ctx}/> : ''}
        <dl class={ctx.style("survey-props")}>
          <dt class="col-3">name</dt> 
          <dd class="col-9"><Translate texts={survey.props?.name} context={ctx}/></dd>
          <dt class="col-3">description</dt>
          <dd class="col-9"><Translate texts={survey.props?.description} context={ctx}/></dd>
          {survey.props?.typicalDuration?
                (<Fragment>
                  <dt class="col-3">typicalDuration</dt>
                  <dd class="col-9"><Translate texts={survey.props?.typicalDuration} context={ctx}/></dd>
                  </Fragment>
                  ) : ''
          }
        </dl>

        <div class={ctx.style("survey-definition")}>
          <h2>Survey Definition</h2>
          {survey.published ? <span>Published on {renderTimestamp(survey.published)}</span> : ''}
           {survey.unpublished ? <span>Published on {renderTimestamp(survey.unpublished)}</span> : ''}
           <SurveyItemView item={definition} context={ctx}/>
        </div>
        { survey.prefillRules ? renderPrefillRules(survey.prefillRules) : ''}
        { survey.contextRules ? renderContextRules(survey.contextRules) : ''}
        {survey.maxItemsPerPage ?
          <p>Max items per page for large {survey.maxItemsPerPage.large}, for small : {survey.maxItemsPerPage.small}</p>
          : ''
        }
        {survey.availableFor ? <p>Available for {survey.availableFor} </p> : ''}
        {survey.requireLoginBeforeSubmission ? <p>Required login for submission</p> : ''}
      <div class={ctx.style("legend")}>
        <h2>Legend</h2>
        <ul>
          <li><span class={ ctx.style('key') }>{ctx.icon('key')} key</span> : Component key</li>
          <li><span class={ ctx.style('role') }>{ctx.icon('role')} role</span> : Component role</li>
          <li><span class={ctx.style('variable-label')}>{ctx.icon('variable-label')}</span> : Encoding label, response value are stored as code, and are recoded with explicit label in the analysis</li>
          <li><span class={ctx.style('variable-name')}>{ctx.icon('variable-name')}</span> : Name of the variable used in the analysis for the response</li>
          <li><span class={ctx.style('variable-database')}>{ctx.icon('variable-database')}</span> : Name of the column in the database used to store this reponse value</li>
        </ul>
      </div>
      </div>
}

interface PageProps {
    survey: Survey
    context:HtmlRendererContext
}

export const SurveyPage = (props: PageProps) => (
  <>
    {new RawHtml("<!DOCTYPE html>")}
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Survey </title>
        <title>Survey {props.survey.surveyDefinition.key}</title>
        {props.context.theme.head()}
      </head>
      <body>
        <SurveyPanel survey={props.survey} context={props.context}/>
      </body>
    </html>
  </>
);
