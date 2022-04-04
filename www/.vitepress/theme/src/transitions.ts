/**
 * Implements https://tailwindui.com transition states by encoding in data-transition attr
 * @example
 * data-transition="{
 *   entering: { cls:'transition ease-in-out duration-300 transform', from:'-translate-x-full', to:'translate-x-0'},
 *   leaving:  { cls:'transition ease-in-out duration-300 transform', from:'translate-x-0',     to:'-translate-x-full' }
 * }" data-transition-for="sidebar"
 */

export type TransitionRule = { cls:string, from:string, to:string }
export type TransitionDefinition = { entering: TransitionRule, leaving:TransitionRule }

export function useTransitions(transitions:Record<string,boolean>) {

    let PropValues: Record<string, boolean> = {}
    if (transitions) {
        Object.keys(transitions).forEach(prop => {
            let transProp = transitions[prop]
            PropValues[prop] = transProp
        })
    }

    /** Invoke a named Tailwind Transition animation definition */
    function transition(prop:string, val?:boolean) {
        let enter = typeof val == 'boolean'
            ? val
            : PropValues[prop] = !PropValues[prop]

        let transitionEls = document.querySelectorAll(`[data-transition-for=${prop}]`)
        transitionEls.forEach(o => {
            let el = o as HTMLElement
            let duration = 300
            let attr = el.getAttribute('data-transition')
            el.style.display = ''

            if (attr) {
                let rule:TransitionDefinition = new Function("return " + attr)()
                let prevTransition = rule[enter ? 'leaving' : 'entering']
                let nextTransition = rule[enter ? 'entering' : 'leaving']
                if (prevTransition.cls) {
                    if (el.className.indexOf(prevTransition.cls) < 0) el.className.replace(prevTransition.cls,'').trim()
                }
                if (nextTransition.cls) {
                    if (el.className.indexOf(nextTransition.cls) < 0) el.className += ` ${nextTransition.cls}`
                    let clsDuration = nextTransition.cls.split(' ').find(x => x.startsWith('duration-'))
                    if (clsDuration) {
                        duration = parseInt(clsDuration.split('-')[1])
                    }
                }

                el.className = el.className.replace(` ${prevTransition.to}`, '').trim()
                el.className += ` ${nextTransition.from}`
                setTimeout(() => {
                    el.className = el.className.replace(nextTransition.from, nextTransition.to).trim()
                }, duration)
            }

            setTimeout(() => {
                el.style.display = enter ? '' : 'none'
            }, duration * 2)
        })
        return enter
    }

    return transition
}
