export function action(type) {
    return function (payload = {}, meta = {}) {
        return {
            type,
            payload,
            meta
        }
    }
}
