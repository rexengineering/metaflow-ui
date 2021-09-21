
const types = {
    undefined: "undefined",
    object: "object",
    boolean: "boolean",
    number: "number",
    string: "string"
}

const isArrayOfObjects = (arrayElement) => {
    return !!( Array.isArray(arrayElement) && arrayElement.length && typeof arrayElement[0] === types.object )
};

const deepMerge = (oldObject, updatedObject, arrayOfObjectsIdentifierProp = null) => {

    const oldObjectPropKeys = Object.keys(oldObject);
    const updatedObjectPropKeys = Object.keys(updatedObject);

    if (!oldObjectPropKeys.length && updatedObjectPropKeys.length){
        return updatedObject;
    }

    return oldObjectPropKeys.reduce( ( accumulator , currentPropKey) => {
        const oldPropValue = oldObject[currentPropKey];
        const updatedPropValue = updatedObject[currentPropKey];
        let newPropValue = updatedPropValue;

        if (isArrayOfObjects(oldPropValue)){
            newPropValue = oldPropValue.map( (currentItem) => {
                const newObjectItem = updatedPropValue?.find( (currentNewObjectItem) => currentNewObjectItem[arrayOfObjectsIdentifierProp] === currentItem[arrayOfObjectsIdentifierProp] );
                if (!newObjectItem) {
                    return currentItem;
                }
                return deepMerge(currentItem, newObjectItem);
            } );

        }else if (typeof oldPropValue === types.object && oldPropValue && !Array.isArray(oldPropValue) ) {
            newPropValue = deepMerge(oldPropValue, updatedPropValue);
        }

        if (newPropValue === undefined){
            return accumulator;
        }

        return {
            ...accumulator,
            [currentPropKey]: newPropValue,
        }

    }, { ...updatedObject } );

};

export default deepMerge;
