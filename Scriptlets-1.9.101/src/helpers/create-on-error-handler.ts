/**
 * Generates function which silents global errors on page generated by scriptlet
 * If error doesn't belong to our error we transfer it to the native onError handler
 *
 * @param rid - unique identifier of scriptlet
 * @returns window.onerror handler
 */
export function createOnErrorHandler(rid: string): OnErrorEventHandler {
    // eslint-disable-next-line consistent-return
    const nativeOnError = window.onerror;
    return function onError(error, ...args) {
        if (typeof error === 'string' && error.includes(rid)) {
            return true;
        }
        if (nativeOnError instanceof Function) {
            return nativeOnError.apply(window, [error, ...args]);
        }
        return false;
    };
}
