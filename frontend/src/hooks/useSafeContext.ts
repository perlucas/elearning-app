import { useContext } from 'react';

function useSafeContext<T>(context: React.Context<T | undefined>): T {
    const contextValue = useContext(context);

    if (!contextValue) {
        throw new Error(
            `Context must be used within a provider. Ensure you're wrapping your component with the corresponding provider.`,
        );
    }

    return contextValue;
}

export default useSafeContext;
