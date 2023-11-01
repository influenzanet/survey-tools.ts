import { ExpressionArg } from "survey-engine/data_types";

export const isExpressionArg = (value: ExpressionArg | any): value is ExpressionArg => {
    if(typeof(value) !== 'object') {
        return false;
    }
    const v = (value as ExpressionArg);
    if(!v.dtype) {
        return typeof(v.str) !== "undefined";
    }
    // dtype defined ok
    return true;     
}

/**
 * 
 * @param value 
 * @returns true if ok, string if error
 */
export const isValidExpressionArg = (value: ExpressionArg): true | string =>{
    const dtype = value.dtype ?? 'str';  
    const isStr = typeof(value.str) !== "undefined" || value.str === null;
    const isNum = typeof(value.num) !== "undefined" || value.num === null;
    const isExp = typeof(value.exp) !== "undefined" || value.exp === null;
    
    const valide = (expected:boolean, expectedNot: boolean, label: string ) => {
        if(expected && !expectedNot) {
            return true;
        }
        return "Inconsistent state must have entry "+label+ " when dtype is '"+dtype+"'";
    }

    switch(dtype) {
        case 'str':
            return valide(isStr, isNum || isExp, "str");
        case 'num':
            return valide(isNum, isStr || isExp, "num");
        case 'exp':
            return valide(isExp, isStr || isNum, "exp");
    }
}
  