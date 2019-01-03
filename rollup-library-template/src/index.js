
export const sum = (a, b) => a + b;

export class CustomMathUtilities {
    static multiply(...nums){
        return nums.reduce((p, num) => p * num, 1);
    }
}

if (process.env.NODE_ENV !== 'production') {
    window.customVariable = "Hello";
} else {
    window.customVariable = "Hello";
}
