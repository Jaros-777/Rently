
export  const initialLine = {
    line1: true,
    line2: true,
    line3: true,
}

export const reducerLine = (state, action) =>{
    switch(action.type){
        case "Line-1-on":
        return{
            ...state,
            line1: true,
        };
        case "Line-1-off":
        return{
            ...state,
            line1: false,
        };
        case "Line-2-on":
        return{
            ...state,
            line2: true,
        };
        case "Line-2-off":
        return{
            ...state,
            line2: false,
        };
        case "Line-3-on":
        return{
            ...state,
            line3: true,
        };
        case "Line-3-off":
        return{
            ...state,
            line3: false,
        };
    }
}