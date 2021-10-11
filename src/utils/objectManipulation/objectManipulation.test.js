import deepMerge from "./objectManipulation";

describe("ObjectManipulation", () => {

    it('should handle added string prop', () => {
        const oldObject = {};
        const newObject = { newProp: "Hi!" };
        const { newProp } = deepMerge(oldObject, newObject);
        expect( newProp ).toBe( newObject.newProp );
    });

    it('should handle added number prop', () => {
        const oldObject = {};
        const newObject = { newProp: 58 };
        const { newProp } = deepMerge(oldObject, newObject);
        expect( newProp ).toBe( newObject.newProp );
    });

    it('should handle added boolean prop', () => {
        const oldObject = {};
        const newObject = { newProp: false };
        const { newProp } = deepMerge(oldObject, newObject);
        expect( newProp ).toBe( newObject.newProp );
    });

    it('should handle added null prop', () => {
        const oldObject = {};
        const newObject = { newProp: null };
        const { newProp } = deepMerge(oldObject, newObject);
        expect( newProp ).toBe( newObject.newProp );
    });

   it('should handle removed string prop', () => {
        const oldObject = { oldProp: "Hi!" };
        const newObject = {};
        const { oldProp } = deepMerge(oldObject, newObject);
        expect( oldProp ).toBeUndefined();
    });

   it('should handle removed number prop', () => {
        const oldObject = { oldProp: 74 };
        const newObject = {};
        const { oldProp } = deepMerge(oldObject, newObject);
        expect( oldProp ).toBeUndefined();
    });

   it('should handle removed boolean prop', () => {
        const oldObject = { oldProp: true };
        const newObject = {};
        const { oldProp } = deepMerge(oldObject, newObject);
        expect( oldProp ).toBeUndefined();
    });

   it('should handle removed null prop', () => {
        const oldObject = { oldProp: null };
        const newObject = {};
        const { oldProp } = deepMerge(oldObject, newObject);
        expect( oldProp ).toBeUndefined();
    });

   it('should handle updated string prop', () => {
        const oldObject = { prop: null };
        const newObject = { prop: "new value" };
        const { prop } = deepMerge(oldObject, newObject);
        expect( prop ).toBe( newObject.prop );
    });

   it('should handle updated number prop', () => {
        const oldObject = { prop: 15 };
        const newObject = { prop: 152 };
        const { prop } = deepMerge(oldObject, newObject);
        expect( prop ).toBe( newObject.prop );
    });

   it('should handle updated boolean prop', () => {
        const oldObject = { prop: false };
        const newObject = { prop: true };
        const { prop } = deepMerge(oldObject, newObject);
        expect( prop ).toBe( newObject.prop );
    });

   it('should handle updated null prop', () => {
        const oldObject = { prop: false };
        const newObject = { prop: null };
        const { prop } = deepMerge(oldObject, newObject);
        expect( prop ).toBe( newObject.prop );
    });


    // Array of single props tests

    it('should handle added array of strings prop', () => {
        const oldObject = {};
        const newObject = { newProp: ["Hi!"] };
        const { newProp } = deepMerge(oldObject, newObject);
        expect( Array.isArray(newProp) ).toBeTruthy();
        newProp.forEach((currentItem, index) =>
            expect( currentItem ).toBe( newObject.newProp[index] )
        );
    });

    it('should handle removed string prop of an array', () => {
        const oldObject = { newProp: ["Hi!", "there"] };
        const newObject = { newProp: ["Hi!"] };
        const { newProp } = deepMerge(oldObject, newObject);
        expect( Array.isArray(newProp) ).toBeTruthy();
        newProp.forEach((currentItem, index) =>
            expect( currentItem ).toBe( newObject.newProp[index] )
        );
        expect( newProp.length === newObject.newProp.length ).toBeTruthy();
    });


    it('should handle added string prop to an object', () => {
        const oldObject = {};
        const newObject = { newProp: { hi: "Hi!" } };
        const { newProp: { hi } } = deepMerge(oldObject, newObject);
        expect( hi ).toBe( newObject.newProp.hi );
    });

    it('should handle removed string prop of an object', () => {
        const oldObject = { oldProp: { hi: "Hi!" } };
        const newObject = { oldProp: { } };
        const { oldProp: { hi } } = deepMerge(oldObject, newObject);
        expect( hi ).toBeUndefined();
    });

    it('should handle updated string prop of an object', () => {
        const oldObject = { prop: { hi: null } };
        const newObject = { prop: { hi: "new value" } };
        const { prop: { hi } } = deepMerge(oldObject, newObject);
        expect( hi ).toBe( newObject.prop.hi );
    });


    it('should handle added string prop to an array of objects', () => {

        const addedProp = "there";
        const oldObject = { newProp: [ { hi: "Hi!" } ] };
        const newObject = { newProp: [ { hi: "Hi!", addedProp } ] };

        const { newProp } = deepMerge(oldObject, newObject);
        expect( Array.isArray(newProp) ).toBeTruthy();

        const [ firstElement ] = newProp;
        expect( typeof firstElement === "object" ).toBeTruthy();

        const { addedProp: newAddedProp } = firstElement;
        expect( newAddedProp ).toBe( addedProp );
    });


    it('should handle added string prop to an array of multi-layer objects ', () => {

        const addedProp = "there";
        const oldObject = {
            object: {
                array: [
                    {
                        hi: "Hi!"
                    }
                ]
            }
        };
        const newObject = {
            object: {
                array: [
                    {
                        hi: "Hi!",
                        addedProp
                    }
                ]
            }
        };

        const {
            object: {
                array
            }
        } = deepMerge(oldObject, newObject);

        expect( Array.isArray(array) ).toBeTruthy();

        const [ firstElement ] = array;
        expect( typeof firstElement === "object" ).toBeTruthy();

        const { addedProp: newAddedProp } = firstElement;
        expect( newAddedProp ).toBe( addedProp );
    });


    it('should handle removed string prop to an array of multi-layer objects ', () => {

        const oldObject = {
            object: {
                array: [
                    {
                        hi: "Hi!",
                        there: "there",
                    }
                ]
            }
        };
        const newObject = {
            object: {
                array: [
                    {
                        hi: "Hi!",
                    }
                ]
            }
        };

        const {
            object: {
                array
            }
        } = deepMerge(oldObject, newObject);

        expect( Array.isArray(array) ).toBeTruthy();

        const [ firstElement ] = array;
        expect( typeof firstElement === "object" ).toBeTruthy();

        const { there } = firstElement;
        expect( there ).toBeUndefined();
    });

    it('should handle added value to an array of strings inside of multi-layer objects ', () => {

        const addedProp = "Hey!";
        const oldObject = {
            object: {
                array: [
                    {
                        hi: ["Hello", "World"]
                    }
                ]
            }
        };
        const newObject = {
            object: {
                array: [
                    {
                        hi: [ addedProp, "Hello", "World"]
                    }
                ]
            }
        };

        const {
            object: {
                array
            }
        } = deepMerge(oldObject, newObject);
        const [ firstElement ] = array;
        const { hi } = firstElement;
        const [ newAddedProp ] = hi;
        expect( newAddedProp ).toBe( addedProp );
    });

    it('should handle added object to an array inside of multi-layer objects ', () => {

        const addedProp = "Hey!";
        const oldObject = {
            object: {
                array: [
                    {
                        hi: [
                            {
                              hello: "Hello",
                              world: "World",
                            }
                        ]
                    }
                ]
            }
        };
        const newObject = {
            object: {
                array: [
                    {
                        hi: [
                            {
                                hello: "Hello",
                                world: "World",
                                addedProp
                            }
                        ]
                    }
                ]
            }
        };

        const {
            object: {
                array
            }
        } = deepMerge(oldObject, newObject);
        const [ firstElement ] = array;
        const { hi } = firstElement;
        const [ firstHiObject ] = hi;
        const { addedProp: newAddedProp } = firstHiObject;
        expect( newAddedProp ).toBe( addedProp );
    });

    it('should handle removed object prop to an array inside of multi-layer objects ', () => {

        const addedProp = "Hey!";
        const oldObject = {
            object: {
                array: [
                    {
                        hi: [
                            {
                                hello: "Hello",
                                world: "World",
                                addedProp
                            }
                        ]
                    }
                ]
            }
        };
        const newObject = {
            object: {
                array: [
                    {
                        hi: [
                            {
                              hello: "Hello",
                              world: "World",
                            }
                        ]
                    }
                ]
            }
        };

        const {
            object: {
                array
            }
        } = deepMerge(oldObject, newObject);
        const [ firstElement ] = array;
        const { hi } = firstElement;
        const [ firstHiObject ] = hi;
        const { addedProp: newAddedProp } = firstHiObject;
        expect( newAddedProp ).toBeUndefined();
    });

});
