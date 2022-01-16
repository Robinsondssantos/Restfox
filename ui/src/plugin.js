import { getQuickJS } from 'quickjs-emscripten'
import { Arena } from 'quickjs-emscripten-sync'

export function createRequestContextForPlugin(request, environment) {
    let state = JSON.parse(JSON.stringify(request))

    return {
        request: {
            getBody() {
                return state.body
            },
            getEnvironmentVariable(variable) {
                return JSON.parse(JSON.stringify(environment[variable]))
            },
            setBody(requestBody) {
                state.body = requestBody
            }
        }
    }
}

export function createResponseContextForPlugin(response, environment) {
    let state = JSON.parse(JSON.stringify(response))

    return {
        response: {
            getBody() {
                return state.responseOriginal
            },
            getParsedBody() {
                return state.responseParsed
            },
            getEnvironmentVariable(variable) {
                return JSON.parse(JSON.stringify(environment[variable]))
            },
            setBody(responseBody) {
                state.responseOriginal = responseBody
                let responseParsed = state.responseOriginal
                try {
                    responseParsed = JSON.stringify(JSON.parse(responseParsed), null, 4)
                } catch {}
                state.responseParsed = responseParsed
            }
        }
    }
}

export async function usePlugin(context, plugin) {
    const vm = (await getQuickJS()).createVm()
    const arena = new Arena(vm, { isMarshalable: true })

    arena.expose({
        console: {
            log: console.log
        },
        context
    })

    try {
        arena.evalCode(plugin.code)
    } catch(e) {
        console.log(e)
        // console.log(plugin.code.split('\n').slice(e.lineNumber - 3, e.lineNumber + 3).join('\n'))
        throw new Error('Unable to parse plugin')
    }

    arena.dispose()
    vm.dispose()
}