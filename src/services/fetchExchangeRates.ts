

export default async function fetchExchangeRates(base: string) {
    let response = await fetch(
        `https://v6.exchangerate-api.com/v6/a0fb2ec26c49b86c530024d6/latest/${base}`
    );


    if (!response.ok) {
        throw new Error("Failed to fetch data")
    }

    const json = await response.json()

    return json.conversion_rates;
}
