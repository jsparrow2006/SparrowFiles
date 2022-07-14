import {useCallback, useEffect, useState} from 'react';

const useSubscribe = <T>(instance: any, channel: string = 'default'): T => {
    const [state, setState] = useState<T>({} as T);

    const callback = useCallback((data: T) => {
        setState(data)
    }, [setState])

    useEffect(() => {
        const subscriberId = instance.subscribe(callback, channel);

        return () => {
            instance.unsubscribe(subscriberId)
        }
    }, [])


    return state
}

export default useSubscribe
