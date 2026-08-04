


export default function numberFormatter(num: number) {

    let resultFixed = `${1 * +num.toFixed(7).replace(/\.0+$/, "")}`;
    resultFixed = resultFixed
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d)\.)/g, ",");

    return resultFixed

}
