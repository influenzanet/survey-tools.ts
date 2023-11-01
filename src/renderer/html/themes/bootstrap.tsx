
import { HtmlRendererTheme } from '../theme';
import { Fragment, h } from "static-jsx";

const styles:Record<string, string> = {
    // Generic
    'key': 'key',
    'translate-list': 'list-unstyled mb-0',
    'trans-code': 'badge bg-light text-primary my-1',
    'condition': 'condition',
    
    // Expressions
    "expr":"expr",
    "expr-name":"expr-name",
    "expr-param":"expr-param",

    // Survey
    'prefill-rules': "list-group",
    'prefill-rules-item':'list-group-item prefill-rule',
    'previous-rules': 'list-group',
    'previous-rule-item':"list-group-item prefill-rule",
    "survey": "survey container-fluid",
    "survey-definition": "survey-definition",
    "survey-props": "survey-props row",
    
    // SurveyItem
    'survey-item':'survey-item',
    'validation-type': "badge bg-danger", // SingleItem validation type
    'item-version': 'badge bg-success',
    
    // Survey Item Component
    'components': 'survey-component',
    'components-children': '',
    'component-content':'component-content',
    'component-properties': 'row',
    'component-properties-dt':'col text-align-right',
    'component-properties-dd':'col',
    'role': 'badge bg-warning',
    'group-items':'group-items',
    "selection-method":"selection-method",
    'item-type': 'item-type', // Type of item
    'style': 'style ms-1',
    'style-dt': '',
    'style-dd': '',
}

const css = `
.survey {
    margin: .4rem;
}

.survey-props {
    margin: .2rem 2rem;
}

.translate-list {
    border-left: 2px solid lightgray;
}

.survey-item {
    margin: .4rem;
    padding: .5rem;
    border-left: 2px solid var(--bs-info);
    border-top: 1px dashed var(--bs-info);
}

.survey-item dl, ul {
    margin-bottom: .1rem;
}

.survey-item dd, li {
    margin-bottom: .1rem;
}

/**
Dont visual guides for first level item
*/
.survey-definition > .survey-item {
   margin:0;
   border: 0; 
}

.item-components {
  margin-left: .3em;
}

.trans-code {
    margin-right: .3em;
}

.survey-component {
 margin: .1rem .3rem;
 border-left: 2px solid var(--bs-warning);
 padding: .1rem .3rem;
}

.component-base {
 padding: .1rem;
}

.component-content {
    display: inline-block;
}

var {
    vertical-align: top;
    margin: 0 .2em;
    display: inline-block;
    color: darkred;
}

.style {
    display: inline-block;
    font-style: italic ;
    margin: 0;
}

.style * {
    display:inline-block;
}
.style dt {
    margin-right: .3em;
}
.style dt::after {
    content: " = "
}

.expr-name {
    color: navy;
}

.expr-param-name {
    color: steelblue;
}

.expr {
    display:inline-block;
    margin: .1em;
    padding: .3em;
    border: 1px solid #EEE;
    border-radius: .3em;
}

`;


export class BootstrapTheme implements HtmlRendererTheme {

    style(name: string): string {
        return styles[name] ?? 'unknown-'+name;
    }

    head() {
        return (<Fragment>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"/>
        <style>{css}</style>
        </Fragment>)
        
    }
}