
import { ItemGroupComponent, ItemComponent, isItemGroupComponent, ResponseComponent, ComponentProperties, Expression, } from 'survey-engine/data_types';
import { Fragment, h } from "static-jsx";
import { RendererContext } from '../../context';
import { MetadataView, TagListView } from './metadata';
import { ExpressionArgView, ExpressionView } from './expression';
import { Translate } from '.';
import { isExpressionArg } from '../../../expression';
import { QuestionMapping, VariableMapping } from '../../mapping';

export interface ItemComponentProps {
    comps: ItemComponent
    context: RendererContext
    mapping?: QuestionMapping
    variable?: VariableMapping
    parentPath?: string;
}

const ArrayOf= (o: object) => {
    return Array.from(Object.entries(o));
}

const inPath = (candidates: string[], value?:string,): boolean => {
    if(!value) {
        return false;
    }
    return candidates.includes(value);
}

export const ItemComponentView = (props: ItemComponentProps) => {
    const comp = props.comps;
    const ctx = props.context;
    const mapping = props.mapping;
    
    const path = props.parentPath ? props.parentPath + '.' + comp.key : comp.key;

    const renderGroupComponent = (g: ItemGroupComponent, variable?: VariableMapping) => 
    <div class={ctx.style('components-children')}>
        {g.order ? <span class="order">order <ExpressionView exp={g.order} context={ctx}/></span> : ''}
        {g.items.map(child=> <ItemComponentView comps={child} context={ctx} mapping={mapping} parentPath={path} variable={variable} />)}        
    </div>

    const renderProperties = (p: Array<[string, any]>, style:string) =>
    <dl class={ ctx.style(style) }>
       {(p).map(e => (
        <Fragment>
            <dt class={ctx.style(style + '-dt')}>{e[0]}</dt>
            <dd class={ctx.style(style + '-dd')}>{isExpressionArg(e[1]) ? <ExpressionArgView arg={e[1]} context={ctx}/> : e[1]}</dd>
        </Fragment>
       ))}
    </dl>

    const renderStyle = (p: Array<{key:string, value:string}>, style:string) =>
    <dl class={ ctx.style(style) }>
       {(p).map(e => (
        <Fragment>
            <dt class={ctx.style(style + '-dt')}>{e.key}</dt>
            <dd class={ctx.style(style + '-dd')}>{e.value}</dd>
        </Fragment>
       ))}
    </dl>

    const renderExpFlag = (title: string, exp?:Expression|boolean,) => {
        if(!exp) {
            return <></>;
        }
        if(typeof(exp)=="boolean") {
            return {exp};
        }
        return(
        <div class={ctx.style("component-expression")}>
            <span class={ctx.style("component-expression-title")}>{title}</span>
            <ExpressionView exp={exp} context={ctx}/>
        </div> 
        )
    }

    const renderVariable = (v?: VariableMapping) => {
        if(!v) {
            return <></>;
        }
        return (
            <span class="variable-spec">
            <span class={ctx.style("variable-database")}>{ ctx.icon('variable-database')} {v.database()}</span>
            <span class={ctx.style("variable-name")}>{ ctx.icon('variable-name')} {v.variable()}</span>
            </span>
        );
    };

    const renderVariables = (variables : VariableMapping[]) => {
        return variables.map(renderVariable);
    }

    const r = comp as ResponseComponent;

    // Variable rendering
    let variables: VariableMapping[] = []; // List of associated variable after description
    let variableHeader: VariableMapping | undefined= undefined; // Show single variable in header
    let encodingLabel : string = ''
    
    if(mapping) {
        if(inPath(['rg.mcg'], props.parentPath) && comp.role === 'option') {
            variables = mapping.getVariablesWithResponse(comp.key);
        }
        if(props.variable && comp.role == 'option' && comp.key) {
            encodingLabel = props.variable.recodeLabel(comp.key);
        }

        if(path === 'rg.scg') {
            variableHeader = mapping.getVariable(0);
        }
    }

    return (<div class={ctx.style('components')}>
       {comp.key ? <var class={ ctx.style('component-key') }>{ctx.icon('key')} {comp.key}</var> : ''}
       <span class={ ctx.style('role') }>{ctx.icon('role')} { comp.role }</span>
       { variableHeader ? renderVariable(variableHeader) : ''}
       {r.dtype ? <div class={ ctx.style('component-dtype')}><code>{r.dtype}</code></div> : ''}
       { isItemGroupComponent(comp) ? renderGroupComponent(comp, variableHeader) : ''}
       {comp.content ?  <div class={ctx.style('component-content')}><Translate texts={comp.content} context={ctx} /></div> : ''}
       {renderExpFlag('Disabled', comp.disabled)}
       {renderExpFlag('displayCondition', comp.displayCondition)}
       {comp.description ? (
            <div>
            <h6>Description</h6>
            <Translate texts={comp.description} context={ctx} />
            </div>
       ) : ''}
       {comp.properties ? renderProperties(ArrayOf(comp.properties), 'component-properties') : ''}
       {comp.style ? renderStyle(comp.style, 'style') : ''}
       {variables ? renderVariables(variables) : ''}
       {encodingLabel ? <span class={ctx.style("variable-label")}>{ ctx.icon('variable-label') } {encodingLabel}</span> : ''}
       </div>
    )
}

