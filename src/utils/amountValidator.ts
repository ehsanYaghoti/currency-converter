export default function amountValidator(input: string) {

    return input.length !== 0 && !isNaN(+input);

}
