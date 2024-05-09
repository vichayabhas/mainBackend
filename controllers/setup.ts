
const size:Map<'S'| 'M'| 'L'| 'XL'| 'XXL'| '3XL',number> = new Map
const s:('S'| 'M'| 'L'| 'XL'| 'XXL'| '3XL')[] = ['S', 'M', 'L', 'XL', 'XXL', '3XL']
s.forEach((e:'S'| 'M'| 'L'| 'XL'| 'XXL'| '3XL') => {
    size.set(e, 0)
})
export const startSize=size
export function swop(olds :string|null, news:string|null, array:string[]){
    if (!olds) {
        if (news) {
            array.push(news)
        }
        return array
    }
    const re = array.filter(e => e != olds)
    if (news) {
        re.push(news)
    }
    return re
}
export function calculate(input:unknown|number|undefined,plus:|unknown|number|undefined,minus:unknown|number|undefined){
    return (input as number )+(plus as number)-(minus as number)
}
