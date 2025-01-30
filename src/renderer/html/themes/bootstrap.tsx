
import { HtmlRendererTheme } from '../theme';
import { Fragment, h, RawHtml } from "static-jsx";

const styles:Record<string, string> = {
    // Generic
    'key': 'badge bg-danger',
    'item-key': 'text-danger',
    'translate-list': 'list-unstyled mb-0',
    'trans-code': 'badge bg-light text-primary my-1',
    'condition': 'condition',
    'metadata': 'list-unstyled mb-1',
    
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
    'validation-key': "badge bg-danger",
    'validation-type': "text-danger", // SingleItem validation type
    'item-version': 'badge bg-success',
    
    // Survey Item Component
    'components': 'survey-component',
    'components-children': '',
    'component-key': 'badge bg-danger',
    'component-content':'component-content',
    'component-properties': 'row',
    'component-properties-dt':'col text-align-right',
    'component-properties-dd':'col',
    "component-expression": "d-inline-block",
    "component-expression-title": "",
    'role': 'badge bg-warning me-1',
    'group-items':'group-items',
    "selection-method":"selection-method",
    'item-type': 'item-type', // Type of item
    'style': 'style ms-1',
    'style-dt': '',
    'style-dd': '',

    // Variables mapping
    'variable-label': 'badge bg-primary me-1',
    'variable-database': 'badge bg-primary me-1',
    'variable-name': 'badge bg-primary me-1',
    'legend': 'card bg-light m-1',
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

.expr-args {
    display:inline-block;
    list-style-type: none;
    padding-left: 0;
}

.expr-args li {
    display:inline-block;
    list-style-type: none;
}

.study-rule ul.exp-args-expanded {
    margin-left: 1em;
    display: block;
    border-left: 2px solid lightblue;
}

.study-rule ul.exp-args-expanded.expr-args {
 display: block;
}

.study-rule .exp-param-expanded {
 display:block;
}


`;

const icons: Record<string, string> = {
    'variable-database':'database',
    'variable-name': 'subscript',
    'variable-label': 'tag',
    'key': 'key',
    'role': 'bolt',
}


export class BootstrapTheme implements HtmlRendererTheme {

    style(name: string): string {
        return styles[name] ?? 'unknown-'+name;
    }

    icon(name: string): RawHtml {
        const icon  = icons[name] ?? '';
        if(icon) {
            return <i class={"me-1 fas fa-" + icon}></i>
        }
        return <i>?</i>
    }

    head() {
        return (<Fragment>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/fontawesome.min.css" integrity="sha512-v8QQ0YQ3H4K6Ic3PJkym91KoeNT5S3PnDKvqnwqFD1oiqIl653crGZplPdU5KKtHjO0QKcQ2aUlQZYjHczkmGw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/solid.min.css" integrity="sha512-DzC7h7+bDlpXPDQsX/0fShhf1dLxXlHuhPBkBo/5wJWRoTU6YL7moeiNoej6q3wh5ti78C57Tu1JwTNlcgHSjg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <style>{css}</style>
        </Fragment>)
        
    }
}