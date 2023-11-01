import { ExpressionArg, LocalizedObject, LocalizedString, Survey, isExpression } from 'survey-engine/data_types';
import { RendererContext } from '../../context';
import { Fragment, h } from "static-jsx";
import { ExpressionArgView, ExpressionView } from './expression';
import { isExpressionArg } from '../../../expression';

const isLocalizedString = (o: LocalizedObject): o is LocalizedString => {
    return typeof(o) == "object" && 'parts' in o;
}

interface TranslateProps {
    texts?: Array<LocalizedObject>
    context: RendererContext
}

interface TranslatePartsProps {
    parts: Array<ExpressionArg | string | number>
    context: RendererContext
}

const with_context = (localized: Array<LocalizedObject>, context: RendererContext) => {
    return localized.filter(o=> context.languages.includes(o.code));
}

export const Translate = (props:TranslateProps)=> {
    const ctx = props.context;
    if(!props.texts) {
        return <></>;
    }
    const tt = with_context(props.texts, ctx);
    return <Fragment><ul class={ctx.style('translate-list') }>
        {tt.map(t =>
            <li>
                <span class={ctx.style('trans-code')}>{t.code}</span>
                { isLocalizedString(t) ? <span class={ ctx.style('trans-text')}><TranslateParts parts={t.parts} context={ctx}/></span> : '' }
            </li>
        )}
    </ul>
    </Fragment>
} 

isExpressionArg

export const TranslateParts = (props:TranslatePartsProps)=> {
    return <span>{props.parts.map(p=>{
            if(isExpressionArg(p)) {
                return <span><ExpressionArgView arg={p} context={props.context}/></span>
            }
            return <span>{JSON.stringify(p)}</span>
    })}
    </span>
} 