export default function render_number(number) {
    if( number < 1e3)
    {
        return String(number)
    }
    if( number < 1e6)
    {
        return Number((number/1e3).toPrecision(3)) + " thousand"
    }
    if( number < 1e9)
    {
        return Number((number/1e6).toPrecision(3)) + " million"
    }
    if( number < 1e12)
    {
        return Number((number/1e9).toPrecision(3)) + " trillion"
    }
    return number
}
