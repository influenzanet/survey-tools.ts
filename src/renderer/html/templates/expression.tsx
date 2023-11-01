
import { ExpressionArg, Expression } from 'survey-engine/data_types';
import { RendererContext } from '../../context';
import { Fragment, h } from "static-jsx";

interface ExpressionArgProps {
    arg: ExpressionArg
    context: RendererContext
}

interface ExpressionProps {
    exp: Expression
    context: RendererContext
}

const exp_arg_type = function(arg: ExpressionArg) {
    const t = arg.dtype;
    if(typeof(t) != "undefined") {
        return t;
    }
    return 'str';
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
        data.forEach((a, i) => {
            ee.push(<span class={ctx.style("expr-param")}><ExpressionArgView arg={a} context={ctx}/></span>);
            if(i != last) {
                ee.push(<span>, </span>)
            }
        });
        return ee;
    }

    return <span class={ctx.style("expr")}>
        <span class={ctx.style("expr-name")}>{exp.name}</span>
        (
            {exp.data ?  renderParams(exp.data) : ''}
        )
    </span>
}