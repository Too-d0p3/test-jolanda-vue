export function useUpdateReactiveObject() {
    const updateObject = (targetObject: Record<string, any>, newValues: Record<string, any>) => {
        Object.keys(newValues).forEach(key => {
            targetObject[key] = newValues[key];
        });
    };

    return { updateObject };
}