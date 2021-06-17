function createPropType(isRequired) {
  return function fontAwesomeIcon(props, propName, componentName) {
    const prop = props[propName];
    if (prop == null) {
      if (isRequired) {
        throw new Error(
          ` The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${prop}\`.`
        );
      }

      return undefined;
    }

    if (
      Array.isArray(prop?.icon) &&
      typeof prop?.iconName === "string" &&
      typeof prop?.prefix === "string"
    ) {
      return undefined;
    }

    throw new Error(
      `Failed prop type: Invalid prop \`${propName}\` of type \`${typeof prop}\` supplied to \`${componentName}\`, expected Font Awesome Icon.`
    );
  };
}

const propType = createPropType(false);
propType.isRequired = createPropType(true);

export default propType;
