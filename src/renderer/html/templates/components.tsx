
import { ItemGroupComponent, ItemComponent, isItemGroupComponent, ResponseComponent, ComponentProperties, Expression, } from 'survey-engine/data_types';
import { Fragment, h } from "static-jsx";
import { RendererContext } from '../../context';
import { MetadataView, TagListView } from './metadata';
import { ExpressionArgView, ExpressionView } from './expression';
import { Translate } from '.';
import { isExpressionArg } from '../../../expression';

export interface ItemComponentProps {
    comps: ItemComponent
    context: RendererContext
}

const ArrayOf= (o: object) => {
    return Array.from(Object.entries(o));
}

export const ItemComponentView = (props: ItemComponentProps) => {
    const comp = props.comps;
    const ctx = props.context;

    const renderGroupComponent = (g: ItemGroupComponent) => 
    <div class={ctx.style('components-children')}>
        {g.order ? <span class="order">order <ExpressionView exp={g.order} context={ctx}/></span> : ''}
        {g.items.map(child=> <ItemComponentView comps={child} context={ctx}/>)}        
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
        <div>
            <h6>{title}</h6>
            <ExpressionView exp={exp} context={ctx}/>
        </div> 
        )
    }

    const r = comp as ResponseComponent;

    return (<div class={ctx.style('components')}>
       {comp.key ? <var class={ ctx.style('key') }>{comp.key}</var> : ''}
        <span class={ ctx.style('role') }>{ comp.role }</span>
       {r.dtype ? <div class={ ctx.style('component-dtype')}><code>{r.dtype}</code></div> : ''}
       { isItemGroupComponent(comp) ? renderGroupComponent(comp) : ''}
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
       </div>
    )
}

