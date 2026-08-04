

export default async function fetchExchangeRates(base: string) {
    let response = await fetch(
        `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGE_API_KEY}/latest/${base}`
    );


    if (!response.ok) {
        throw new Error("Failed to fetch data")
    }

    const json = await response.json()

    return json.conversion_rates;
}
