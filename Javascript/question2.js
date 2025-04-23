// Array Deep Flatten with Depth Limit

const input = [1, [2, [3, [4, [5]]]]];

// output: [1, 2, 3, [4, [5]]]


function flatDepth(arr,depth=1){
    if(depth<=0){
        return arr;
    }
    
    let output=[];

    function flat(arr,depth){
        if(depth<0){
            output.push(arr);
            return;
        }

        for(let val of arr){
            if(Array.isArray(val)){
                flat(val,depth-1,output);
            }
            else{
                output.push(val);
            }
        }
    }

    flat(arr,depth);

    return output;
}


console.log(JSON.stringify(flatDepth(input,0)));
