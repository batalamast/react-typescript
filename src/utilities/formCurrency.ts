const CURENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "USD", style: "currency"
})

export function formatCurency(number: number) {
    return CURENCY_FORMATTER.format(number);
}