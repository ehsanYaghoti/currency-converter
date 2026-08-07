


export default function numberFormatter(num: number) {

    const formatted = num
        .toFixed(7)
        .replace(/\.?0+$/, "");

    const [integer, decimal] = formatted.split(".");

    const integerWithCommas = integer.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
    );

    return decimal
        ? `${integerWithCommas}.${decimal}`
        : integerWithCommas;

}
