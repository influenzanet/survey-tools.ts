import { ExpressionArg, Expression } from 'survey-engine/data_types';

export const exp_arg_type = function(arg: ExpressionArg) {
    const t = arg.dtype;
    if(typeof(t) != "undefined") {
        return t;
    }
    return 'str';
}
