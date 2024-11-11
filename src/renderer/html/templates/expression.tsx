
import { ExpressionArg, Expression } from 'survey-engine/data_types';
import { RendererContext } from '../../context';
import { Fragment, h } from "static-jsx";
import { exp_arg_type } from './utils';

interface ExpressionArgProps {
    arg: ExpressionArg
    context: RendererContext
}

interface ExpressionProps {
    exp: Expression
    context: RendererContext
}


export const ExpressionArgView = (props: ExpressionArgProps)=> {
    const arg = props.arg;
    const dtype = exp_arg_type(arg);
    switch(dtype) {
        case 'str':
            return <span class="expr-arg-str">"{arg.str}"</span>;
            break;
        case 'exp':
            const exp = arg.exp;
            return exp ? <ExpressionView exp={exp} context={props.context}/> : <span/>;
        case 'num':
            return <span class="expr-arg-num">"{arg.num}"</span>;
            break;
    }
    return <span>[Unknown expression type]</span>;
}

export const ExpressionView = (props: ExpressionProps)=> {
    const exp = props.exp;
    const ctx = props.context;

    const renderParams = (data: ExpressionArg[]) => {
        const ee: JSX.Element[] = [];
        const last = data.length - 1;
        const hasExpression = data.some( (e:ExpressionArg) => typeof(e.exp) !== "undefined" );
       
        data.forEach((a, i) => {
            const className = ctx.style("expr-param") + (hasExpression ? " exp-param-expanded" : '');
            const v = (<li class={className}>
                        <ExpressionArgView arg={a} context={ctx}/>
                        { i != last ? <span>, </span> : '' }
                      </li>);
                      
            ee.push(v);
         });
        const className = "expr-args" + (hasExpression ? " exp-args-expanded" : '') ;
        return <ul class={className}>{ ee }</ul>;
    }

    return <span class={ctx.style("expr")}>
        <span class={ctx.style("expr-name")}>{exp.name}</span>
        (
            {exp.data ?  renderParams(exp.data) : ''}
        )
    </span>
}